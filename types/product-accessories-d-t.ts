import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";

export interface IProductAccessories {
    ITYPE: 'product-accessories';
    id: string|number;
    name: string;
    is_required: string|number|boolean;
    accessories: IProductAccessoriesGroups[];
    price?: number | string;
    discount?: number | string;
    net?: number;
}