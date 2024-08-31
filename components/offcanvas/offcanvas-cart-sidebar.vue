<template>
  <div
    :class="`cartmini__area tp-all-font-roboto ${cartStore.cartOffcanvas ? 'cartmini-opened' : ''}`"
  >
    <div class="cartmini__wrapper d-flex justify-content-between flex-column">
      <div class="cartmini__top-wrapper">
        <div class="cartmini__top p-relative">
          <div class="cartmini__top-title">
            <h4>{{ $t('Shopping Cart') }}</h4>
          </div>
          <div class="cartmini__close">
            <button @click="cartStore.handleCartOffcanvas" type="button" class="cartmini__close-btn cartmini-close-btn">
              <i class="fal fa-times"></i>
            </button>
          </div>
        </div>
        <div class="cartmini__shipping">
          <cart-progress />
        </div>
        <div v-if="cartStore.cart_products.length > 0" class="cartmini__widget">
          <div v-for="item in cartStore.cart_products" :key="item?.differents?.id" class="cartmini__widget-item">
            <div class="cartmini__thumb">
              <nuxt-link :to="toolsService.getProductUrl(item?.differents,true)"
                         @click="cartStore.handleCartOffcanvas">
                <img :src="item?.differents.images?.[0]" alt="cart-img" width="70" height="60" />
              </nuxt-link>
            </div>
            <div class="cartmini__content">
              <h5 class="cartmini__title">
                <nuxt-link :to="toolsService.getProductUrl(item?.differents,true)"
                           @click="cartStore.handleCartOffcanvas">
                  {{ toolsService.parseProductName(item?.differents, true) }}
                </nuxt-link>
              </h5>
              <div class="cartmini__price-wrapper">
                <span
		                v-if="item?.differents.discount > 0 && item.quantity"
		                class="cartmini__price"
                >
                  {{ currency((Number(item?.differents.price) - (Number(item?.differents.price) * Number(item?.differents.discount)) / 100) * item.quantity) }}
                </span>
                <span v-else class="cartmini__price">
                  {{ currency(cartStore.calcCartItem(item)) }}
                </span>
                <span class="cartmini__quantity">{{ " " }}x{{ item.quantity }}</span>
              </div>
            </div>
            <a @click="cartStore.removeCartProduct(item)" class="cartmini__del pointer">
              <i class="fa-regular fa-xmark"></i>
            </a>
          </div>
        </div>
        <!-- if no item in cart  -->
        <div
          v-if="cartStore.cart_products.length === 0"
          class="cartmini__empty text-center"
        >
          <img
            src="/images/product/cartmini/empty-cart.png"
            alt="empty-cart-img"
          />
          <p>{{ $t('Your Cart is empty') }}</p>
          <nuxt-link href="/" class="tp-btn">{{ $t('Shop Now') }}</nuxt-link>
        </div>
      </div>
      <div v-if="cartStore.cart_products.length > 0" class="cartmini__checkout">
        <div class="cartmini__checkout-title mb-30">
          <h4>{{ $t('Subtotal:') }}</h4>
          <span>{{ currency(cartStore.totalPriceQuantity.total) }}</span>
        </div>
        <div class="cartmini__checkout-btn">
          <nuxt-link
            href="/cart"
            @click="cartStore.handleCartOffcanvas"
            class="tp-btn mb-10 w-100"
          >
            {{ $t('View Cart') }}
          </nuxt-link>
          <nuxt-link
            href="/checkout"
            @click="cartStore.handleCartOffcanvas"
            class="tp-btn tp-btn-border w-100"
          >
						{{ $t('Checkout') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  <!-- overlay start  -->
  <div
    @click="cartStore.handleCartOffcanvas"
    :class="`body-overlay ${cartStore.cartOffcanvas ? 'opened' : ''}`"
  ></div>
  <!-- overlay end  -->
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";

const cartStore = useCartStore();
</script>
