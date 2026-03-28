import { useId } from 'react'
import { Label } from '@/components/ui/label'
import * as LycideReact from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import DynamicIcon from './DynamicIcon';

export interface Option{
    label:string;
    value:string;
    icon?: keyof typeof LycideReact;
}
interface Props {
    label:string;
    defaultValue?:string;
    categorySelect?:string;
    placeholder?:string;
    options: Option[];
    value: string;
    onChange?: (value:string) => void;
    classNameTrigger?:string;
}

export const SelectWithIcon = ({label, defaultValue, placeholder, categorySelect, options, value, classNameTrigger, onChange}:Props) => {
    
    const id = useId();

    return (
        <div className='w-full space-y-2'>
            <Label htmlFor={id}>{label}</Label>
            <Select defaultValue={defaultValue} onValueChange={onChange} value={value}>
                <SelectTrigger id={id} className={`w-full ${classNameTrigger}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            categorySelect &&
                            (
                                <SelectLabel>{categorySelect}</SelectLabel>
                            )
                        }
                        {
                            options.map((option) => (
                                <SelectItem 
                                    key={option.label}
                                    value={option.value}>
                                    {option.icon && (<DynamicIcon name={option.icon} /> )}
                                    {option.label}
                                </SelectItem>
                            ))
                        }                       
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
