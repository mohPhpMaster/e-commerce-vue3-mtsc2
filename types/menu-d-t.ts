import type {IDropdownMenu} from "@/types/dropdown-menu-d-t";

export interface IMenuItem {
    ITYPE: 'static-menu',
    id: number;
    title: string;
    link: string;
    imageUrl?: string;
    mega_menu?: boolean;
    drop_down?: boolean;
    product_menus?: IProductMenu[];
    dropdown_menus?: IDropdownMenu[] | IMenuItem[];
}

interface IProductMenu {
    id: number;
    title: string;
    link: string;
    imageUrl?: string;
    dropdown_menus: IDropdownMenu[];
}

