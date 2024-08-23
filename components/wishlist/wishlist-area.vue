<template>
   <section class="tp-cart-area pb-120">
      <div class="container">
        <div v-if="wishlistStore.wishlists.length === 0" class='text-center pt-50'>
          <h3>{{ $t('No Wishlist Items Found') }}</h3>
          <nuxt-link href="/" class="tp-cart-checkout-btn mt-20">{{ $t('Continue Shopping') }}</nuxt-link>
        </div>
          <div v-else class="row">
            <div class="col-xl-12">
                <div class="tp-cart-list mb-45 mr-30">
                  <table>
                      <thead>
                        <tr>
                          <th colspan="2" class="tp-cart-header-product">{{ $t('Product') }}</th>
                          <th class="tp-cart-header-price">{{ $t('Price') }}</th>
                          <th>{{ $t('Add To Cart') }}</th>
                          <th>{{ $t('Remove') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                      <!-- wishlist item start -->
                      <wishlist-item v-for="item in wishlistStore.wishlists" :key="item.id" :item="item"/>
                      <!-- wishlist item end -->
                      </tbody>
                    </table>
                </div>
                <div class="tp-cart-bottom">
                  <div class="row align-items-end">
                      <div class="col-xl-6 col-md-4">
                        <div class="tp-cart-update">
                            <nuxt-link href="/cart" class="tp-cart-update-btn">{{ $t('View Cart') }}</nuxt-link>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { useWishlistStore } from "@/pinia/useWishlistStore";
const wishlistStore = useWishlistStore();
</script>
