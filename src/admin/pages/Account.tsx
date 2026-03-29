import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Title } from "../components";
import { CircleCheck, CircleX, LoaderCircle, Save } from "lucide-react";
import { useUserStore } from "@/context/userContext";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useCheckNickname } from "@/hooks/useCheckNickname";
import { Textarea } from "@/components/ui/textarea";
import { deleteAccount, updateBioAction } from "../actions/updateBio.action";
import type { RequestBio } from "../types/bio.response";
import { toast } from "sonner";
import { Modal } from "@/components/custom/Modal";

// type Inputs = {
//     name: string;
//     nickname: string;
//     password?: string;
//     bio?: string;
// }
interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export const Account = () => {

  const [modalDeleteProps, setModalDeleteProps] = useState<ModalProps>({
      title: "Delete account",
      show: false,
      onSubmit: async ()=> console.log("eliminado !"),
      onClose: () => {
        setModalDeleteProps((prev) => ({
          ...prev,
          show: false,
        }));
      },
  });

  const logout = useUserStore(state => state.logout);

  const [isPosting, setIsPosting] = useState(false);
  const nickNameRef = useRef<HTMLInputElement>(null);

  const {
    isCheckNickname,
    isValidNickName,
    isValidNickNameSubmit,

    checkNickname,
    setisValidNickName,
    setisCheckNickname,
    setIsValidNickNameSubmit,
  } = useCheckNickname({ inputRef: nickNameRef });

  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RequestBio>({
    defaultValues: {
      name: user?.name || "",
      nickname: user?.nickname || "",
      bio: user?.bio || "",
      headline: user?.headline || "",
    },
    mode: "onChange",
  });

  const updateProfile = useUserStore((state) => state.updateProfile);

  /* logica para integrar validación nickname */
  const nicknameValue = watch("nickname");
  const validateNickname = async () => {
    setisCheckNickname(true);
    try {
      const isAvailable = await checkNickname(nicknameValue);
      setisValidNickName(isAvailable);
      if (isAvailable) {
        clearErrors("nickname");
      } else {
        setError("nickname", {
          type: "manual",
          message: "Este nickname ya está en uso.",
        });
      }
    } catch {
      setError("nickname", {
        type: "manual",
        message: "Error al verificar el nickname.",
      });
    } finally {
      setisCheckNickname(false);
    }
  };
  useEffect(() => {
    setIsValidNickNameSubmit(nicknameValue === user?.nickname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicknameValue]);
  /* logica para integrar validación nickname */
  const onSubmit: SubmitHandler<RequestBio> = async (params) => {
    setIsPosting(true);

    try {
      const { user } = await updateBioAction(params);
      updateProfile(user);

      toast.success("Se actualizo el perfil con exito");
    } catch {
      toast.warning("Vuelva a intentar más tarde");
    }

    setIsPosting(false);
  };

  /* handle delete account */
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(true);
      toast.success("Eliminación exitosa, Adios!");
      setTimeout(()=> logout(), 500);
    } catch (error) {
      console.log(error);
      toast.warning("Hubo un error al intentar eliminar la cuenta, vuelva a intentar más tarde");
    }
  }

  return (
    <>
      <div className="flex flex-col flex-1 rounded-lg border border-dashed shadow-sm p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title title="My Information">
            <Button
              type="submit"
              variant="outline"
              className="border-none cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
              disabled={isPosting || !isValidNickNameSubmit}
            >
              {isPosting ? <LoaderCircle className="animate-spin" /> : <Save />}
              Save
            </Button>
          </Title>
          <div className="w-[100%]">
            <div className="max-w-[611px] m-auto">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    {...register("name", {
                      required: "Nombre de usuario es requerido",
                      maxLength: 30,
                      minLength: 5,
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Solo se permiten letras y espacios",
                      },
                    })}
                    type="text"
                    className={`w-full ${errors.name && "border-red-500"}`}
                    placeholder="Ingresa tu nombre"
                    onInput={(e) => {
                      const input = e.currentTarget;
                      input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    Solo letras y espacios
                  </p>
                  {errors.name && (
                    <span className="text-xs text-red-500 leading-[10px]">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Headline */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700">
                    Headline
                  </Label>
                  <Input
                    {...register("headline", {
                      required: "Titular profesional",
                      maxLength: 150,
                      minLength: 5,
                    })}
                    type="text"
                    className={`w-full ${errors.headline && "border-red-500"}`}
                    placeholder="Titulo profesional"                    
                  />                  
                  {errors.headline && (
                    <span className="text-xs text-red-500 leading-[10px]">
                      {errors.headline.message}
                    </span>
                  )}
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        @
                      </span>
                      <Input
                        {...register("nickname", {
                          required: "Nickname es requerido",
                          maxLength: 30,
                          minLength: 5,
                          validate: {
                            isVerified: () => {
                              return (
                                isValidNickNameSubmit ||
                                "Debes validar este nickname"
                              );
                            },
                          },
                        })}
                        id="username"
                        type="text"
                        className={`rounded-l-none pr-10 ${errors.nickname && "border-red-500"}`}
                        placeholder="Enter username"
                        maxLength={30}
                      />
                      <Button
                        variant={"outline"}
                        className="ms-2 cursor-pointer"
                        onClick={validateNickname}
                        type="button"
                      >
                        {isCheckNickname && (
                          <LoaderCircle className="animate-spin" />
                        )}
                        {isValidNickName === true && (
                          <CircleCheck className="text-green-600" />
                        )}
                        {isValidNickName === false && (
                          <CircleX className="text-red-600" />
                        )}
                        Check
                      </Button>
                    </div>
                    {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3">{getUsernameIcon()}</div> */}
                  </div>
                  {/* {getUsernameMessage()} */}
                  <p className="text-xs text-gray-500">
                    Solo se permiten letras, números y guiones bajos. Mínimo 3 caracteres.
                  </p>
                  {errors.nickname && (
                    <span className="text-xs text-red-500 ">
                      {errors.nickname.message}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    disabled
                    className="w-full bg-gray-50 text-gray-500 cursor-not-allowed"
                    value={user?.email}
                  />
                  <p className="text-sm text-gray-500">
                    Your email can't be changed as you signed up using your
                    Google account.
                  </p>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Descripción
                  </Label>
                  <Textarea
                    {...register("bio")}
                    id="descripcion"
                    className="w-full"
                  />

                  <p className="text-sm text-gray-500"></p>
                </div>
              </div>

              {/* Delete Account Section */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Delete forever
                  </h2>
                  <p className="text-sm text-gray-600">
                    Permanently delete your account and all your Linktree
                    profiles.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700 bg-transparent cursor-pointer"
                    onClick={()=> setModalDeleteProps((prev) => ({
                                    ...prev,
                                    show: true,
                                    onSubmit: handleDeleteAccount,
                                }))}>
                    Delete account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Modal
        title={modalDeleteProps.title}
        show={modalDeleteProps.show}
        showCloseButton={true}
        onClose={modalDeleteProps.onClose}
        onSubmit={modalDeleteProps.onSubmit}
        onSubmitMessage="Delete account"
        classNameSubmit="bg-red-500"
      >
        <div className="py-4 text-center">
          <p>Esta seguro que desea eliminar su cuenta ? <br/> <span className="text-gray-500 text-sm">Una vez su cuenta este eliminada no podra recuperar ninguna configuración hecha</span></p>
        </div>
      </Modal>
    </>
  );
};
