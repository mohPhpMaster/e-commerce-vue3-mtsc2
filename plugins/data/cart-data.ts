import type {ICartResponse} from "@/types/cart-response-d-t";
import type {ICart} from "@/types/cart-d-t";
import type {ICartItem} from "@/types/cart-item-d-t";
import type {ICartItemResponse} from "@/types/cart-item-response-d-t";
import {convertProductResponse} from "@/plugins/data/product-data";

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
        id: data?.id || undefined,
        quantity: data?.quantity || 0,
        accessories: data?.accessories?.data || data?.accessories || [],
        differents: convertProductResponse(data?.differents?.data || data?.differents || {}),
    }

    // let getGroup = (id: number) => {
    //     return ((data?.groups || []).find(x => x.id == id) || {});
    // }
    // console.log(35, (data || []))
    // return {
    //     quantity: data?.quantity || 0,
    //     accessories: (data?.accessories || [])
    //         .map(a => {
    //             return {
    //                 accessory: a,
    //                 // group: convertProductAccessoriesResponse(data?.accessories.group.find(x => x.id === a.group_id) || {})
    //                 group: getGroup(Number(a.group_id))
    //             }
    //         }),
    //     // (data?.accessories || []).map(convertProductAccessoriesGroupsResponse),
    //     differents: convertProductResponse(data?.differents || {})
    // };
}

export default cartData;