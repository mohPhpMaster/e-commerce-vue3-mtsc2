import type {IProduct} from "@/types/product-d-t";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";
import type {ICartItem} from "@/types/cart-item-d-t";

export interface IOrderItem extends ICartItem {
  id?: number;
  quantity: number;
  price: number;
  accessories: ISelectedAccessories[];
  differents: IProduct
}