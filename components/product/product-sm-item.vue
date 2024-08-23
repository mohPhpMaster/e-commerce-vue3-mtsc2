<template>
  <div class="tp-product-sm-item-5 d-flex align-items-center">
    <div class="tp-product-sm-thumb-5 fix">
        <nuxt-link :href="toolsService.getProductUrl(product)">
          <img :src="product.images[0]" :alt="toolsService.parseProductName(product)">
        </nuxt-link>
    </div>
    <div class="tp-product-sm-content-5">
        <div class="tp-product-sm-tag-5">
          <span><a href="#">{{ product.children }} </a></span>
        </div>
        <h4 class="tp-product-sm-title-5">
          <nuxt-link :href="toolsService.getProductUrl(product)">
            {{ toolsService.parseProductName(product) }}
          </nuxt-link>
        </h4>
        <div class="tp-product-sm-rating-5">
	        <product-rating :product="product" />
        </div>
        <div class="tp-product-sm-price-wrapper-5">
          <span class="tp-product-sm-price-5">
            ${{ product.net }}
          </span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-d-t';
import toolsService from "@/services/toolsService";

defineProps<{product:IProduct}>()
</script>
