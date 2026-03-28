import type { ProjectDashboard } from '@/admin/types/dashboard';
import type { FormInputs, Galery, ProjectParamsRequest, ProjectStoreResponse, ProjectUpdateResponse } from '@/admin/types/project';
import { ErrorsLabel } from '@/components/custom/ErrorsLabel';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { FileUploader } from '../FileUploader';
import Gallery from '@/admin/actions/galery.action';

const BASE_IMAGE = import.meta.env.VITE_BASE_URL_GALERY;

interface onUpdateGalleryProps {
    idProject:number;
    idImage: number;
}

interface Props {
    item?:FormInputs & {id:string};
    prevFiles?:Galery[];
    onUpdate : (item: ProjectDashboard) => void;
    onUpdateGallery: (props:onUpdateGalleryProps) => void;
    onStore: (params:ProjectParamsRequest) => Promise<ProjectStoreResponse>
    onPut: (id:string, params:ProjectParamsRequest) => Promise<ProjectUpdateResponse>
}

export const CreateProject = ({ item, prevFiles, onUpdate, onUpdateGallery, onPut, onStore }: Props) => {
    
    const [isSubmit, setIsSubmit] = useState(false);
    const [statePrevFiles, stateSetPrevFiles] = useState<Galery[]|undefined>([]);

    const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            name: '',
            description: '',
            short_description: '',
            link: '',
            location: '',
            from: '',
            to: '',
            is_enabled: false,
            files: [],
            ...item,
        }
    });

    const fromDate = watch("from");

    const handleDeleteImageSelected = (i:number) => {
        const files = getValues("files");
        setValue("files", files?.filter((_,n) => n != i))

        toast.success("Se elimino la imagen cargada exitosamente");
    }

    const handleDeleteImageSaved = async (id:number) => {
        try {

            const GalleryClass = new Gallery();
            await GalleryClass.deleteImage(id);
            
            onUpdateGallery({
                idProject: Number(item!.id),
                idImage: id                
            });

            toast.success("Se elimino la imagen guardada exitosamente");
            
        } catch (error) {
            console.log(error);
            toast.error("Hubo un error al eliminar la imagen, intentelo más tarde");
        }
    }

    const onSubmit:SubmitHandler<FormInputs> = async (data:FormInputs) => {
        setIsSubmit(true);

        try {

            if(item?.id){
                const { project:project_update } = await onPut(item.id, {
                    name: data.name || '',
                    description: data.description || '',
                    short_description: data.short_description || '',
                    location: data.location || '',
                    link: data.link || '',
                    is_enabled: data.is_enabled || false,
                    from: data.from || '',
                    to: data.to || '',
                    files: data.files || [],
                });

                onUpdate({
                    id: project_update.id,
                    name: project_update.name,
                    description: project_update.description,
                    short_description: project_update.short_description,
                    location: project_update.location || '',
                    link: project_update.link || '',
                    is_enabled: project_update.is_enabled || false,
                    from: project_update.from || '',
                    to: project_update.to || '',
                    click: project_update.click || 0,
                    order: project_update.order || 0,
                    visits: project_update.visits || 0,
                    galery: project_update.galery
                });

                toast.success('Proyecto actualizado con extio');
            }else{
                const { project:project_store } = await onStore( {
                    name: data.name ?? '',
                    description: data.description ?? '',
                    short_description: data.short_description ?? '',
                    location: data.location ?? '',
                    link: data.link ?? '',
                    is_enabled: data.is_enabled ?? false,
                    from: data.from ?? '',
                    to: data.to ?? '',
                    files: data.files ?? [],
                });
                onUpdate({
                    id: project_store.id,
                    name: project_store.name,
                    description: project_store.description,
                    short_description: project_store.short_description,
                    location: project_store.location || '',
                    link: project_store.link || '',
                    is_enabled: project_store.is_enabled || false,
                    from: project_store.from || '',
                    to: project_store.to || '',
                    click: project_store.click || 0,
                    order: project_store.order || 0,
                    visits: project_store.visits || 0,
                    galery: project_store.galery
                })
                toast.success('Proyecto creado con extio');
            }
            
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error vuelve a intentarlo más tarde');
        } finally {
            setIsSubmit(false);
        }        
    }

    useEffect(() => {
      stateSetPrevFiles(prevFiles);
    }, [prevFiles])
    

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='pt-5 grid grid-cols-1 gap-4 md:grid-cols-6 max-h-180 overflow-x-auto'
            >
            <div className="col-span-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_150px]">
                <div>
                    <Field className="gap-0">
                        <FieldLabel htmlFor="title" className="leading-3.5 mb-2">Title</FieldLabel>
                        <InputGroup
                            className={errors.name ? "border-red-500" : ""}>

                            <Controller
                            control={control}
                            name="name"
                            render={({field})=> (
                                <>
                                    <InputGroupInput 
                                        id="title" 
                                        placeholder="My project"
                                        value={field.value}
                                        onChange={field.onChange}
                                        />
                                </> 
                            )} />

                        </InputGroup>
                        <ErrorsLabel hasError={!!errors.name} message="Enter a valid name." />
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

            <div className='col-span-6'>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-short" className="leading-3.5 mb-2">Short description</FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            id="input-short" 
                            placeholder="Short description" 
                            {...register("short_description")}/>
                    </InputGroup>                    
                </Field>
            </div>

            <div className='col-span-6'>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-description" className="leading-3.5 mb-2">Description</FieldLabel>
                    <InputGroup>
                        <Textarea 
                            id="input-description" 
                            placeholder="Description" 
                            {...register("description")}/>
                    </InputGroup>                    
                </Field>
            </div>
            
            <div className='col-span-3'>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-link" className="leading-3.5 mb-2">Link project</FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            id="input-link" 
                            placeholder="Link project" 
                            {...register("link")}/>
                    </InputGroup>                    
                </Field>
            </div>

            <div className='col-span-3'>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-location" className="leading-3.5 mb-2">Location project</FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            id="input-location" 
                            placeholder="Location project"
                            {...register("location")}/>
                    </InputGroup>                    
                </Field>
            </div>

            <div className='col-span-3'>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-from" className="leading-3.5 mb-2">Project from</FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            id="input-from" 
                            type='date'
                            {...register("from")}/>
                    </InputGroup>                    
                </Field>
            </div>

            <div className='col-span-3'>
                <Field className="gap-0">
                    <FieldLabel htmlFor="input-to" className="leading-3.5 mb-2">Project to</FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            id="input-to" 
                            type='date'
                            className='w-full flex-1'
                            min={fromDate}
                            {...register("to")}/>
                    </InputGroup>                    
                </Field>
            </div>
            
            <div className='col-span-6'>
                <FileUploader<FormInputs>
                    control={control}
                    name="files"
                    isRequired={false}
                    prevFiles={(statePrevFiles ?? []).map(file => ({
                        id: file.id,
                        name: file.name,
                        url: file.image_path ? `${BASE_IMAGE}/${file.image_path}` : ''
                    }))}
                    onDeleteImageSelected={handleDeleteImageSelected}
                    onDeleteImageSaved={async (id:number)=>{
                        handleDeleteImageSaved(id)
                        .then(() => {
                            stateSetPrevFiles(prev => prev?.filter(image => String(image.id) !== String(id) ))
                        })
                    }}
                />
            </div>

            <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5 mt-2 col-span-6">
                <button 
                    disabled={isSubmit}
                    type="submit" 
                    className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none bg-purple-600 rounded-3xl flex-1 w-full text-white cursor-pointer">Save</button>
            </div>
        </form>
    )
}
