import { api } from "@/api/api.connection"
import type { CheckNicknameResponse } from "@/types/check.nickname.response";


export const checkNickname = async (nickname:string):Promise<boolean> => {
    const { data } = await api.post<CheckNicknameResponse>('/auth/validate-nickname',{
        nickname
    });

    return data.is_unique
}
