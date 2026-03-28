import { api } from "@/api/api.connection";
import type { FormInputs, ItemOrderRequest, LinkDeleteResponse, LinkGetListResponse, LinkStoreResponse, PutIsEnabledResponse, PutOrdersResponse } from "../types/link";

class Link {
    async store(params:FormInputs):Promise<LinkStoreResponse> {
        const {data} = await api.post<LinkStoreResponse>("links", {
            ...params
        });
        return data;        
    }
    async get():Promise<LinkGetListResponse[]>{
        const {data} = await api.get<LinkGetListResponse[]>("links");
        return data;
    }
    async delete(id:number):Promise<LinkDeleteResponse>{
        const {data} = await api.delete<LinkDeleteResponse>(`links/${id}`);
        return data;
    }
    async put(id:number,params:FormInputs):Promise<LinkStoreResponse>{
        const {data} = await api.put<LinkStoreResponse>(`links/${id}`, { ...params });
        return data;
    }
    async putEnable(id:number, is_enabled:boolean):Promise<PutIsEnabledResponse>{
        const {data} = await api.put(`/link/updateState/${id}`, {
            is_enabled
        });
        return data;
    }
    async putOrders(params: ItemOrderRequest[]):Promise<PutOrdersResponse>{
        const {data} = await api.put("/updateOrderslinks", { items: params });
        return data;
    }
}

export default Link;