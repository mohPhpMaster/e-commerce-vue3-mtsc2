<template>
  <section class="tp-checkout-area pb-120" style="background-color: #EFF1F5;">
    <div class="container">
      <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
        <h3 class="py-2">{{ $t('No Items Found') }}</h3>
        <nuxt-link class="tp-checkout-btn" href="/">{{ $t('Continue Shopping') }}</nuxt-link>
      </div>
      <div v-else class="row">
        <div class="col-xl-7 col-lg-7">
          <checkout-verify />
        </div>

        <Form :validation-schema="formValidationSchema.validationSchema" @submit="handleOnSubmit">
          <div class="row">
            <div class="col-lg-7">
              <div class="tp-checkout-bill-area">
                <h3 class="tp-checkout-bill-title">{{ $t('Select shipping location') }}</h3>
                <checkout-user-address @submit="handleOnSubmit2" />
              </div>
            </div>
            <div class="col-lg-5">
              <checkout-order @submit="handleOnSubmit" />
            </div>
          </div>
        </Form>

        <!-- form end -->
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import {useCartStore} from '@/pinia/useCartStore';
import {Form, useForm} from 'vee-validate';
import {useUserStore} from "@/pinia/useUserStore";
// import {loadStripe} from '@stripe/stripe-js';
import $axios from "@/utils/Axios";
import formDataService from "@/services/formDataService";
import {useLocaleStore} from "@/pinia/useLocaleStore";
import {useUserAddressesStore} from "@/pinia/useUserAddressesStore";
import toolsService from "@/services/toolsService";
import type {ICartItem} from "@/types/cart-item-d-t";

const cartStore = useCartStore();
const shippingStore = useShipping();
const loading = useLoading();
const {$settings} = useNuxtApp();
const $locale = useLocaleStore()?.selectedLocale()?.code;
const addressStore = useUserAddressesStore();
const {t} = useI18n();

useUserStore().needUser();
const stripePublishableKey = useRuntimeConfig().public.stripePublishableKey;
// const pending = ref(false)

const formValidationSchema = {
  validationSchema: yup.object({
    user_address: yup.string().required().label(t("Shipping Location")),
    order_note: yup.string().optional().label(t("Order Note")),
  }),
};
const {errors, defineInputBinds, resetForm, setFieldValue, values} = useForm(formValidationSchema);

const handleOnSubmit2 = (o) => {
  setFieldValue('order_note', o?.order_note || '');
  setFieldValue('user_address', o?.user_address || '');
}

const handleOnSubmit = () => {
  loading.start();
  setFieldValue('order_note', values?.order_note || '');
  setFieldValue('user_address', values?.user_address || [addressStore.selectedAddress].map((address) => ({
    name: address.label || '',
    line1: address.address || '',
    line2: '',
    city: address.city_name || '',
    state: address.governorate_name || '',
    postal_code: address.postal_code || '',
    country: address.country_name || '',
  }))?.[0]);

  $axios.post('create-order', formDataService({
    items: [...cartStore.cart_products].map((item: ICartItem) => {
      return {
        name: toolsService.parseProductName(item.differents, true),
        price: item.differents.price,
        quantity: item.quantity
      }
    }),
    ship_cost: objectOnly(shippingStore.selectedFee.value, ['value', 'name']),
    successUrl: toolsService.getBaseUrl() + '/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=:ORDER_ID',
    cancelUrl: toolsService.getBaseUrl() + '/thank-you?session_id={CHECKOUT_SESSION_ID}&status=cancelled&order_id=:ORDER_ID',
    currency: $settings.currency,
    locale: 'auto',
    ...values,

    fee_id: shippingStore.selectedFee.value?.id,
    user_address_id: addressStore.selectedAddress?.id,
  }))
      .then(({data}) => {
        if (data.sessionId) {
          import('@stripe/stripe-js').then(({loadStripe}) => {
            loadStripe(stripePublishableKey)
              .then(stripe => stripe.redirectToCheckout({sessionId: data.sessionId}));
          })
        }
      })
      .catch(e => console.error(e.message))
      .finally(() => loading.stop());

    // $axios.post('create-checkout-session', formDataService({
    //   items: [...cartStore.cart_products].map((item: ICartItem) => {
    //     return {
    //       name: toolsService.parseProductName(item.differents, true),
    //       price: item.differents.price,
    //       quantity: item.quantity
    //     }
    //   }),
    //   ship_cost: objectOnly(shippingStore.selectedFee.value, ['value', 'name']),
    //   successUrl: toolsService.getBaseUrl() + '/thank-you?session_id={CHECKOUT_SESSION_ID}',
    //   cancelUrl: window.location.href,
    //   currency: $settings.currency,
    //   locale: 'auto',
    //   ...values,
    // }))
    // if (createOrderResponse.sessionId) {
    //   stripe?.redirectToCheckout({sessionId: createOrderResponse.sessionId});
    // }
};

onMounted(() => {
  loading.stop();

  // setTimeout(() => {
  //   const script = document.createElement('script');
  //   script.src = '//js.stripe.com/v3/';
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = () => {
  //     initialize();
  //   };
  //   document.head.appendChild(script);
  // }, 100);
});

const user_address = defineInputBinds('user_address');
const order_note = defineInputBinds('order_note');
</script>
