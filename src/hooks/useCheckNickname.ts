import { checkNickname } from "@/actions/check.nickname.action";
import { slugByText } from "@/lib";
import { useEffect, useState } from "react"

interface Props {
    inputRef?: React.RefObject<HTMLInputElement | null>
}

export const useCheckNickname = ({inputRef}:Props) => {

    const [isCheckNickname, setisCheckNickname] = useState(false);
    const [isValidNickName, setisValidNickName] = useState<boolean| null>(null);
    const [isValidNickNameSubmit, setIsValidNickNameSubmit] = useState(false);
    useEffect(() => {
      
        const clearValidValueNickname = setTimeout(() => {
            setisValidNickName(null);
        }, 700);
    
      return () => {
        clearTimeout(clearValidValueNickname);
      }
    }, [isValidNickName])
    

    const validateNickName = async () => {
        if(!inputRef?.current) return;

        const nickname = slugByText(inputRef.current?.value);

        inputRef.current.value = nickname;

        if(!nickname){
            inputRef.current?.focus();
            return;
        }
        
        try {
            
            setisCheckNickname(true);
            const isValid = await checkNickname(nickname);
            setisValidNickName(isValid);
            setIsValidNickNameSubmit(isValid);

        } catch (error) {
            console.log(error);
            setisValidNickName(false);
        }finally{
            setisCheckNickname(false);
        }
    }

    const resetValidNicknameSubmit = () => {
        setIsValidNickNameSubmit(false);
    }

    return {  
        currentNickname: inputRef?.current?.value || '',   
        isCheckNickname,   
        isValidNickName,
        isValidNickNameSubmit,
        resetValidNicknameSubmit,
        setIsValidNickNameSubmit,
        validateNickName,
        checkNickname,
        setisCheckNickname,
        setisValidNickName,        
    }
}
