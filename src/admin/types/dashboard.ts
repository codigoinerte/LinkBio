export interface LinkDashboard{
    title:        string;
    url:          string;
    description:  string;
    is_enabled:   boolean;
    category_id:  number;
    user_id:      number;
    id:           number;
    clicks:       number;
    visitors:     number;
    category_code:string;
    category_icon:string;
}

export interface Galery {
    id:         string;
    name:       string;
    image_path: string;
}

export interface ProjectDashboard {
    id:                number;
    name:              string;
    description:       string;
    short_description: string;
    link:              string;
    location:          string;
    from:              string;
    to:                string;
    is_enabled:        boolean;
    order:             number;
    click:             number;
    visits:            number;
    galery?:           Galery[];
}

export type Tab = "link" | "project" ;
