import { memo, useEffect, useState } from 'react';
import { Edit, GripVertical, Plus, TriangleAlert } from 'lucide-react';
import type { icons } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from '@/components/ui/sortable';

import { useUserStore } from '@/context/userContext';
import { Modal } from '@/components/custom/Modal';

import { CardLink } from './CardLink';
import { CreateLink } from './modal/CreateLink';
import Link from '../actions/link.action';
import { useNavigate } from 'react-router';
import type { LinkDashboard, Tab } from '../types/dashboard';
import type { FormInputs, ItemOrderRequest } from '../types/link';
import { toast } from 'sonner';
import { Loader } from '@/components/custom/Loader';
import { useLandingStore } from '@/context/landingContext';

interface ModalProps {
  show: boolean;
  title: string;
  item?: FormInputs & { id: string };
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

interface Props {    
    selected: Tab
}

export const DashboardTabLink = memo(({ selected }: Props) => {

    const LinkClass = new Link();

    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);

    const setLinks = useLandingStore(state => state.setLinks);
    const [isOrderUpdating, setIsOrderUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<LinkDashboard[]>([]);

    const redirectToProfile = () => {
        navigate("/admin/account");
    };

    const [modalProps, setModalProps] = useState<ModalProps>({
        title: "Add new link",
        show: false,
        onSubmit: async () => {},
        onClose: () => {
            setModalProps((prev) => ({
            ...prev,
            show: false,
            }));
        },
    });

    const [modalDeleteProps, setModalDeleteProps] = useState<ModalProps>({
        title: "Delete link",
        show: false,
        onSubmit: async () => {},
        onClose: () => {
            setModalDeleteProps((prev) => ({
            ...prev,
            show: false,
            }));
        },
    });

    const handleLoadItems = async () => {
        try {
            const items = await LinkClass.get();
            if (items) {
            const itemsFormatted = items.map((item) => ({
                title: item.title,
                url: item.url,
                description: item.description,
                is_enabled: item.is_enabled,
                category_id: item.category_id,
                user_id: item.user_id,
                id: item.id,
                clicks: item.clicks,
                visitors: item.visits,
                category_code: item.category_code,
                category_icon: item.category_icon,
            }));
        
            setItems(itemsFormatted);            
            }
        } catch (error) {
            console.log(error);
            toast.error("Hubo un error al obtener los items, intente más tarde");
        }
    };

    const handleDeleteItem = async (id: number) => {
        setModalDeleteProps((prev) => ({
            ...prev,
            show: true,
            onSubmit: async () => {
                modalDeleteProps.onClose();

                try {
                    setIsLoading(true);
                    await LinkClass.delete(id);
                    await handleLoadItems();
                    toast.success("Enlace eliminado con exito");
                } catch (error) {
                    console.log(error);
                    toast.error("Hubo un error al eliminar el link, intentelo más tarde");
                } finally {
                    setIsLoading(false);
                }
            },
        }));
    };

    const handleEditItem = async (id: number) => {
        const itemSelected = items.find((item) => item.id == id);
        const item = {
            id: id.toString(),
            url: itemSelected?.url ?? "",
            title: itemSelected?.title ?? "",
            is_enabled: itemSelected?.is_enabled ? true : false,
            category_id: (itemSelected?.category_id ?? "0").toString(),
            description: itemSelected?.description ?? "",
        };

        setModalProps((prev) => ({
            ...prev,
            show: true,
            title: "Edit link",
            item,
        }));
    };

    const handleChangeEnabled = async (id: number, is_enabled: boolean) => {
        try {
            const response = await LinkClass.putEnable(id, is_enabled);
            setItems((items) =>
                items.map((item) => {
                    if (item.id === response.id) {
                    return {
                        ...item,
                        is_enabled: response.is_enabled,
                    };
                    }
                    return item;
                }),
            );
            toast.success("Estado actualizado con exito");
        } catch (error) {
            toast.error("Hubo un error al actualizar el estado, intentelo más tarde");
            console.log(error);
        }
    };

    const handleUpdateOrders = async (newItems: LinkDashboard[]) => {
        const prevItems = { ...items };
        setItems(newItems);
        setIsOrderUpdating(true);
        try {
            const params: ItemOrderRequest[] = newItems.map((item, i) => ({
                id: Number(item.id),
                order: Number(i + 1),
            }));

            await LinkClass.putOrders(params);
            toast.success("Orden actualizado con exito");
        } catch (error) {
            console.log(error);
            setItems(prevItems);
            toast.error("Hubo un error al actualizar el orden, intentelo más tarde");
        } finally {
            setIsOrderUpdating(false);
        }
    };

    useEffect(() => {
        (async () => {
            await handleLoadItems();
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      
        const itemsFormattedStore= items
        .filter(item => item.is_enabled == true)
        .map((item) => ({
            id: Number(item.id),
            title: item.title,
            description: item.description,
            url: item.url,
            name: item.url,
            code: item.category_code,
            icon: item.category_icon as keyof typeof icons,
            category_url: item.url,
            image: null,
            category_description: "",
        }));

        setLinks(itemsFormattedStore);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
    

    return (
        <div className={`${selected != "link" ? "hidden" : "" }`}>
            <Loader isLoading={isLoading} />
            <div className="max-w-[90%] self-center w-full">
                <div className="mx-auto space-y-4">
                {/* Profile Header */}
                <Card className="p-6">
                    <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="/programmer-avatar.png" alt="Profile" />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                        CI
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-lg text-gray-900">
                        {user?.name ?? user?.nickname}
                        </h1>
                        {user?.bio && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {user?.bio}
                        </p>
                        )}
                    </div>
                    <div className="self-center">
                        <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 p-1 cursor-pointer"
                        onClick={redirectToProfile}
                        >
                        <Edit className="w-4 h-4 text-gray-400" />
                        </Button>
                    </div>
                    </div>
                </Card>

                {/* Add Button */}
                <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full text-base font-medium cursor-pointer"
                    onClick={() => {
                    setModalProps((prev) => ({
                        ...prev,
                        show: true,
                        title: "Add new link",
                        item: undefined,
                    }));
                    }}
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add
                </Button>

                {/* Shop Preview Notice */}
                {
                    items.length == 0 && (                
                        <Card className="p-4 bg-blue-50 border-blue-200">
                            <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <TriangleAlert className="w-3 h-3 text-blue-600" />
                            </div>
                            <div className="flex-1 self-center">
                                <p className="text-sm text-blue-800 leading-relaxed">
                                No hay links registrados
                                </p>
                            </div>              
                            </div>
                        </Card>
                    )
                }

                {/* YouTube Link */}
                <Sortable
                    value={items}
                    onValueChange={handleUpdateOrders}
                    getItemValue={(item) => item.id}
                >
                    <SortableContent
                    className="gap-3 flex flex-col"
                    style={{
                        ...(isOrderUpdating
                        ? {
                            pointerEvents: "none",
                            opacity: "0.5",
                            cursor: "not-allowed",
                            }
                        : {}),
                    }}
                    >
                    {(items ?? []).map((item) => (
                        <SortableItem key={item.id} value={item.id}>
                        <CardLink
                            name={item.title}
                            {...item}
                            onDelete={handleDeleteItem}
                            onChangeChecked={handleChangeEnabled}
                            onSetEdit={handleEditItem}
                        >
                            <SortableItemHandle>
                            <div className="px-2 py-4 cursor-grab flex items-center justify-center select-none">
                                <GripVertical className="text-gray-400" />
                            </div>
                            </SortableItemHandle>
                        </CardLink>
                        </SortableItem>
                    ))}
                    </SortableContent>
                    <SortableOverlay>
                    <div className="size-full rounded-2xl bg-primary/10" />
                    </SortableOverlay>
                </Sortable>

                <Modal
                    title={modalProps.title}
                    show={modalProps.show}
                    onClose={modalProps.onClose}
                    onSubmit={modalProps.onSubmit}
                    disableButtons={true}
                >
                    <CreateLink
                    onUpdate={(item) => {
                        const itemFound = items.find((i) => i.id === item.id);

                        if (itemFound) {
                        setItems(
                            items.map((i) => {
                            if (i.id == item.id) {
                                return item;
                            }
                            return i;
                            }),
                        );
                        } else {
                        setItems((prev) => [...prev, item]);
                        }
                        modalProps.onClose();
                    }}
                    onStore={LinkClass.store}
                    onPut={LinkClass.put}
                    item={modalProps.item}
                    />
                </Modal>

                <Modal
                    title={modalDeleteProps.title}
                    show={modalDeleteProps.show}
                    showCloseButton={true}
                    onClose={modalDeleteProps.onClose}
                    onSubmit={modalDeleteProps.onSubmit}
                    onSubmitMessage="Delete"
                >
                    <p className="my-5">Esta seguro que desea eliminar el enlace ?</p>
                </Modal>
                </div>
            </div>
        </div>
    )
})
