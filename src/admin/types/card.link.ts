import type { PropsWithChildren } from "react";

export interface CardLinkProps extends PropsWithChildren{
    name: string;
    onDelete: (id:number) => Promise<void>;
    onChangeChecked: (id: number, is_enabled: boolean) => Promise<void>;
    onSetEdit:(id:number) => void;
}