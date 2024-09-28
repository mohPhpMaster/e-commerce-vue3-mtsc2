import type {IProductAccessoriesResponse} from "@/types/product-accessories-response-d-t";
import type {IProductAccessoriesGroupsResponse} from "@/types/product-accessories-groups-response-d-t";

export interface ICartItemAccessoriesResponse {
    accessories: IProductAccessoriesGroupsResponse[];
    group: IProductAccessoriesResponse[]
}