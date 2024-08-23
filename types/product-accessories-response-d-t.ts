import type {IProductAccessoriesGroupsResponse} from "@/types/product-accessories-groups-response-d-t";

export interface IProductAccessoriesResponse {
    id: string|number;
    name: string;
    is_required: string|number|boolean;
    accessories?: {
        data: IProductAccessoriesGroupsResponse[];
    } | undefined;
    price?: string;
    discount?: number | string;
}