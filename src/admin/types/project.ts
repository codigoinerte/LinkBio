/* galery */

export interface Galery {
    id:         string;
    name:       string;
    image_path: string;
}


/* store */
export interface ProjectParamsRequest {
    name: string;
    description: string;
    short_description: string;
    location: string;
    link: string;
    from: string;
    to: string;
    is_enabled: boolean;
    files: File[];
}

export interface ProjectStoreResponse {
    ok:      boolean;
    message: string;
    project: Project;
}
/*
    id:                number;
    name:              string;
    description:       string;
    short_description: string;
    link:              string;
    location:          string;
    from:              Date;
    to:                Date;
    is_enabled:        boolean;
    order:             number;
    click:             number;
    visits:            number;
    created_at:        Date;
    updated_at:        Date;
    user_id:           number;
    galery?:           Galery[];
*/
export interface Project {
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
    created_at:        Date;
    updated_at:        Date;
    user_id:           number;
    galery?:           Galery[];
}

/* get projects */

export interface ProjectsResponse {
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
    created_at:        Date;
    updated_at:        Date;
    user_id:           number;
    galery?:           Galery[];
}

export interface Galery {
    id:         string;
    name:       string;
    image_path: string;
}

/* delete project */

export interface ProjectDeleteResponse {
    ok:      boolean;
    message: string;
}

/* update project */

export interface ProjectUpdateResponse {
    ok:      boolean;
    message: string;
    project: ProjectUpdated;
}

export interface ProjectUpdated {
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
    created_at:        Date;
    updated_at:        Date;
    user_id:           number;
    galery?:           Galery[];
}


/* update state project */

export interface ProjectUpdateStateResponse {
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
    created_at:        Date;
    updated_at:        Date;
    user_id:           number;
}

/* update order projects */

export type ItemOrderRequest = {
    id: number;
    order:number;
}

export interface ProjectUpdateOrderResponse {
    message: string;
}

/* FormInput */

export type FormInputs = {
    name:                string;
    description?:        string;
    short_description?:  string;
    link?:               string;
    location?:           string;
    from?:               string;
    to?:                 string;
    is_enabled?:         boolean;
    files?:              File[];
}