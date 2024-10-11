<template>
  <section class="tp-order-area pb-160">
    <div class="container">
        <div class="tp-order-inner">
          <div class="row agx-0">
              <div class="col-lg-6">
                <div class="tp-order-details h-100" style="background-color: var(--tp-navbar-bg-color); color: var(--tp-navbar-text-color);">
                    <div class="tp-order-details-top text-center mb-70">
                      <div class="tp-order-details-icon">
                          <span>
                            <svg-order-icon/>
                          </span>
                      </div>
                      <div class="tp-order-details-content">
                          <h3 class="tp-order-details-title">{{ $t('Your Order Confirmed.') }}</h3>
                          <p>{{ $t('We will send you a shipping confirmation email as soon as your order ships') }}</p>
                      </div>
                    </div>
                    <div class="tp-order-details-item-wrapper">
                      <div class="row">
                          <div class="col-sm-6">
                            <div class="tp-order-details-item">
                                <h4>{{ $t('Order Date:') }}</h4>
                                <p>{{ order?.date }}</p>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="tp-order-details-item">
                                <h4>{{ $t('Order Number:') }}</h4>
                                <p>{{ order?.number || order?.id }}</p>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="tp-order-info-wrapper">
                    <h4 class="tp-order-info-title">{{ $t('Order Details') }}</h4>

                    <div class="tp-order-info-list">
                      <ul>
                          <li class="tp-order-info-list-header">
                            <h4 class="col-8">{{ $t('Product') }}</h4>
                            <h4 class="col-auto">{{ $t('Total') }}</h4>
                          </li>

                          <li class="tp-order-info-list-desc mx-2" v-for="item in order?.items" :key="item.id">
                            <p>
                              <nuxt-link :to="toolsService.getProductUrl(item?.differents, true)">
                                {{ toolsService.parseProductName(item?.differents, true) }}
                              </nuxt-link>

                              <div
                                  v-if="item?.accessories?.length"
                                  v-for="(accessory, index) in item?.accessories"
                                  :key="accessory.group?.id || accessory?.accessory?.id || index"
                                  class="col-12"
                              >
                                <div class="col-12 text-nowrap ms-4 tp-cart-price">
                                  {{ accessory.group?.name }}{{ accessory?.accessory?.name ? ` - ${accessory?.accessory?.name}` : "" }}
                                  <span class="product-price-value_">{{ accessory.accessory?.price ? currency(accessory.accessory?.price) : "" }}</span>
                                  <span class="">{{ ` x ${(accessory?.accessory?.qty || 1)}` }}</span>
                                </div>
                              </div>
                              <span v-else>{{ ` x ${(item?.qty || 1)}` }}</span>
                            </p>
                            <span>{{ currency(cartStore.calcCartItem(item)) }}</span>
                          </li>

                          <!-- subtotal -->
                          <li class="mt-50 tp-order-info-list-subtotal">
                            <span class="">{{ $t('Subtotal') }}</span>
                            <span class="bold">{{ currency(order?.subtotal) }}</span>
                          </li>

                          <li v-if="shippingStore?.fees?.value?.length > 0" class="tp-order-info-list-shipping">
                              <span>{{ $t('Shipping') }}</span>
                              <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                                <span v-for="(_fee, index) in shippingStore.fees.value" :key="_fee.id">
                                    <input :id="_fee.name" :checked="shippingStore.shouldSelectFee(_fee)" name="shipping" type="radio"
                                           disabled>
                                    <label :for="_fee.name" class="font-normal">
                                      {{ _fee.name }}:
                                      <span class="bold"> {{ currency(_fee.value) }}</span>
                                    </label>
                                </span>
                              </div>
                          </li>

                          <li class="tp-order-info-list-total">
                            {{ $t('Total') }}
                            <span class="">{{ currency(order?.total) }}</span>
                          </li>
                      </ul>
                    </div>
                </div>
              </div>
          </div>
        </div>

        <div class="invoice__print text-start mt-3">
          <div class="row">
            <div class="col-xl-12">
              <button type="button" class="tp-invoice-print tp-btn tp-btn-black" @click="$router.go(-1)">
                <span class="me-2">
                  <i class="fa-regular fa-turn-up"></i>
                </span> {{ $t('Back') }} </button>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {IUserOrder} from "@/types/user-order-d-t";
import toolsService from "@/services/toolsService";
import {useCartStore} from "@/pinia/useCartStore";
import currency from "@/services/currencyService";
import type {ICartFee} from "@/types/cart-fee-d-t";

const props = defineProps<{
  order?: IUserOrder,
}>()

const shippingStore = useShipping();
const cartStore = useCartStore();

onMounted(() => {
  console.log(107, {order: props.order})
})
</script>
