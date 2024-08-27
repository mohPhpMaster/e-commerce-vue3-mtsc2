<template>
  <div class="tp-product-different-item-5 d-flex align-items-center" :class="{
		'tp-product-different-selected': current.id === product.id,
		// 'pointer': current !== toolsService.parseProductDifferent(product)
  }" @click="emit('clicked', product)">
    <div class="tp-product-different-thumb-5 fix">
        <img :src="product.images[0]" :alt="toolsService.parseProductDifferent(product)">
    </div>
    <div class="tp-product-different-content-5">
        <h4 class="tp-product-different-title-5">
          {{ toolsService.parseProductDifferent(product) }}
        </h4>
        <div class="tp-product-different-price-wrapper-5">
          <span class="tp-product-different-price-5">
            {{ currency(product.net) }}
          </span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-d-t';
import toolsService from "@/services/toolsService";

const currency = useSiteSettings().currency;
const emit = defineEmits(['clicked'])

defineProps<{product:IProduct, current:IProduct}>()
</script>
