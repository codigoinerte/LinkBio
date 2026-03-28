import { api } from "@/api/api.connection"
import type { CategoriesResponse } from "../types/categories";

export const category = async ():Promise<CategoriesResponse[] | null> => {
    try {
        const { data } = await api.get<CategoriesResponse[]>("/categories");
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}