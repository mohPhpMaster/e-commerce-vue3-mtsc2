import type {ICartFee} from "@/types/cart-fee-d-t";
import type {ICartFeeResponse} from "@/types/cart-fee-response-d-t";

export async function cartFeesData(): Promise<ICartFee[]> {
    try {
        const response: { data: { data: ICartFeeResponse[] } } = await $axios.get('cart/fees');
        // const response: { data: { data: ICartFeeResponse[] } } = {data: await import('@/data/car-fees.json')};
        const fees = response?.data?.data || [];
        return fees.map(convertCartFeeResponse);
    } catch (error) {
        console.error('Error fetching cart fees data:', error);
        return {} as ICartFee;
    }
}

function convertCartFeeResponse(fee: ICartFeeResponse): ICartFee {
    return {
        id: fee.id,
        name: fee.name,
        value: fee.value,
        is_default: Boolean(fee.is_default),
    };
}

export default cartFeesData;