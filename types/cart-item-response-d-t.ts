import type {IProductResponse} from "@/types/product-response-d-t";
import type {ICartItemAccessoriesResponse} from "@/types/cart-item-accessories-response-d-t";

export interface ICartItemResponse {
  quantity: number;
  accessories: ICartItemAccessoriesResponse[];
  differents: IProductResponse
}