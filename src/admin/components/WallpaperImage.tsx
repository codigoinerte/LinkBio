import { X } from "lucide-react";
import type { WallpaperImageProps } from "../types/design"
import {useDropzone} from 'react-dropzone';
import { useEffect } from "react";
import { Controller, useFormState } from "react-hook-form";
import { toast } from "sonner";
import WallpaperAction from "../actions/wallpaper.actions";

interface RenderItemsProps {
    files?: (File | string)[];
    handleDeleteImage: () => void;
}

const RenderItems = ({ files, handleDeleteImage }: RenderItemsProps) => {
    
    if(!files) return;

    return files.map((file, index) => {        
        const isFile = file instanceof File;
        const imgSrc = isFile ? URL.createObjectURL(file) : file;
        const label = isFile ? `${file.name} - ${file.size} bytes` : "Imagen actual";
        const key = isFile ? file.name : `${file}-${index}`;

        return (
            <li key={key}>
                <div className="w-fit">
                    <div className="relative">
                        <button 
                            type="button"
                            className="border-none p-1.5 rounded-sm bg-red-500 text-white cursor-pointer absolute top-2 right-2"
                            onClick={handleDeleteImage}>
                            <X className="w-4 h-4" />
                        </button>
                        <img
                            src={imgSrc}
                            className="rounded-2xl h-50 w-full object-cover"
                        />
                    </div>
                    <span className="font-normal text-center block m-auto text-xs mt-1 px-2 py-1 rounded-xl bg-sky-300">{label}</span>
                </div>
            </li>)
    });
}

export const WallpaperImage:React.FC<WallpaperImageProps> = ({ control, watch, setValue, clearErrors }) => {
    
    const wallpaperAction = new WallpaperAction();

    const isImageSelected = watch("wallpaperId");
    const files = watch("file");

    const { errors, isSubmitting } = useFormState({ control, name: "file" });       

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: files => setValue("file", files[0]) ,//setFiles(files),
        multiple: false,
        maxFiles: 1,
        accept: {
            'image/jpeg': ['.jpeg', '.png', '.jpg']
        },
    });   

    useEffect(() => {
        
        if (!errors?.file?.message)  return ;
        
        const id = toast.warning(errors.file.message as string);

        return () => {
            toast.dismiss(id);
        }

    }, [errors?.file?.message, isSubmitting])

    const handleDeleteImage = async() => {   

        if(typeof files == "string"){
            try {
                await wallpaperAction.deleteWallpaperImage();
                setValue("file", undefined);
                
                toast.success("Se elimino la imagen con exito");
            } catch (error) {
                console.log(error);
                toast.warning("Hubo un error intentelo más tarde");
            }
        }else{
            setValue("file", undefined);
        }

    }

    useEffect(() => {
        
        setValue("patternId", undefined);
        setValue("colorId", undefined);

        return () => {
            clearErrors("file");  
            if(typeof files != "string"){
                setValue("file", undefined);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Image wallpaper</h2>

            <Controller
                control={control}
                name="file"
                rules={{
                    required: isImageSelected === "image" ? "Debe seleccionar una imagen" : false
                }}
                render={() => (
                    <div {...getRootProps({className: 'dropzone focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-dashed border-gray-500 bg-white bg-clip-border px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none min-h-30 flex items-center justify-center mb-5'})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            />
            {files && (
                <aside>
                    <ul>
                        <RenderItems
                            files={[files]}
                            handleDeleteImage={handleDeleteImage}
                        />
                    </ul>
                </aside>
            )}
        </div>
    )
}
