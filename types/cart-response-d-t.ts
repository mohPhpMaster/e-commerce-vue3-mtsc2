import type {IProductResponse} from "@/types/product-response-d-t";
import type {ICartItem} from "@/types/cart-item-d-t";
import type {ICartItemResponse} from "@/types/cart-item-response-d-t";

export interface ICartResponse {
    cartItems: ICartItemResponse[],
    fee_id?: number|string,
    subtotal: number|string,
    total: number|string
}