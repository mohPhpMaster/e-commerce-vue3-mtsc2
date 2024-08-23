<template>
  <section class="tp-checkout-area pb-120" style="background-color: #EFF1F5;">
    <div class="container">
      <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
        <h3 class="py-2">No items found in cart to checkout</h3>
        <nuxt-link href="/shop" class="tp-checkout-btn">
          Return to shop
        </nuxt-link>
      </div>
      <div v-else class="row">
        <div class="col-xl-7 col-lg-7">
          <!-- checkout verify start -->
          <checkout-verify />
          <!-- checkout verify end -->
        </div>
        <!-- form start -->
        <Form @submit="handleOnSubmit" :validation-schema="schema">
          <div class="row">
            <div class="col-lg-7">
              <div class="tp-checkout-bill-area">
                <h3 class="tp-checkout-bill-title">Billing Details</h3>
                <checkout-billing />
              </div>
            </div>
            <div class="col-lg-5">
              <!-- checkout place order -->
              <checkout-order />
              <!-- checkout place order -->
            </div>
          </div>
        </Form>
        <!-- form end -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import {useCartStore} from '@/pinia/useCartStore';

const cartStore = useCartStore();

import { Form } from 'vee-validate';
const {t} = useI18n();

const schema = yup.object({
  firstName: yup.string().required().label(t("First Name")),
  lastName: yup.string().required().label(t("Last Name")),
  company: yup.string().label(t("Company")),
  country: yup.string().required().label(t("Country")),
  address: yup.string().required().label(t("Address")),
  city: yup.string().required().label(t("City")),
  state: yup.string().required().label(t("State")),
  zipCode: yup.string().required().label(t("zipCode")),
  phone: yup.string().required().label(t("Phone")),
  orderNote: yup.string().label(t("Order Note")),
  email: yup.string().required().email().label(t("Email")),
});

const handleOnSubmit = () => {
  
}
</script>
