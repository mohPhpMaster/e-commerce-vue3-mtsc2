import type {ICartItem} from "@/types/cart-item-d-t";

export interface ICart {
    cartItems: ICartItem[],
    fee_id?: number | string,
    subtotal: number | string,
    total: number | string
}