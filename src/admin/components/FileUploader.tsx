import { Trash } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type PrevFiles = {
    id:     string;
    name:   string;
    url:    string;
}

interface FileUploaderProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  isRequired?: boolean;
  requiredMessage?: string;
  accept?: Accept;
  dropzoneText?: string;
  prevFiles?:PrevFiles[];
  onDeleteImageSelected: (i:number) => void;
  onDeleteImageSaved: (id:number) => void;
}

export function FileUploader<TFieldValues extends FieldValues>({
  control,
  name,
  isRequired = false,
  requiredMessage = 'Debe seleccionar una imagen',
  accept = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
  },
  dropzoneText = "Drag 'n' drop some files here, or click to select files",
  prevFiles = [],
  onDeleteImageSelected,
  onDeleteImageSaved
}: FileUploaderProps<TFieldValues>) {
  const getFileName = (value: unknown): string | null => {
    if (!value || typeof value !== 'object') return null;
    if (!('name' in value)) return null;

    const fileName = (value as { name?: unknown }).name;
    return typeof fileName === 'string' ? fileName : null;
  };

  const { field, fieldState } = useController<TFieldValues>({
    control,
    name,
    rules: {
      required: isRequired ? requiredMessage : false,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      field.onChange(acceptedFiles);
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept,
  });

  const selectedFiles = Array.isArray(field.value)
    ? field.value
        .map((value: unknown) => getFileName(value))
        .filter((value: string | null): value is string => Boolean(value))
    : [];

  return (
    <div>
      <div
        {...getRootProps({
          className:
            'dropzone text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-dashed border-gray-500 bg-white bg-clip-border px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none min-h-30 flex items-center justify-center mb-2 cursor-pointer',
        })}>
        <input {...getInputProps()} />
        <p>{isDragActive ? 'Suelta el archivo aqui...' : dropzoneText}</p>
      </div>

        <div className="text-xs text-gray-500 mb-2 flex flex-col gap-4">
        {selectedFiles.length > 0 && (
            <SelectedFiles files={field.value} handleDeleteImage={onDeleteImageSelected} />
        )}
        {prevFiles.length > 0 && (        
            <SelectedPrevFiles files={prevFiles} handleDeleteImage={onDeleteImageSaved} />        
        )}
        </div>

      {fieldState.error?.message && (
        <p className="text-xs text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}

interface SelectedFilesProps {
    files:File[];
    handleDeleteImage: (i: number) => void;
}

const SelectedFiles = ({ files, handleDeleteImage }:SelectedFilesProps) => {
    return files.map((file, i) => (
        
        <div key={file.name} className="w-full grid grid-cols-[60px_1fr_80px]">
            <div className="relative">                    
                <img
                    src={URL.createObjectURL(file)}
                    className="rounded-md h-15 w-full object-cover"
                />
            </div>
            <div className='flex flex-row gap-0.5 items-start justify-between px-4'>
                <span className="font-normal rounded-xl text-[15px] text-neutral-800 self-center">
                    {file.name}
                </span>

            </div>
            <div className='flex items-center justify-center'>
                <button 
                    type="button"
                    className="border-none p-1.5 rounded-sm bg-red-500 text-white cursor-pointer top-2 right-2 flex flex-row gap-1 items-center justify-center"
                    onClick={()=> handleDeleteImage(i)}>
                    <Trash className="w-4 h-4" /> Eliminar 
                </button>
            </div>                
        </div>
        
    ))
}

interface SelectedPrevFilesProps {
    files:PrevFiles[];
    handleDeleteImage: (i: number) => void;
}

const SelectedPrevFiles = ({ files, handleDeleteImage }:SelectedPrevFilesProps) => {
    return files.map((file, i) => (
        
        <div key={`${file.name}-${i}`} className="w-full grid grid-cols-[60px_1fr_80px]">
            <div className="relative">                    
                <img
                    src={file.url}
                    className="rounded-md h-15 w-full object-cover"
                />
            </div>
            <div className='flex flex-row gap-0.5 items-start justify-between px-4'>
                <span className="font-normal rounded-xl text-[15px] text-neutral-800 self-center">
                    {file.name}
                </span>
            </div>
            <div className='flex items-center justify-center'>
                <button 
                    type="button"
                    className="border-none p-1.5 rounded-sm bg-red-500 text-white cursor-pointer top-2 right-2 flex flex-row gap-1 items-center justify-center"
                    onClick={()=> handleDeleteImage(Number(file.id))}>
                    <Trash className="w-4 h-4" /> Eliminar 
                </button>
            </div>                
        </div>
        
    ))
}