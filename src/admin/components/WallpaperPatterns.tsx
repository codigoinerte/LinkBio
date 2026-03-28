import { Controller, useFormState } from "react-hook-form"
import type { WallpaperPatternsProps } from "../types/design"
import { useEffect } from "react"
import { toast } from "sonner"

const patternOptions = [
    {
        id: "grid",
        name: "Grid",
        style: {
            backgroundColor: "#111827",
            backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
        },
    },
    {
        id: "dots",
        name: "Dots",
        style: {
            backgroundColor: "#1f2937",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
        },
    },
    {
        id: "stripes",
        name: "Stripes",
        style: {
            backgroundColor: "#374151",
            backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12) 6px, transparent 6px, transparent 12px)",
        },
    },
    {
        id: "waves",
        name: "Waves",
        style: {
            backgroundColor: "#0f172a",
            backgroundImage:
                "radial-gradient(circle at 100% 50%, transparent 20%, rgba(255,255,255,0.12) 21%, rgba(255,255,255,0.12) 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, rgba(255,255,255,0.12) 21%, rgba(255,255,255,0.12) 34%, transparent 35%, transparent)",
            backgroundSize: "20px 30px",
        },
    },
    {
        id: "noise",
        name: "Noise",
        style: {
            backgroundColor: "#334155",
            backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 0.8px, transparent 0.8px), radial-gradient(rgba(255,255,255,0.12) 0.8px, transparent 0.8px)",
            backgroundPosition: "0 0, 4px 4px",
            backgroundSize: "8px 8px",
        },
    },
] as const


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
