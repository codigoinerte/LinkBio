import { Loader } from '@/components/custom/Loader'
import type { Galery, ProjectDashboard, Tab } from '../types/dashboard'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, TriangleAlert } from 'lucide-react';
import type { FormInputs, ItemOrderRequest } from '../types/project';
import { Card } from '@/components/ui/card';
import Project from '../actions/project.action';
import { toast } from 'sonner';
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from '@/components/ui/sortable';
import { CardProject } from './CardProject';
import { Modal } from '@/components/custom/Modal';
import { CreateProject } from './modal/CreateProject';
import { DateTime } from 'luxon';
import { useLandingStore } from '@/context/landingContext';

interface ModalProps {
  show: boolean;
  title: string;
  item?: FormInputs & { id: string | number };
  prevFiles?: Galery[];
  onClose: () => void;
  onSubmit: () => Promise<void>;
}


interface Props {
    selected: Tab
}

export const DashboardTabProject = ({ selected }:Props) => {

    const ProjectClass = new Project();
    
    const setProjects = useLandingStore(state => state.setProjects);
    const [isOrderUpdating, setIsOrderUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<ProjectDashboard[]>([]);

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

    const formatDateForInput = (value?: string) => {
        if (!value) return '';

        const dateFromSql = DateTime.fromSQL(value);
        if (dateFromSql.isValid) {
            return dateFromSql.toFormat('yyyy-MM-dd');
        }

        const dateFromIso = DateTime.fromISO(value);
        if (dateFromIso.isValid) {
            return dateFromIso.toFormat('yyyy-MM-dd');
        }

        return '';
    };

    const handleLoadProjects = async () => {
        try {
            const response =  await ProjectClass.get();
            
            const dataFormmated = (response??[]).map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                short_description: item.short_description,
                link: item.link,
                location: item.location,
                from: item.from,
                to: item.to,
                is_enabled: item.is_enabled,
                order: item.order,
                click: item.click,
                visits: item.visits,
                galery: item.galery
            }))
            setItems(dataFormmated);
        } catch (error) {
            console.log(error);
            toast.error("Hubo un error al obtener los items, intente más tarde");
        }
    }

    const handleUpdateOrders = async (newItems: ProjectDashboard[]) => {
        const prevItems = { ...items };
        setItems(newItems);
        setIsOrderUpdating(true);
        try {
            const params: ItemOrderRequest[] = newItems.map((item, i) => ({
                id: Number(item.id),
                order: Number(i + 1),
            }));

            await ProjectClass.putOrders(params);
            toast.success("Orden actualizado con exito");
        } catch (error) {
            console.log(error);
            setItems(prevItems);
            toast.error("Hubo un error al actualizar el orden, intentelo más tarde");
        } finally {
            setIsOrderUpdating(false);
        }
    }

    const handleChangeEnabled = async (id:number, is_enabled:boolean) => {
        try {
            const response = await ProjectClass.putEnable(id, is_enabled);
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
    }

    const handleDeleteItem = async (id:number) => {
        setModalDeleteProps((prev) => ({
            ...prev,
            show: true,
            onSubmit: async () => {
            modalDeleteProps.onClose();

            try {
                setIsLoading(true);
                await ProjectClass.delete(id);
                await handleLoadProjects();
                toast.success("Enlace eliminado con exito");
            } catch (error) {
                console.log(error);
                toast.error("Hubo un error al eliminar el link, intentelo más tarde");
            } finally {
                setIsLoading(false);
            }
            },
        }));
    }

    const handleEditItem = async (id:number) => {
        const itemSelected = items.find((item) => item.id == id);
        const from = formatDateForInput(itemSelected?.from);
        const to = formatDateForInput(itemSelected?.to);
        const item = {
            id: id.toString(),
            name: itemSelected?.name ?? '',
            description: itemSelected?.description,
            short_description: itemSelected?.short_description,
            link: itemSelected?.link,
            location: itemSelected?.location,
            from,
            to,
            is_enabled: itemSelected?.is_enabled ?? false
        };
        
        setModalProps((prev) => ({
            ...prev,
            show: true,
            title: "Edit project",
            prevFiles: itemSelected?.galery,
            item
        }));
    }    

    useEffect(() => {
      (async ()=>{
        await handleLoadProjects();
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {

      const itemsFormatted = items.filter(item => item.is_enabled == true)
                                    .map(item => ({
                                        id: item.id.toString(),
                                        name: item.name,
                                        description: item.description,
                                        short_description: item.short_description,
                                        link: item.link,
                                        location: item.location,
                                        from: new Date(item.from),
                                        to: new Date(item.to),
                                        galery: (item.galery || []).map(g => ( {
                                                id: Number(g.id),
                                                origin_id: 0,
                                                name: g.name,
                                                image_path: g.image_path
                                        })),
                                    }));

      setProjects(itemsFormatted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
    

    return (
        <div className={selected != "project" ? "hidden" : ""}>
            <Loader isLoading={isLoading} />

            {/* Add Button */}
            <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full text-base font-medium cursor-pointer mb-4"
                onClick={() => {
                    setModalProps((prev) => ({
                        ...prev,
                        show: true,
                        title: "Add new link",
                        item: undefined,
                    }));
                }}>
                <Plus className="w-5 h-5 mr-2" />
                Add
            </Button>

            {
                items.length == 0 && (                
                    <Card className="p-4 bg-blue-50 border-blue-200">
                        <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center shrink-0 mt-0.5">
                            <TriangleAlert className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="flex-1 self-center">
                            <p className="text-sm text-blue-800 leading-relaxed">
                            No hay proyectos registrados
                            </p>
                        </div>              
                        </div>
                    </Card>
                )
            }

            <Sortable
                value={items}
                onValueChange={handleUpdateOrders}
                getItemValue={(item) => item.id}>

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
                    }}>
                    {(items ?? []).map((item) => (
                        <SortableItem key={item.id} value={item.id}>
                            <CardProject
                                {...item}
                                onDelete={handleDeleteItem}
                                onChangeChecked={handleChangeEnabled}
                                onSetEdit={handleEditItem}>
                                <SortableItemHandle>
                                    <div className="px-2 py-4 cursor-grab flex items-center justify-center select-none">
                                        <GripVertical className="text-gray-400" />
                                    </div>
                                </SortableItemHandle>
                            </CardProject>
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
                disableButtons={true}>
                
                <CreateProject
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
                    onUpdateGallery={({ idProject, idImage })=>{
                        setItems(prevItems => prevItems.map(project => {
                            if(project.id == idProject){
                                const newGalery = project.galery?.filter(image => String(image.id) != idImage.toString());
                                return {
                                    ...project,
                                    galery: newGalery
                                }
                            }
                            
                            return project;

                        }))
                    }}
                    onStore={ProjectClass.store.bind(ProjectClass)}
                    onPut={ProjectClass.put.bind(ProjectClass)}
                    prevFiles={modalProps.prevFiles}
                    item={{
                        id: (modalProps.item?.id ?? '').toString(),
                        name: modalProps.item?.name ?? '',
                        description: modalProps.item?.description,
                        short_description: modalProps.item?.short_description,
                        location: modalProps.item?.location,
                        link: modalProps.item?.link,
                        from: modalProps.item?.from,
                        to: modalProps.item?.to,
                        is_enabled: modalProps.item?.is_enabled,
                    }}
                />
            </Modal>

            <Modal
                title={modalDeleteProps.title}
                show={modalDeleteProps.show}
                showCloseButton={true}
                onClose={modalDeleteProps.onClose}
                onSubmit={modalDeleteProps.onSubmit}
                onSubmitMessage="Delete">
                <p className="my-5">Esta seguro que desea eliminar el enlace ?</p>
            </Modal>
            
        </div>
    )
}
