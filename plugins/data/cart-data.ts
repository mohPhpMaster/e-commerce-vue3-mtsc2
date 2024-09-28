import {$axios} from "@/plugins/00.axiosInstance";
import type {ICartResponse} from "@/types/cart-response-d-t";
import type {ICart} from "@/types/cart-d-t";
import type {ICartItem} from "@/types/cart-item-d-t";
import type {ICartItemResponse} from "@/types/cart-item-response-d-t";
import {convertProductResponse} from "@/plugins/data/product-data";
import {
    convertProductAccessoriesGroupsResponse,
    convertProductAccessoriesResponse
} from "@/plugins/data/product-accessories-groups-data";

export async function cartData(): Promise<ICart> {
    try {
        const response: { data: { data: ICartResponse } } = await $axios.get('cart');
        return convertCartResponse(response?.data?.data || {});
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return {} as ICart;
    }
}

export function convertCartResponse(data: ICartResponse): ICart {
    return {
        cartItems: (data?.cartItems || []).map(convertCartItemResponse),
        fee_id: data?.fee_id,
        subtotal: data?.subtotal || 0,
        total: data?.total || 0
    };
}

export function convertCartItemResponse(data: ICartItemResponse): ICartItem {
    return {
        quantity: data?.quantity || 0,
        accessories: (data?.accessories || []).map(convertProductAccessoriesGroupsResponse),
        differents: convertProductResponse(data?.differents || {})
    };
}

export default cartData;