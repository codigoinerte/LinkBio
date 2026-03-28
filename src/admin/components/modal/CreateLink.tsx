import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SelectWithIcon, type Option } from "@/components/custom/SelectWithIcon"
import { useCallback, useEffect, useState } from "react"
import { category } from "@/admin/actions/category.actions"
import { detectSocialPlatform } from "@/helpers/detectSocialPlatform"
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import { ErrorsLabel } from "@/components/custom/ErrorsLabel"
import type { FormInputs, LinkStoreResponse } from "@/admin/types/link"
import { toast } from "sonner"
import type { LinkDashboard } from "@/admin/types/dashboard"



interface OptionWithDescription extends Option {
    description: string;
    code:string;
}

interface Props {
    item?:FormInputs & {id:string};
    onUpdate : (item: LinkDashboard) => void;
    onStore: (params:FormInputs) => Promise<LinkStoreResponse>
    onPut: (id:number, params:FormInputs) => Promise<LinkStoreResponse>
}

export const CreateLink = ({ item, onUpdate, onStore, onPut }:Props) => {

    const [isSubmit, setIsSubmit] = useState(false);
    const [socialMessage, setSocialMessage] = useState<string | null>(null);    
    const [detaultValue, setDetaultValue] = useState('');
    const [options, setOptions] = useState<OptionWithDescription[]>([]);

    const { register, watch, setValue, handleSubmit, control, formState: { errors } } = useForm<FormInputs>({
        values:{
            title: item?.title ?? "",
            category_id: item?.category_id ?? "0",
            description: item?.description ?? '',
            is_enabled: item?.is_enabled ?? false,
            url: item?.url ?? ""
        }
    });

    const url = watch("url");
    
    const getCategories = useCallback(async () => {
        const response = await category();
        if(response){
            const categoryFormatted: OptionWithDescription[] = response.map(item => ({
                label: item.name.toString(),
                value: item.id.toString(),
                icon: item.icon,
                description: item.description,
                code: item.code,
            }));

            setOptions(categoryFormatted);
            setDetaultValue(categoryFormatted[0]?.value ?? '');
        }
    }, [])

    const onChangeUrl = (value: string) => {        
        const { valid, key } = detectSocialPlatform(value);
        if(valid){
            const id = options.find(item => item.code == key)?.value;
            if(id)
            setValue("category_id", id);
        }        
    }



    useEffect(() => {
      
        (async ()=>{
            await getCategories();
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
      onChangeUrl(url);      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const onSubmit:SubmitHandler<FormInputs> = async (data) => {
        setIsSubmit(true);
        try {
            
            const response = (item?.id)? await onPut(Number(item.id), data) : await onStore(data)

            if(response)
                onUpdate({
                        title: response.title,
                        url: response.url,
                        description: response.description,
                        is_enabled: response.is_enabled??0,
                        category_id: response.category_id,
                        user_id: response.user_id,
                        id: response.id,
                        clicks: 0,
                        visitors: 0,
                        category_code:response.category_code,
                        category_icon:response.category_icon,
                    });
            if(item?.id)
                toast.success('El registro se actualizo con extio!');
            else
                toast.success('El registro se completo con extio!');
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error vuelve a intentarlo más tarde');
        } finally {
            setIsSubmit(false);
        }
    }
    
    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='pt-5 grid grid-cols-1 gap-4 md:grid-cols-[150px_1fr]'>
            <div className="col-span-2 grid grid-cols-1 gap-4 md:grid-cols-[1fr_150px]">
                <div>
                    <Field className="gap-0">
                        <FieldLabel htmlFor="title" className="leading-3.5 mb-2">Title</FieldLabel>
                        <InputGroup
                            className={errors.title ? "border-red-500" : ""}>

                            <Controller
                            control={control}
                            name="title"
                            render={({field})=> (
                                <>
                                    <InputGroupInput 
                                        id="title" 
                                        placeholder="My social on socialmedia"
                                        value={field.value}
                                        onChange={field.onChange}
                                        />
                                </> 
                            )} />

                        </InputGroup>
                        <ErrorsLabel hasError={!!errors.title} message="Enter a valid title." />
                    </Field>
                </div>
                <div className="flex justify-center items-center">
                    <Controller
                        control={control}
                        name="is_enabled"
                        render={({field})=> (
                            <>
                                <Field orientation="horizontal" data-disabled className="w-fit">
                                    <Switch 
                                        className="data-[state=checked]:bg-green-500"
                                        checked={!!field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldLabel htmlFor="switch-disabled-unchecked">{field.value? "Enabled": "Disabled"}</FieldLabel>                                    
                                </Field>
                            </>
                        )} 
                    />
                </div>
            </div>
            <div>
                <Controller
                    control={control}
                    name="category_id"
                    rules={{ required: true }}
                    render={({field})=> (
                        <>
                            <SelectWithIcon
                                label="Category"
                                placeholder="Social"
                                options={options}
                                defaultValue={detaultValue}
                                classNameTrigger={errors.category_id ? "border-red-500" : ""}
                                onChange={(value:string)=> {                                    
                                    const message = options.find(item => item.value === value)?.description ?? '';
                                    setSocialMessage(message);
                                    field.onChange(value);
                                }}
                                value={field.value}
                            />
                            <ErrorsLabel hasError={!!errors.category_id} message="Enter a valid category." />                            
                        </>
                    )}
                />
                
            </div>
            <div>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-group-url" className="leading-3.5 mb-2">Website URL</FieldLabel>
                    <InputGroup
                        className={errors.url ? "border-red-500" : ""}>
                        <InputGroupInput 
                            id="input-group-url" 
                            placeholder="https://socialmedia.com/" 
                            {...register("url", { required: true })}/>
                    </InputGroup>
                    <ErrorsLabel hasError={!!errors.url} message="Enter a valid url." />                    
                </Field>
            </div>
            <div className="col-span-2">
                <Textarea placeholder="Description" {...register("description")} />                
            </div>
            {
                socialMessage && (
                    <div className="col-span-2">
                        <p className="text-muted-foreground text-sm">{socialMessage}</p>
                    </div>

                )
            }

            <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5 col-span-2 mt-2">
                <button 
                    disabled={isSubmit}
                    type="submit" 
                    className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none bg-purple-600 rounded-3xl flex-1 w-full text-white cursor-pointer">Save</button>
            </div>
        </form>
    )
}
