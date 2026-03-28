import { FieldError } from '../ui/field';

interface Props {
    hasError: boolean;
    message: string;
    className?:string;
}

export const ErrorsLabel = ({ hasError, className, message}:Props) => {
    if(!hasError) return; 
    return <FieldError className={`text-xs mt-1 ${className}`}>{message}</FieldError>
}
