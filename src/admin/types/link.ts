export type FormInputs = {
    title: string;
    category_id: string;
    url: string;
    description: string;
    is_enabled: boolean;
}

export interface LinkStoreResponse {
    id:            number;
    url:           string;
    title:         string;
    description:   string;
    is_enabled:    boolean;
    order:         number;
    clicks:        number;
    visits:        number;
    category_id:   number;
    user_id:       number;
    created_at:    Date;
    updated_at:    Date;
    category_code: string;
    category_icon: string;
}


export interface LinkGetListResponse {
    id:           number;
    url:          string;
    title:        string;
    description:  string;
    is_enabled:   boolean;
    order:        number;
    clicks:       number;
    visits:       number;
    category_id:  number;
    user_id:      number;
    category_code:string;
    category_icon:string;
}

export interface LinkDeleteResponse {
    message: string;
}

export interface PutIsEnabledResponse {
    id:          number;
    url:         string;
    title:       string;
    description: string;
    is_enabled:  boolean;
    order:       number;
    clicks:      number;
    visits:      number;
    category_id: number;
    user_id:     number;
    created_at:  Date;
    updated_at:  Date;
}

export type ItemOrderRequest = {
    id: number;
    order:number;
}
export interface PutOrdersRequest{
    items: ItemOrderRequest[]
}

export interface PutOrdersResponse {
    message: string;
}
