import {$axios} from "@/plugins/00.axiosInstance";
import type {IUserAddresses} from "@/types/user-addresses-d-t";
import type {IUserAddressesResponse} from "@/types/user-addresses-response-d-t";

export async function userAddressesData({id=undefined}: {id?: string|number} = {}): Promise<IUserAddresses[]> {
    try {
        let query = id ? `/${id}` : '';
        const response: { data: { data: IUserAddressesResponse } } = await $axios.get(`addresses${query}`);
        // const response: { data: { data: IUserAddressesResponse[] } } = {data: await import('@/data/user-addresses.json')};
        const data = response?.data?.data || [];
        return (Array.isArray(data) && data || [data]).map(convertUserAddressesResponse);
    } catch (error) {
        console.error('Error fetching user addressess data:', error);
        return {} as IUserAddresses;
    }
}

function convertUserAddressesResponse(data: IUserAddressesResponse): IUserAddresses {
    return {
        ...data,
        long: Number(data?.long || 0),
        lat: Number(data?.lat || 0),
    };
}

export default userAddressesData;
