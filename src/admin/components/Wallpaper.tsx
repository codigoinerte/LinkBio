import { Title } from "./Title"
import type { WallpaperPageProps, WallpaperOption } from "../types/design"
import { Controller } from "react-hook-form"
import { WallpaperColor } from "./WallpaperColor"
import { useEffect } from "react"
import { WallpaperImage } from "./WallpaperImage"
import { WallpaperPatterns } from "./WallpaperPatterns"

const wallpaperOptions: WallpaperOption[] = [
  {
    id: "image",
    name: "Imagen",
    type: "image",
    preview: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-500",
    isPremium: false,
  },
  {
    id: "color",
    name: "Color Sólido",
    type: "color",
    preview: "bg-gray-800",
    isPremium: false,
  },
  {
    id: "pattern",
    name: "Patrón",
    type: "pattern",
    preview: "bg-gray-700",
    isPremium: true,
  },
]

export const Wallpaper:React.FC<WallpaperPageProps> = ({ control, watch, setValue, clearErrors }) => {
    
    const wallpaperSelected = watch("wallpaperId");

    useEffect(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, [wallpaperSelected])
    

    return (
        <>
            <Title title="Wallpaper" />  

            {/* Wallpaper Options Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-4">
            {wallpaperOptions.map((option) => (
                
                <Controller
                    key={option.id}
                    control={control}
                    name="wallpaperId"
                    render={({ field: { onChange, value } }) => (


                        <div className={`relative aspect-[4/5] rounded-2xl cursor-pointer transition-all duration-200 ${
                                value === option.id ? "ring-2 ring-blue-500 ring-offset-2" : "hover:scale-105"
                            }`}
                            onClick={() => onChange(option.id)}
                            >
                            {/* Wallpaper Preview */}
                            <div className={`w-full h-full rounded-2xl ${option.preview} relative overflow-hidden`}>
                                {/* Pattern overlay for pattern type */}
                                {option.type === "pattern" && (
                                <div className="absolute inset-0 opacity-30">
                                    <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `
                                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                                    `,
                                        backgroundSize: "20px 20px",
                                    }}
                                    />
                                </div>
                                )}

                                {/* Profile Picture Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    </div>
                                </div>
                                </div>

                                {/* Premium Badge */}
                                {option.isPremium && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                                )}
                            </div>

                            {/* Option Name */}
                            <p className="text-sm font-medium text-gray-700 text-center mt-3">{option.name}</p>
                        </div>
                )} />

            ))}
            </div>

            {/* Color Section */}
            {
                wallpaperSelected == "color" && (
                    <WallpaperColor watch={watch} setValue={setValue} control={control}  clearErrors={clearErrors}/>
                )
            }

            {/* Wallpaper Selector */}
            {
                wallpaperSelected == "image" && (
                    <WallpaperImage watch={watch} setValue={setValue} control={control} clearErrors={clearErrors}/>
                )
            }

            {/* Wallpaper Patterns */}
            {
                wallpaperSelected == "pattern" && (
                    <WallpaperPatterns control={control} setValue={setValue} watch={watch} clearErrors={clearErrors} />
                )
            }

        </>
    )
}
