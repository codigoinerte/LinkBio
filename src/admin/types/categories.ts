import * as LucideReact from "lucide-react";
export interface CategoriesResponse {
    id:          number;
    name:        string;
    code:        string;
    icon:        keyof typeof LucideReact;
    url:         string;
    image:       string | null;
    description: string;
    created_at:  string | null;
    updated_at:  string | null;
}

