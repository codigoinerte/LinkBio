import { Controller, useFormState } from "react-hook-form"
import type { WallpaperPatternsProps } from "../types/design"
import { useEffect } from "react"
import { toast } from "sonner"
import { patternOptions } from "@/mock/theme"

export const WallpaperPatterns:React.FC<WallpaperPatternsProps> = ({ control, watch, clearErrors, setValue }) => {
    const isPatternsSelected = watch("wallpaperId");
    const { errors, isSubmitting } = useFormState({ control, name: "patternId" });

    useEffect(() => {
        if (!errors?.patternId?.message ) return;

        const id = toast.warning(errors.patternId.message as string);
        return () => {
            toast.dismiss(id);
        }
    }, [errors?.patternId?.message, isSubmitting])

    useEffect(() => {
        setValue("file", undefined);
        setValue("colorId", undefined);

        return () => {
            clearErrors("patternId");
            setValue("patternId", undefined);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Patrones</h2>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {patternOptions.map((patternOption) => (
                    <Controller
                        key={patternOption.id}
                        control={control}
                        name="patternId"
                        rules={{ required: isPatternsSelected === "pattern" ? "Debe seleccionar un patrón" : false }}
                        render={({ field: { onChange, value } }) => (
                            <button
                                type="button"
                                className={`aspect-square rounded-xl border border-gray-200 transition-all duration-200 cursor-pointer ${
                                    value === patternOption.id ? "ring-2 ring-blue-500 ring-offset-2" : "hover:scale-105"
                                }`}
                                onClick={() => onChange(patternOption.id)}
                                aria-label={`Seleccionar patrón ${patternOption.name}`}
                                title={patternOption.name}
                            >
                                <div className="w-full h-full rounded-xl" style={patternOption.style} />
                            </button>
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
