import type {IOrderItem} from "@/types/order-item-d-t";

export interface IUserOrder {
    id: number,
    status: string,
    date: string,
    total: number|string,
    items: IOrderItem[],
}
