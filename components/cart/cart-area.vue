<template>
  <section class="tp-cart-area pb-120">
    <div class="container">
      <div v-if="cartStore.cart_products.length === 0" class='text-center pt-50'>
        <h3>{{ $t('No Items Found') }}</h3>
        <nuxt-link href="/" class="tp-cart-checkout-btn mt-20">{{ $t('Continue Shopping') }}</nuxt-link>
      </div>
      <div v-else class="row">
        <div class="col-xl-9 col-lg-9">
            <div class="tp-cart-list mb-25 mr-30">
              <table>
                  <thead>
                    <tr>
                      <th colspan="2" class="tp-cart-header-product">{{ $t('Product') }}</th>
                      <th class="tp-cart-header-price">{{ $t('Price') }}</th>
                      <th class="tp-cart-header-quantity">{{ $t('Quantity') }}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- cart item start -->
                    <cart-item v-for="item in cartStore.cart_products" :key="item?.differents?.id" :item="item" />
                    <!-- cart item end -->
                  </tbody>
                </table>
            </div>
            <div class="tp-cart-bottom mr-30">
              <div class="row align-items-end">
                  <div class="col-xl-6 col-md-8">
                    <div class="tp-cart-coupon" v-if="showCouponCodeArea">
                        <form @submit.prevent="handleCouponSubmit">
                          <div class="tp-cart-coupon-input-box">
                              <label>{{ $t('Coupon Code:') }}</label>
                              <div class="tp-cart-coupon-input d-flex align-items-center">
                                <input type="text" :placeholder="$t('Enter coupon code')" v-model="couponCode">
                                <button type="submit">{{ $t('Apply') }}</button>
                              </div>
                          </div>
                        </form>
                    </div>
                  </div>
                  <div class="col-xl-6 col-md-4">
                    <div class="tp-cart-update text-md-end">
                        <button @click="cartStore.clear_cart()" type="button" class="tp-cart-update-btn">{{ $t('Clear Cart') }}</button>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
            <div class="tp-cart-checkout-wrapper">
<!--              <div class="tp-cart-checkout-top d-flex align-items-center justify-content-between" v-if="shippingStore.fees.value.length > 0">
                  <span class="tp-cart-checkout-top-title">{{ $t('Subtotal') }}</span>
                  <span class="tp-cart-checkout-top-price">
                    {{ currency(cartStore.totalPriceQuantity.total.toFixed(2)) }}
                  </span>
              </div>
              <div class="tp-cart-checkout-shipping" v-if="shippingStore.fees.value.length > 0">
                  <h4 class="tp-cart-checkout-shipping-title">{{ $t('Shipping') }}</h4>
                  <div class="tp-cart-checkout-shipping-option-wrapper">
                    <div class="tp-cart-checkout-shipping-option" v-for="(_fee, index) in shippingStore.fees.value" :key="index">
                        <input :id="_fee.name" type="radio" name="shipping" :checked="shippingStore.shouldSelectFee(_fee)">
                        <label @click="shippingStore.setSelectedFee(_fee)" :for="_fee.name">{{ _fee.name }}<span v-if="!['free',0].includes(_fee.value)">: {{ currency(_fee.value) }}</span></label>
                    </div>
                  </div>
              </div>-->
              <div class="tp-cart-checkout-total d-flex align-items-center justify-content-between">
                  <span>{{ $t('Total') }}</span>
                  <span>{{ currency((cartStore.totalPriceQuantity.total /*+ shippingStore.shipCost.value*/).toFixed(2)) }}</span>
              </div>
              <div class="tp-cart-checkout-proceed">
                  <nuxt-link :href="userStore.isLoggedIn() ? '/checkout' : '/login?redirect=checkout'" class="tp-cart-checkout-btn w-100">{{ $t('Proceed to Checkout') }}</nuxt-link>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
import currency from "@/services/currencyService";
import {useUserStore} from "@/pinia/useUserStore";

const {t} = useI18n();
const cartStore = useCartStore();
const userStore = useUserStore();
// const shippingStore = useShipping();

const showCouponCodeArea = ref(false);
let couponCode = ref<string>('');

const handleCouponSubmit = () => {
  console.log(couponCode.value)
}

// onMounted(...shippingStore.getOnMounted());
// watch(...shippingStore.getWatch())
</script>
