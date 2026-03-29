import { Controller, useFormState } from 'react-hook-form'
import type { WallpaperColorProps } from '../types/design'
import { useEffect } from 'react';
import { toast } from 'sonner';
import { suggestedColors } from '@/mock/theme';

export const WallpaperColor = ({ control, watch, clearErrors, setValue }: WallpaperColorProps) => {
    
    const isColorSelected = watch("wallpaperId");
    const { errors, isSubmitting } = useFormState({ control, name: "colorId" });

    useEffect(() => {
        
        if (!errors?.colorId?.message ) return;
        
        const id = toast.warning(errors.colorId.message as string);

        return () => {        
            toast.dismiss(id);
        }
            
    }, [errors.colorId, isSubmitting])

    useEffect(() => {
        setValue("patternId", undefined);
        setValue("file", undefined);

        return () => {
            clearErrors("colorId");
            setValue("colorId", undefined);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
                            
    
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Color</h2>

            {/* Color Picker */}
            <div className="flex items-center gap-3">

                
                {suggestedColors.map((colorOption) => (
                    
                    <Controller
                        key={colorOption.id}
                        control={control}
                        name="colorId"
                        rules={{required: isColorSelected == "color" ? "Debe seleccionar un color" : false }}
                        render={({ field: { onChange, value } }) => (
                            <label 
                                key={colorOption.id}
                                { ...(colorOption.isAddButton && ({htmlFor: "input-custom-select"})) }
                                className={`w-10 h-10 rounded-full transition-all duration-200 cursor-pointer ${
                                colorOption.isAddButton
                                    ?
                                    `${!value?.custom && colorOption.isAddButton ? "border-2 border-dashed border-gray-300" : "" } flex items-center justify-center hover:border-gray-400`
                                    : `${colorOption.color} ${
                                        value?.id === colorOption.id ? "ring-2 ring-blue-500 ring-offset-2" : "hover:scale-110"
                                    }`
                                }`}
                                onClick={() => !colorOption.isAddButton && onChange({ id: colorOption.id, custom: undefined })}

                                style={{
                                    ...( value?.custom && colorOption.isAddButton ? { backgroundColor: value?.custom ?? '', border: "none !important" } : {})
                                }}>
                                {
                                    colorOption?.isAddButton && (
                                        <input 
                                            type="color" 
                                            className="w-0 h-0" 
                                            id="input-custom-select" 
                                            value={value?.custom || ""}
                                            onChange={(e) => {                                        
                                                onChange({id: colorOption.id, custom: e.target.value})
                                            }}
                                        />
                                    )
                                }
                                {colorOption.isAddButton && (
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                )}
                            </label>
                        )} 
                    />

                ))}

            </div>

            {/* Suggested Colors Text */}
            {/* <p className="text-sm text-gray-500">Suggested colors are based on your profile image</p> */}
        </div>
    )
}
