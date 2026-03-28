import { api } from "@/api/api.connection";
import type { ItemOrderRequest, ProjectDeleteResponse, ProjectParamsRequest, ProjectsResponse, ProjectStoreResponse, ProjectUpdateOrderResponse, ProjectUpdateResponse, ProjectUpdateStateResponse } from "../types/project";

class Project {
    async store(paramsJson:ProjectParamsRequest):Promise<ProjectStoreResponse>{
        const params = this.formatParamsJson(paramsJson);
        const { data } = await api.postForm<ProjectStoreResponse>(`projects`, params);
        return data;
    }
    async get():Promise<ProjectsResponse[]>{
        const { data } = await api.get<ProjectsResponse[]>(`projects`);
        return data;
    }
    async delete(id:number):Promise<ProjectDeleteResponse>{
        const { data } = await api.delete<ProjectDeleteResponse>(`projects/${id}`);
        return data;
    }
    async put(id:string, paramsJson:ProjectParamsRequest):Promise<ProjectUpdateResponse>{        
        const params = this.formatParamsJson(paramsJson);        
        const { data } = await api.postForm<ProjectUpdateResponse>(`projects/update/${id}`, params);
        return data;
    }
    async putEnable(id:number, is_enabled:boolean):Promise<ProjectUpdateStateResponse>{
        const {data} = await api.put<ProjectUpdateStateResponse>(`project/updateState/${id}`, {
            is_enabled
        });
        return data;
    }
    async putOrders(params: ItemOrderRequest[]):Promise<ProjectUpdateOrderResponse>{
        const {data} = await api.put<ProjectUpdateOrderResponse>("/updateOrdersprojects", { items: params });
        return data;
    }

    private formatParamsJson(paramsJson:ProjectParamsRequest):FormData{
        const params = new FormData();
        (Object.keys(paramsJson) as (keyof ProjectParamsRequest)[]).forEach((key) => {
            if (key === "files") {
                const files = paramsJson[key];
                files.map(file => {
                    params.append("files[]", file);    
                })
            } else {
                const value = paramsJson[key];
                if(key === "is_enabled"){
                    params.append(key, (String(value) === "true" || String(value) === "1") ? "1" : "0" );
                }else{
                    params.append(key, String(value));
                }
            }
        });
        return params;
    } 
}

export default Project;