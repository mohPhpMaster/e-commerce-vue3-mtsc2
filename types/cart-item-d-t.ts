import type {IProduct} from "@/types/product-d-t";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";

export interface ICartItem {
  quantity: number;
  accessories: ISelectedAccessories[];
  differents: IProduct
}