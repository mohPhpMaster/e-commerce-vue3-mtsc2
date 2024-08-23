import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";

export interface ISelectedAccessories {
    group: IProductAccessories,
    accessory: IProductAccessoriesGroups,
}