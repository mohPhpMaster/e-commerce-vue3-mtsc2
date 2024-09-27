import {$axios} from "@/plugins/00.axiosInstance";
import type {IUserOrder} from "@/types/user-order-d-t";
import type {IUserOrderResponse} from "@/types/user-order-response-d-t";

export async function userOrdersData(): Promise<IUserOrder[]> {
    try {
        const response: { data: { data: IUserOrderResponse[] } } = await $axios.get('orders');
        const data = response?.data?.data || [];
        return data.map(convertUserOrdersResponse);
    } catch (error) {
        console.error('Error fetching user orders data:', error);
        return {} as IUserOrder;
    }
}

function convertUserOrdersResponse(data: IUserOrderResponse): IUserOrder {
    return data;
}

export default userOrdersData;
