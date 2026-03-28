import { InputFile } from "@/components/custom/InputFile"

interface Props {
    onChange: (file:File[]) => void;
}

export const UpdatePorfilePhoto = ({ onChange }: Props) => {

    return (
        <div className="flex items-center justify-center w-full my-5">
            <InputFile 
                accept=".jpg,.png,.jpeg"
                labelAccept="JPG, PNG, JPEG"
                onChange={(e) => {
                    if(!e.target.files) return;
                    const files = [...e.target.files];                    
                    onChange(files);
                }}
            />
        </div> 
    )
}
