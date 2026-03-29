import type { SuggestedColor, Theme } from "@/admin/types/design";

export const themes: Theme[] = [
  {
    id: "air",
    name: "Air",
    preview: "bg-gray-100",
    accent: "bg-white",
    isPremium: false,
    textColor: "#111827", // Using hex color directly
    badgeColor: "bg-black/40",
  },
  {
    id: "blocks",
    name: "Blocks",
    preview: "bg-gradient-to-b from-purple-500 to-purple-600",
    accent: "bg-gradient-to-r from-pink-400 to-pink-500",
    isPremium: false,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "bloom",
    name: "Bloom",
    preview: "bg-gradient-to-br from-red-900 via-purple-900 to-pink-800",
    accent: "bg-gradient-to-r from-blue-600 to-purple-600",
    isPremium: true,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "breeze",
    name: "Breeze",
    preview: "bg-gradient-to-br from-pink-300 to-pink-400",
    accent: "bg-gradient-to-r from-pink-200 to-pink-300",
    isPremium: true,
    textColor: "#111827", // Using hex color directly
    badgeColor: "bg-black/40",
  },
  {
    id: "lake",
    name: "Lake",
    preview: "bg-gradient-to-b from-slate-900 to-black",
    accent: "bg-slate-800",
    isPremium: false,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "mineral",
    name: "Mineral",
    preview: "bg-gradient-to-b from-stone-200 to-stone-300",
    accent: "bg-gradient-to-r from-stone-100 to-stone-200",
    isPremium: false,
    textColor: "#111827", // Using hex color directly
    badgeColor: "bg-black/40",
  },
  {
    id: "astrid",
    name: "Astrid",
    preview: "bg-gradient-to-br from-emerald-900 to-slate-900",
    accent: "bg-gradient-to-r from-emerald-400 to-teal-400",
    isPremium: true,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "groove",
    name: "Groove",
    preview: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
    accent: "bg-gradient-to-r from-red-400 to-orange-400",
    isPremium: true,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "agate",
    name: "Agate",
    preview: "bg-gradient-to-br from-emerald-600 to-teal-700",
    accent: "bg-gradient-to-r from-lime-400 to-green-400",
    isPremium: true,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "twilight",
    name: "Twilight",
    preview: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
    accent: "bg-gradient-to-r from-pink-300 to-purple-300",
    isPremium: true,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "rise",
    name: "Rise",
    preview: "bg-gradient-to-br from-orange-500 to-red-500",
    accent: "bg-gradient-to-r from-yellow-400 to-orange-400",
    isPremium: false,
    textColor: "#ffffff",
    badgeColor: "bg-black/20",
  },
  {
    id: "grid",
    name: "Grid",
    preview: "bg-gradient-to-br from-lime-400 to-green-500",
    accent: "bg-white",
    isPremium: true,
    textColor: "#111827", // Using hex color directly
    badgeColor: "bg-black/40",
  },
]

export const suggestedColors: SuggestedColor[] = [
  { id: "add", color: "bg-gradient-to-r from-pink-500 to-orange-400", isAddButton: true },
  { id: "dark", color: "bg-gray-800" },
  { id: "medium", color: "bg-gray-600" },
  { id: "light", color: "bg-gray-200" },
  { id: "black", color: "bg-black" },
]

export const patternOptions = [
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