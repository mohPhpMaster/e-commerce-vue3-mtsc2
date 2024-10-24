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
            <button class="cartmini__close-btn cartmini-close-btn" type="button" @click="cartStore.handleCartOffcanvas">
              <i class="fal fa-times"></i>
            </button>
          </div>
        </div>
        <div class="cartmini__shipping">
          <cart-progress />
        </div>
        <div v-if="cartStore.cart_products?.length > 0" class="cartmini__widget">
          <div v-for="item in cartStore.cart_products" :key="item?.differents?.id" class="cartmini__widget-item">
				    <div class="cartmini__thumb tp-cart-sm-img col-2">
				      <nuxt-link :to="toolsService.getProductUrl(item?.differents, true)" style="background-color: #F2F3F5;display: block;">
				        <img :src="toolsService.getImageUrlValue(item?.differents)" :title="item?.differents?.name" alt="cart-img" height="60" width="70" />
				      </nuxt-link>
				    </div>

            <div class="cartmini__content">
	            <div class="row">
								<div class="col-12 cartmini__title1 tp-cart-sm-title">
									<nuxt-link :to="toolsService.getProductUrl(item?.differents, true)">
								    {{ toolsService.parseProductName(item?.differents, true) }}
								  </nuxt-link>
								</div>

					      <div v-for="(accessory, index) in item?.accessories" v-if="item?.accessories?.length" :key="accessory.group?.id || accessory?.accessory?.id || index" class="col-12">
					        <div class="col-12 text-nowrap ms-3 tp-cart-sm-price">
					          {{ accessory.group?.name }}{{ accessory?.accessory?.name ? ` - ${accessory?.accessory?.name}` : "" }}
						        <span class="product-price-value_">{{ accessory.accessory?.price ? currency(accessory.accessory?.price) : "" }}</span>
						        <span class="">{{ ` x ${(accessory?.accessory?.qty || 1)}` }}</span>
						      </div>
						    </div>
					    </div>

              <div class="cartmini__price-wrapper text-start">
                <span v-if="item?.differents.discount > 0 && item.quantity" class="cartmini__sm-price product-price-value_">
                  {{ currency((Number(item?.differents.price) - (Number(item?.differents.price) * Number(item?.differents.discount)) / 100) * item.quantity) }}
                </span>
                <span v-else class="cartmini__sm-price product-price-value_">
                  {{ currency(cartStore.calcCartItem(item)) }}
                </span>
                <span class="cartmini__sm-quantity">{{ " " }}x{{ item.quantity }}</span>
              </div>
            </div>

            <a class="cartmini__del pointer" @click="cartStore.removeCartProduct(item)">
              <i class="fa-regular fa-xmark"></i>
            </a>
          </div>
        </div>
	      <!-- if no item in cart  -->
        <div
		        v-if="cartStore.cart_products?.length === 0"
		        class="cartmini__empty text-center"
        >
          <img
		          alt="empty-cart-img"
		          src="/images/product/cartmini/empty-cart.png"
          />
          <p>{{ $t('Your Cart is empty') }}</p>
          <nuxt-link class="tp-btn" href="/" @click="cartStore.handleCartOffcanvas">{{ $t('Shop Now') }}</nuxt-link>
        </div>
      </div>
      <div v-if="cartStore.cart_products?.length > 0" class="cartmini__checkout">
        <div
		        class="cartmini__checkout-title mb-30"
		        v-html="$t('Subtotal: :value', { value: currency(cartStore?.totalPriceQuantity?.total) })"
        >
        </div>
        <div class="cartmini__checkout-btn">
          <nuxt-link
		          class="tp-btn mb-10 w-100"
		          href="/cart"
		          @click="cartStore.handleCartOffcanvas"
          >
            {{ $t('View Cart') }}
          </nuxt-link>
          <nuxt-link
		          v-if="useUserStore().isLoggedIn()"
		          class="tp-btn tp-btn-border w-100"
		          href="/checkout"
		          @click="cartStore.handleCartOffcanvas"
          >
						{{ $t('Checkout') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
	<!-- overlay start  -->
  <div
		  :class="`body-overlay ${cartStore.cartOffcanvas ? 'opened' : ''}`"
		  @click="cartStore.handleCartOffcanvas"
  ></div>
	<!-- overlay end  -->
</template>

<script lang="ts" setup>
import {useCartStore} from "@/pinia/useCartStore";
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";
import {useUserStore} from "@/pinia/useUserStore";

const cartStore = useCartStore();

onMounted(() => {
	// cartStore.fetchCart();
});
</script>
