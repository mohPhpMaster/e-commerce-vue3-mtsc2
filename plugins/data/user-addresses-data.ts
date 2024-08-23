import {$axios} from "@/plugins/axiosInstance";
import type {IUserAddresses} from "@/types/user-addresses-d-t";
import type {IUserAddressesResponse} from "@/types/user-addresses-response-d-t";

export async function userAddressesData(): Promise<IUserAddresses[]> {
    try {
        // const response: { data: { data: IUserAddressesResponse[] } } = await $axios.get('addresses');
        const response: { data: { data: IUserAddressesResponse[] } } = {data: await import('@/data/user-addresses.json')};
        const data = response?.data?.data || [];
        return data.map(convertUserAddressesResponse);
    } catch (error) {
        console.error('Error fetching user addressess data:', error);
        return {} as IUserAddresses;
    }
}

function convertUserAddressesResponse(data: IUserAddressesResponse): IUserAddresses {
    return data;
}

export default userAddressesData;
