<template>
  <div class="tp-product-list-item d-md-flex" :title="item.description">
    <div class="tp-product-list-thumb p-relative fix">
      <nuxt-link :href="toolsService.getProductUrl(item)" style="height: 310px;background-color: #f2f3f5;">
          <img :src="item.images?.[0]" :alt="toolsService.parseProductName(item)" class="product-image">
      </nuxt-link>

      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
        <div class="tp-product-action-item-2 d-flex flex-column">
          <button
            type="button"
            class="tp-product-action-btn-2 tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.id}`,item)"
          >
            <svg-quick-view />
            <span class="tp-product-tooltip tp-product-tooltip-right">{{ $t('Quick View') }}</span>
          </button>
          
          <button
            @click="wishlistStore.add_wishlist_product(item)"
            type="button"
            :class="`tp-product-action-btn-2 tp-product-add-to-wishlist-btn ${wishlistStore.wishlists.some((prd) => prd.id === item.id) ? 'active': ''}`"
          >
            <svg-wishlist />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{ $t(isItemInWishlist(item) ? 'Remove From Wishlist' : 'Add To Wishlist') }}
            </span>
          </button>

          <button
            @click="compareStore.add_compare_product(item)"
            type="button"
            :class="`tp-product-action-btn-2 tp-product-add-to-compare-btn ${compareStore.compare_items.some((prd) => prd.id === item.id) ? 'active': ''}`"
          >
            <svg-compare-2 />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{ $t(isItemInCompare(item) ? 'Remove From Compare' : 'Add To Compare') }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="tp-product-list-content">
      <div class="tp-product-content-2 pt-15">
        <div v-if="item.parentCategory" class="tp-product-tag-2">
          <a :href="toolsService.getCategoryUrl(item.parentCategory)">{{ toolsService.parseCategoryName(item.parentCategory, '') }}</a>
        </div>
        <h3 class="tp-product-title-2">
          <nuxt-link :href="toolsService.getProductUrl(item)">{{ toolsService.parseProductName(item) }}</nuxt-link>
        </h3>
        <div class="tp-product-rating-icon tp-product-rating-icon-2">
          <product-rating :product="item" />
        </div>

        <div class="tp-product-price-wrapper-2">
          <div v-if="item.discount > 0">
            <span class="tp-product-price-2 new-price">{{ currency(item.net) }} {{ " " }}</span>
            <span class="tp-product-price-2 old-price">
              {{ currency(item.price) }}
            </span>
          </div>
          <span v-else class="tp-product-price-2 new-price">{{ currency(item.price) }}</span>
        </div>

        <p>{{ item.description.slice(0, 100) }}</p>
        <div class="tp-product-list-add-to-cart">
          <button v-if="!isItemInCart(item)" @click="cartStore.openCartProduct(item, $t('Add To Cart'))" class="tp-product-list-add-to-cart-btn">{{ $t('Add To Cart') }}</button>
          <nuxt-link to="/cart" v-if="isItemInCart(item)" class="tp-product-list-add-to-cart-btn">
						{{ $t('View Cart') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProduct } from "@/types/product-d-t";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { useCompareStore } from "@/pinia/useCompareStore";
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";

const props = defineProps<{ item: IProduct }>();

const compareStore = useCompareStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

function isItemInWishlist(product: IProduct) {
  return wishlistStore.wishlists.some((prd) => prd.id === product.id);
}
function isItemInCompare(product: IProduct) {
  return compareStore.compare_items.some((prd) => prd.id === product.id);
}
function isItemInCart(product: IProduct) {
  return cartStore.cart_products.some((prd) => prd.id === product.id);
}
</script>