import type {IUserOrder} from "@/types/user-order-d-t";
import type {IUserOrderResponse} from "@/types/user-order-response-d-t";

export async function userOrdersData({id = undefined, plain = false, pagination = false, page = 1}: { id?: string | number, plain?: boolean,
    pagination?: boolean,
    page?: number} = {}): Promise<IUserOrder[]> {
    try {
        let query = id ? `/${id}` : '';

        const response: { data: { data: IUserOrderResponse[] } } = await $axios.get(`orders${query}?page=${page}`);

        if (plain) {
            if (pagination) {
                return response?.data || [];
            }

            return (response?.data?.data || []);
        }

        const data = response?.data?.data || [];
        return (Array.isArray(data) && data || [data]).map(convertUserOrdersResponse);
    } catch (error) {
        console.error('Error fetching user orders data:', error);
        return [];
    }
}

export function convertUserOrdersResponse(data: IUserOrderResponse): IUserOrder {
    return data;
}

export default userOrdersData;
