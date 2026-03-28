import { useEffect, useRef, useState, type ChangeEventHandler } from 'react'
import "./styleDraggin.css";

interface Prop {
    labelAccept?: string;
    multiple?:boolean
    accept?: string;
    maxWidth?:number;
    maxHeight?:number;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}


const validateFileType = (file: File, accept: string): boolean => {
  if (!accept) return true;

  const acceptedTypes = accept.split(',').map(type => type.trim());
  
  for (const acceptedType of acceptedTypes) {
    // Validar por extensión (.jpg, .png, etc)
    if (acceptedType.startsWith('.')) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === acceptedType.toLowerCase()) {
        return true;
      }
    }
    // Validar por MIME type exacto (image/jpeg, application/pdf, etc)
    else if (!acceptedType.includes('*')) {
      if (file.type === acceptedType) {
        return true;
      }
    }
    // Validar por wildcard (image/*, video/*, etc)
    else if (acceptedType.includes('*')) {
      const [mainType] = acceptedType.split('/');
      const [fileMainType] = file.type.split('/');
      if (mainType === fileMainType) {
        return true;
      }
    }
  }
  
  return false;
};

export const InputFile = ({
    accept,
    multiple,
    labelAccept = "SVG, PNG, JPG or GIF",
    onChange
}:Prop) => {

    const [files, setFiles] = useState<File[]>([]);
    const fileInput = useRef<HTMLInputElement>(null);

    const addFileToInput = (file:File | null) => {
        if(!file || !fileInput.current) return;

        /* validar file */

        const response = validateFileType(file, accept || '')
        if(!response) return;

        /* validar file */

        const dt = new DataTransfer();
        dt.items.add(file);
        fileInput.current.files = dt.files;
        fileInput.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    useEffect(() => {

        const dropzoneContainer = document.querySelector('label');

        if(!dropzoneContainer) return;

        const onDrop = (e:DragEvent) => {
            e.preventDefault();

            const isMultiple = fileInput.current?.multiple;

            if(fileInput.current && isMultiple == false){
                setFiles([]);
                fileInput.current!.value = "";
            }
                

            dropzoneContainer.classList.remove('dragging');

            if(!e.dataTransfer) return;

            if (e.dataTransfer.items) {
                
                const items = isMultiple ? [...e.dataTransfer.items] : [[...e.dataTransfer.items][0]];
                
                items.forEach((item) => {                
                    if (item.kind === "file") {
                        const file = item.getAsFile();
                        addFileToInput(file);                        
                    }
                })
                
            } else {
                const items = isMultiple ? [...e.dataTransfer.files] : [[...e.dataTransfer.files][0]];
                
                items.forEach(addFileToInput)
            }

        }

        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            dropzoneContainer.classList.add('dragging');
        };

        const onDragLeave = () => {
            dropzoneContainer.classList.remove('dragging');
        };


        dropzoneContainer.addEventListener('drop', onDrop);

        dropzoneContainer.addEventListener('dragover', onDragOver)

        dropzoneContainer.addEventListener('dragleave', onDragLeave)

        return ()=> {
            dropzoneContainer.removeEventListener('drop', onDrop);
            dropzoneContainer.removeEventListener('dragover', onDragOver);
            dropzoneContainer.removeEventListener('dragleave', onDragLeave);
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='w-full'>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-gray-400 border-default-strong rounded-4xl overflow-hidden cursor-pointer hover:bg-neutral-tertiary-medium bg-gray-100/50">
                <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        fill="none" 
                        viewBox="0 0 24 24">
                            <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs">{labelAccept}</p>
                    {
                        !!files && (
                            <div>
                                <p className="text-xs text-center font-semibold my-2">Archivos añadidos: {files.length}</p>
                                <ul className='flex flex-col gap-3'>
                                {
                                    files.map((item, i) => (
                                        <li key={item?.name ?? i} className='text-xs'>{item?.name ?? ''}</li>
                                    ))
                                }                                
                                </ul>

                            </div>
                        )
                    }
                </div>
                <input 
                    ref={fileInput}
                    id="dropzone-file" 
                    type="file" 
                    className="hidden"
                    multiple={multiple}
                    accept={accept}
                    onChange={(e) => {
                        if(e.target.files){
                            const file = e.target.files[0];
                            if(file) setFiles(prev => [...prev, file]);
                        }
                        if(onChange)
                            onChange(e);
                    }}/>
            </label>
        </div>
    )
}
