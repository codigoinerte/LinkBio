import { themes } from "@/mock/theme"
import { Controller } from "react-hook-form"
import { Diamond } from "lucide-react"
import { Title } from "./Title"
import type { ThemePageProps } from "../types/design"

export const Theme:React.FC<ThemePageProps> = ({control}) => {
    
    return (
        <>
            <Title title="Theme" />

            {/* Theme Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-4">
            {themes.map((theme) => (
                <Controller
                    key={theme.id}
                    control={control}
                    name="themeId"
                    render={({ field: { onChange, value } }) => (

                        <div
                            key={theme.id}
                            onClick={() => onChange(theme.id)}
                            className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border border-gray-100 ${
                                value === theme.id ? " ring-2 ring-blue-500 ring-offset-2 scale-105" : " hover:scale-102"
                            }`}>

                            {/* Theme Preview */}
                            <div className={`w-full h-full ${theme.preview} relative`}>
                                {/* Premium Badge */}
                                {theme.isPremium && (
                                <div
                                    className={`absolute top-3 right-3 w-6 h-6 ${theme.badgeColor} rounded-full flex items-center justify-center`}
                                >
                                    <Diamond className="w-3 h-3 text-white fill-white" />
                                </div>
                                )}

                                {/* Typography Preview */}
                                <div className="absolute top-4 left-4">
                                    <span
                                        className="text-2xl font-light"
                                        style={{
                                        color: theme.textColor,
                                        }}
                                    >
                                        Aa
                                    </span>
                                </div>

                                {/* Accent Element */}
                                <div className="absolute bottom-0 left-0 right-0 h-16">
                                    <div className={`w-full h-full ${theme.accent} opacity-80`} />
                                    
                                    <span className="absolute bottom-3 left-3 rounded-3xl bg-gray-200 px-5 text-[0.75rem]">
                                        {theme.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                />

            ))}
            </div>
        </>
    )
}
