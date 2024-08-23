<template>
  <div class="tp-checkout-place white-bg">
    <h3 class="tp-checkout-place-title">{{ $t('Your Order') }}</h3>
    <div class="tp-order-info-list">
        <ul>
          <!-- header -->
          <li class="tp-order-info-list-header">
              <h4>{{ $t('Product') }}</h4>
              <h4>{{ $t('Total') }}</h4>
          </li>
          <!-- item list -->
          <li v-for="item in cartStore.cart_products" :key="item.id" class="tp-order-info-list-desc">
              <p>{{ toolsService.parseProductName(item?.differents, true) }} <span> x {{ Number(item?.quantity || 0) }}</span></p>
              <span>{{ currency(cartStore.calcCartItem(item)) }}</span>
          </li>

          <!-- subtotal -->
          <li class="tp-order-info-list-subtotal">
              <span>{{ $t('Subtotal') }}</span>
              <span>{{ currency(cartStore.totalPriceQuantity.total) }}</span>
          </li>

          <!-- shipping -->
          <li class="tp-order-info-list-shipping" v-if="feeStore.fees.length > 0">
              <span>{{ $t('Shipping') }}</span>
              <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                <span v-for="(_fee, index) in feeStore.fees" :key="index">
                    <input :id="_fee.name" type="radio" name="shipping" :checked="_fee?.is_default || false">
                    <label @click="feeStore.handleShippingCost(_fee.value)" :for="_fee.name">{{ _fee.name }}<span v-if="!['free',0].includes(_fee.value)">: {{ currency(_fee.value) }}</span></label>
                </span>
              </div>
          </li>

          <!-- total -->
          <li class="tp-order-info-list-total">
              <span>{{ $t('Total') }}</span>
              <span>{{ currency((cartStore.totalPriceQuantity.total + feeStore.shipCost)) }}</span>
          </li>
        </ul>
    </div>
    <div class="tp-checkout-payment">
        <div class="tp-checkout-payment-item">
          <input type="radio" id="back_transfer" name="payment">
          <label @click="handlePayment('bank')" for="back_transfer" data-bs-toggle="direct-bank-transfer">{{ $t('Direct Bank Transfer') }}</label>
          <div v-if="payment_name === 'bank'" class="tp-checkout-payment-desc direct-bank-transfer">
              <p>{{ $t('Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.') }}</p>
          </div>
        </div>
        <div class="tp-checkout-payment-item">
          <input type="radio" id="cheque_payment" name="payment">
          <label @click="handlePayment('cheque_payment')" for="cheque_payment">{{ $t('Cheque Payment') }}</label>
          <div v-if="payment_name === 'cheque_payment'" class="tp-checkout-payment-desc cheque-payment">
              <p>{{ $t('Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.') }}</p>
          </div>
        </div>
    </div>
    <div class="tp-checkout-agree">
        <div class="tp-checkout-option">
          <input id="read_all" type="checkbox">
          <label for="read_all">{{ $t('I have read and agree to the terms and conditions') }}</label>
        </div>
    </div>
    <div class="tp-checkout-btn-wrapper">
        <button type="submit" class="tp-checkout-btn w-100">{{ $t('Place Order') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from '@/pinia/useCartStore';
import toolsService from "@/services/toolsService";
import {useUtilityStore} from "@/pinia/useUtilityStore";
import {useFeesStore} from "@/pinia/useFeesStore";

const cartStore = useCartStore();
const {currency} = useUtilityStore();
const feeStore = useFeesStore();
let payment_name = ref<string>('');

// handle payment item
const handlePayment = (value:string) => {
    payment_name.value = value
}

onMounted(...feeStore.getOnMounted());
watch(...feeStore.getWatch())
</script>
