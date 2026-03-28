import { Modal } from "@/components/custom/Modal"
import { Button } from "@/components/ui/button"

import { ChevronRight, Edit, Trash } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { UpdatePorfilePhoto } from "./modal/UpdatePorfilePhoto"
import { useUserStore } from "@/context/userContext"
import { toast } from "sonner"
import { deletePhoto, postPhoto } from "../actions/updateBio.action"

interface ModalProps {
  show: boolean;
  title: string;
//   item?: FormInputs & { id: string };
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

const BASE_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;

export const Profile = () => {
    
    const [files, setFiles] = useState<File[]>([]);

    const user = useUserStore(state => state.user);
    const updateProfilePhoto = useUserStore(state => state.updateProfilePhoto);

    const navigate = useNavigate();

    const redirectToProfile = () => {
        navigate("/admin/account");
    }

    const handleSavePhoto = async () => {

        if(files && files?.length == 0) return;
        try {
            console.log(files);
            const file = files[0];
            const { image } = await postPhoto(file);
            updateProfilePhoto(image);

            toast.success('El registro se actualizo con extio!');
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error, vuelva a intentarlo más tarde');
        } finally {
            setModalUpdatePhotoProps(prev => ({...prev, show:false }));
        }
    }

    const handleDeletePhoto = async () => {
        try {
            await deletePhoto();
            updateProfilePhoto("");
             toast.success('El registro se actualizo con extio!');
        } catch (error) {
            console.log(error);
            toast.error("Hubo un error, vuelva a intentarlo más tarde");
        }
    }

    const [modalUpdatePhotoProps, setModalUpdatePhotoProps] = useState<ModalProps>({
        title: "Update profile photo",
        show: false,
        onSubmit: handleSavePhoto,
        onClose: () => {
          setModalUpdatePhotoProps((prev) => ({
            ...prev,
            show: false,
          }));
        },
    });

    

    return (
        <>      
            <div className="mb-4">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={user?.photo ? BASE_IMAGE + "/thumb_" + user.photo :  "/assets/images/no-profile-picture-icon.webp"}
                        alt="Profile picture"
                        className="object-cover bg-[#b3b3b3] w-20 h-20 rounded-full md:w-24 md:h-24"
                    />
                    <div className="flex gap-3 flex-col">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent cursor-pointer"
                            onClick={()=>
                                setModalUpdatePhotoProps((prev) => ({
                                    ...prev,
                                    show: true
                                }))
                            }>
                            <Edit className="w-4 h-4" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-500 hover:text-white cursor-pointer border-none"
                            onClick={handleDeletePhoto}>
                            <Trash className="w-4 h-4" />
                            Delete
                        </Button>

                    </div>
                </div>
            </div>

            {/* Heading Section */}
            <div className="mb-6">
                <div 
                    className="bg-gray-100 rounded-xl p-4 flex items-center justify-between hover:bg-gray-200 transition-colors cursor-pointer"
                    onClick={redirectToProfile}>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Heading</p>
                        <p className="text-gray-900 font-medium">codigoinerte</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            <Modal
                title={modalUpdatePhotoProps.title}
                show={modalUpdatePhotoProps.show}
                showCloseButton={true}
                onClose={modalUpdatePhotoProps.onClose}
                onSubmit={handleSavePhoto}
                onSubmitMessage="Upload image"
                >
                <UpdatePorfilePhoto
                    onChange={setFiles}
                />
            </Modal>
        </>
    )
}
