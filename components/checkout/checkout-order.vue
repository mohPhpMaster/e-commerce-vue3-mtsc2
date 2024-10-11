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

          <li v-if="shippingStore?.fees?.value?.length > 0" class="tp-order-info-list-shipping">
              <span>{{ $t('Shipping') }}</span>
              <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                <span v-for="(_fee, index) in shippingStore.fees.value" :key="_fee.id">
                    <input :id="_fee.name" :checked="shippingStore.shouldSelectFee(_fee)" name="shipping" type="radio">
                    <label :for="_fee.name" @click="() => shippingStore.setSelectedFee(_fee)">{{ _fee.name }}<span v-if="!['free',0].includes(_fee.value)">: {{ currency(_fee.value) }}</span></label>
                </span>
              </div>
          </li>

          <!-- total -->
          <li class="tp-order-info-list-total">
              <span>{{ $t('Total') }}</span>
              <span>{{ currency((cartStore.totalPriceQuantity.total + shippingStore.shipCost.value)) }}</span>
          </li>
        </ul>
    </div>
    <div v-if="false" class="tp-checkout-payment">
        <div class="tp-checkout-payment-item">
          <input id="back_transfer" name="payment" type="radio">
          <label
              data-bs-toggle="direct-bank-transfer"
              for="back_transfer"
              @click="handlePayment('bank')"
          >{{ $t('Direct Bank Transfer') }}</label>
          <div v-if="payment_name === 'bank'" class="tp-checkout-payment-desc direct-bank-transfer">
              <p>{{ $t('Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.') }}</p>
          </div>
        </div>
        <div class="tp-checkout-payment-item">
          <input id="cheque_payment" name="payment" type="radio">
          <label for="cheque_payment" @click="handlePayment('cheque_payment')">{{ $t('Cheque Payment') }}</label>
          <div v-if="payment_name === 'cheque_payment'" class="tp-checkout-payment-desc cheque-payment">
              <p>{{ $t('Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.') }}</p>
          </div>
        </div>
    </div>
    <div class="tp-checkout-agree">
        <div class="tp-checkout-option">
          <input id="agreeBox" name="agreeBox" type="checkbox" v-model="agreeBox">
          <label for="agreeBox">{{ $t('I have read and agree to the terms and conditions') }}</label>
        </div>
    </div>
    <div class="tp-checkout-btn-wrapper">
        <button class="tp-checkout-btn w-100" type="button" @click.prevent="handleSubmit" :disabled="!agreeBox">{{ $t('Place Order') }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useCartStore} from '@/pinia/useCartStore';
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";
import type {ICartFee} from "@/types/cart-fee-d-t";

const emit = defineEmits(['submit'])

const cartStore = useCartStore();
const shippingStore = useShipping();
let payment_name = ref<string>('');
const agreeBox = ref<boolean>(false);

const handleSubmit = () => {
  if (!agreeBox.value) {
    return false;
  }

  emit('submit');
}

/**
 * @deprecated
 * @param value
 */
const handlePayment = (value: string) => {
  payment_name.value = value
}

// onMounted(...feeStore.getOnMounted());
// watch(...feeStore.getWatch())
</script>
