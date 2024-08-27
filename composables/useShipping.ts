import {onMounted, ref, watch} from 'vue';
import type {ICartFee} from "@/types/cart-fee-d-t";
import {api} from "@/plugins/api";

export function useShipping() {
    const fees = useState('fees', (): ICartFee[] => [])
    const shipCost = useState('ship_cost', () => 0)
    const selectedFee = useState('selected_fee', (): ICartFee|null => null)

    // const fees = ref<ICartFee[]>([]);
    // const shipCost = ref<number>(0);
    // const selectedFee = ref<ICartFee | null>(null);

    const handleShippingCost = (value: number | string) => {
        shipCost.value = value === 'free' || value === 0 ? 0 : Number(value);
    };

    const setSelectedFee = (fee: ICartFee) => {
        selectedFee.value = fee;
        handleShippingCost(fee.value);
    };

    onMounted(() => {
        api.cartFeesData().then((res) => {
            fees.value = res;
        });
    });

    watch(fees, (newFees) => {
        const defaultFee = newFees.find((fee) => fee.is_default);
        if (defaultFee) {
            selectedFee.value = defaultFee;
        }
    });

    return {
        fees,
        shipCost,
        selectedFee,
        setSelectedFee,
        handleShippingCost,
    };
}