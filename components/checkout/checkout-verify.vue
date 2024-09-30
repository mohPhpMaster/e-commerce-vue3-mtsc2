<template>
  <div class="tp-checkout-verify">
    <div v-if="!isLoggedIn()" class="tp-checkout-verify-item">
      <p class="tp-checkout-verify-reveal">
        {{ $t('Already have an account?') }}
        <button
          @click="openLogin = !openLogin"
          type="button"
          class="tp-checkout-login-form-reveal-btn"
        >
          {{ $t('Click here to login') }}
        </button>
      </p>

      <div
        v-if="openLogin"
        id="tpReturnCustomerLoginForm"
        class="tp-return-customer"
      >
        <forms-login-form redirect="/checkout"/>
      </div>
    </div>
    <div v-if="showCouponCodeArea" class="tp-checkout-verify-item">
      <p class="tp-checkout-verify-reveal">
				{{ $t('Have a coupon?') }}
        <button
          @click="openCoupon = !openCoupon"
          type="button"
          class="tp-checkout-coupon-form-reveal-btn"
        >
					{{ $t('Click here to enter your coupon code') }}
        </button>
      </p>

      <div
        v-if="openCoupon"
        id="tpCheckoutCouponForm"
        class="tp-return-customer"
      >
        <form @submit.prevent="handleCouponSubmit">
          <div class="tp-return-customer-input">
            <label>{{ $t('Coupon Code:') }}</label>
            <input type="text" :placeholder="$t('Enter coupon code')" v-model="couponCode" />
          </div>
          <button type="submit" class="tp-return-customer-btn tp-checkout-btn">
            {{ $t('Apply') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/useUserStore";

const openLogin = ref<boolean>(false);
const openCoupon = ref<boolean>(false);
const showCouponCodeArea = ref(false);
let couponCode = ref<string>('');

const {isLoggedIn, user} = useUserStore();

const handleCouponSubmit = () => {
	console.log(couponCode.value)
}
</script>
