/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

/* wallpaper */
export type WallpaperOptionId = "image" | "color" | "pattern";
export interface WallpaperOption {
  id: string
  name: string
  type: "image" | "color" | "pattern"
  preview: string
  isPremium?: boolean
}

/* theme */
export type themeId = 'air' | 'blocks' | 'bloom' | 'breeze' | 'lake' | 'mineral' | 'astrid' | 'groove' | 'agate' | 'twilight' | 'rise' | 'grid';
export interface Theme {
  id: themeId;
  name: string;
  preview: string;
  accent: string;
  isPremium: boolean;
  textColor: string;
  badgeColor: string;
}

/* colors */
export type IdColor = "add" | "dark" | "medium" | "light" | "black";
export type ColorId = {
  id: IdColor;
  custom?:string;
}
export interface SuggestedColor {
    id: IdColor;
    color: string;
    isAddButton?: boolean;
    custom?:string;
}

/* form */
export type FormTypes = {
    themeId : themeId;
    wallpaperId?: WallpaperOptionId;
    colorId?: ColorId;
    patternId?: string;
  file?: File | string;
}


/* page theme */
export interface ThemePageProps {
  control: Control<FormTypes, any, FormTypes>
}

/* page wallpaper  */
export interface WallpaperPageProps{
  control: Control<FormTypes, any, FormTypes>;
  watch: UseFormWatch<FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  clearErrors: UseFormClearErrors<FormTypes>
}

/* page wallpaper color */
export interface WallpaperColorProps{
  control: Control<FormTypes, any, FormTypes>;
  watch: UseFormWatch<FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  clearErrors: UseFormClearErrors<FormTypes>
}

/* page wallpaaper image */
export interface WallpaperImageProps{
  control: Control<FormTypes, any, FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  watch: UseFormWatch<FormTypes>;
  clearErrors: UseFormClearErrors<FormTypes>
}

/* page wallpapaer patterns */
export interface WallpaperPatternsProps{
  control: Control<FormTypes, any, FormTypes>;
  watch: UseFormWatch<FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  clearErrors: UseFormClearErrors<FormTypes>
}

/* apis */

export interface GetWallpaperResponse {
  ok:      boolean;
  message: string;
  profileDesign?: ProfileDesign;
}

export interface ProfileDesign {
  themeId:     themeId;
  wallpaperId: WallpaperOptionId;
  file:        string | undefined;
  patternId?:   string;
  colorId?:     ColorId;
}


export interface StoreWallpaperResponse {
  ok:            boolean;
  profileDesign: ProfileDesign;
}

export interface DeleteWallpaperImage {
  message: string;
}
