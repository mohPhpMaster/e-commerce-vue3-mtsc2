<template>
  <div class="tp-checkout-bill-form">
      <div class="tp-checkout-bill-inner">
          <div class="row">
<!--            <div class="col-md-6">-->
<!--                <div class="tp-checkout-input">-->
<!--                  <label>{{ $t('Shipping Location') }}</label>-->
<!--                  <Field name="user_address" :placeholder="$t('Shipping Location')" type="text" />-->
<!--                  <ErrorMessage name="firstName" class="error" />-->
<!--                </div>-->
<!--            </div>-->
            <div class="col-md-6">
                <div v-if="addressStore.userAddresses.length" class="tp-checkout-input">
                  <label>{{ $t('Shipping Location') }}</label>
                  <ui-nice-select
                      id="user_address"
                      :default-current="addressStore.selectedAddressOption"
                      :options="addressStore.userAddressToOptions"
                      name="user_address"
                      v-bind="user_address"
                      @onChange="changeHandler"
                  />
                  <ErrorMessage class="error" name="user_address" />
                </div>
                <div v-else class="tp-checkout-input">
                  <label>{{ $t('Shipping Location') }}</label>
                  <p>{{ $t('No shipping locations found') }}</p>
                </div>
            </div>
            <div v-if="!false" class="col-md-12">
                <div class="tp-checkout-input">
                  <label>{{ $t('Order Note') }}</label>
                  <Field v-slot="{ field }" name="order_note">
                    <textarea
                        id="order_note"
                        :placeholder="$t('Notes about your order, e.g. special notes for delivery.')"
                        name="order_note"
                        v-bind="field"
                        @change="submitStatus"
                    ></textarea>
                  </Field>
                  <ErrorMessage class="error" name="order_note" />
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import {ErrorMessage, Field, useForm} from 'vee-validate';
import {useUserAddressesStore} from "@/pinia/useUserAddressesStore";
import * as yup from "yup";

const {t} = useI18n();
const emit = defineEmits(['submit'])
const props = defineProps<{
  // schema: any
}>()

const addressStore = useUserAddressesStore();

const changeHandler = (e: { value: string; text: string }) => {
  addressStore.SetSelectAddress(e)
  // setFieldValue('order_note', e.value);
  setFieldValue('user_address', e.value);

  submitStatus();
};

const submitStatus = () => {
  emit('submit', {
    order_note: order_note.value.value,
    user_address: [addressStore.selectedAddress].map((address) => ({
      name: address.label || '',
      line1: address.address || '',
      line2: '',
      city: address.city_name || '',
      state: address.governorate_name || '',
      postal_code: address.postal_code || '',
      country: address.country_name || '',
    }))?.[0]
  })
}

onMounted(() => {
  addressStore.fetchUserAddresses();
});

const {errors, handleSubmit, defineInputBinds, resetForm, setFieldValue} = useForm({
  validationSchema: yup.object({
    user_address: yup.string().required().label(t("Shipping Location")),
    order_note: yup.string().optional().label(t("Order Note")),
  }),
});

const user_address = defineInputBinds('user_address');
const order_note = defineInputBinds('order_note');
</script>
