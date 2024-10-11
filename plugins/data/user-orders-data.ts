import type {IUserOrder} from "@/types/user-order-d-t";
import type {IUserOrderResponse} from "@/types/user-order-response-d-t";

export async function userOrdersData({id = undefined, plain = false, pagination = false}: { id?: string | number, plain?: boolean,
    pagination?: boolean} = {}): Promise<IUserOrder[]> {
    try {
        let query = id ? `/${id}` : '';
        const response: { data: { data: IUserOrderResponse[] } } = await $axios.get(`orders${query}`);

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
        return {} as IUserOrder;
    }
}

export function convertUserOrdersResponse(data: IUserOrderResponse): IUserOrder {
    return data;
}

export default userOrdersData;
