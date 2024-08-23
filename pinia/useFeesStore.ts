import {useCartStore} from './useCartStore';
import {computed, ref, watch} from "vue";
import {defineStore} from "pinia";
import {type IProduct} from '@/types/product-d-t';
import {useProductStore} from "@/pinia/useProductStore";
import type {ISiteSettings} from "@/types/site-settings-d-t";
import {api} from "@/plugins/api";
import type {ICartFee} from "@/types/cart-fee-d-t";

export interface IFee {
    fees: Ref<ICartFee[]>;
    shipCost: Ref<number>

    getOnMounted: () => Function[];

    getWatch: () => [Ref<ICartFee[]>, Function];

    handleShippingCost: (value: (number | string)) => void;
}

export const useFeesStore = defineStore("fees", () => {
    function Fee(): IFee {
        const $fees = ref<ICartFee[]>([] as ICartFee[]);
        const $shipCost = ref<number>(0);
        let $instance: IFee = {
            fees: $fees,
            shipCost: $shipCost,
        };
        $instance.handleShippingCost = (value: number | string) => {
            if (value === 'free' || value === 0) {
                $instance.shipCost.value = 0;
            } else {
                $instance.shipCost.value = value as number;
            }
        };
        $instance.getOnMounted = () => [
            () => {
                api.cartFeesData()
                    .then((res) => $instance.fees.value = res)
            }
        ];
        $instance.getWatch = () => [
            $instance.fees,
            (n) => {
                $instance.handleShippingCost(n?.find((fee) => fee?.is_default || false)?.value || 0);
            }
        ];

        return $instance;
    }

    return Fee();
});
