<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="toolsService.getProductUrl(item)" style="background-color: #F2F3F5;display: block;">
        <img :src="toolsService.parseImageUrl(item.images?.[0])" alt="image"/>
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="toolsService.getProductUrl(item)">{{ item.name }}</nuxt-link>
    </td>
    <!-- price -->
    <td class="tp-cart-price"><span>{{ currency(item.price) }}</span></td>

    <td class="tp-cart-add-to-cart">
      <button v-if="!isItemInCart(item)" @click="cartStore.openCartProduct(item)" type="button" class="tp-btn tp-btn-2 tp-btn-blue">
        {{ $t('Add To Cart') }}
      </button>
      <nuxt-link v-if="isItemInCart(item)" :href="`/cart`" class="tp-btn tp-btn-2 tp-btn-blue">
        {{ $t('View Cart') }}
      </nuxt-link>
    </td>

    <!-- action -->
    <td class="tp-cart-action">
      <button class="tp-cart-action-btn btn-link btn-outline-danger" @click="wishlistStore.removeWishlistProduct(item)">
        <span><svg-close2 /></span>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useCartStore } from "@/pinia/useCartStore";
import { type IProduct } from '@/types/product-d-t';
import toolsService from "@/services/toolsService";
import type {ICartItem} from "@/types/cart-item-d-t";
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

// Currency Formatter
const currency = useSiteSettings().currency;
const props = defineProps<{item:IProduct}>()

function isItemInCart(product: IProduct) {
  return cartStore.cart_products.some((prd: ICartItem) => prd?.differents?.id === product?.id);
}
</script>
