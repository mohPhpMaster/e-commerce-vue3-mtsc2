<template>
  <div>
    <template v-if="cartStore.totalPriceQuantity.total < freeShippingThreshold">
      <p>{{ $t('Add $:amount more to qualify for free shipping', { amount: currency(remainingAmount) }) }}</p>
    </template>
    <template v-else>
      <p>{{ $t('You are eligible for free shipping') }}</p>
    </template>

    <div class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        :data-width="`${progress}%`"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width:${progress}%`"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/pinia/useCartStore';
import {useUtilityStore} from "@/pinia/useUtilityStore";

const currency = useUtilityStore()?.currency;
const cartStore = useCartStore()
const freeShippingThreshold = ref<number>(100);
const progress = computed(() => (cartStore.totalPriceQuantity.total / freeShippingThreshold.value) * 100);
const remainingAmount = computed(() => freeShippingThreshold.value - cartStore.totalPriceQuantity.total);
</script>
