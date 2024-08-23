<template>
   <section class="tp-compare-area pb-120">
      <div class="container">
        <div v-if="compareStore.compare_items.length === 0" class='text-center pt-50'>
          <h3>{{ $t('No Compare Items Found') }}</h3>
          <nuxt-link class="tp-cart-checkout-btn mt-20" href="/">{{ $t('Continue Shopping') }}</nuxt-link>
        </div>
          <div v-else class="row">
              <div class="col-xl-12">
                  <div class="tp-compare-table table-responsive text-center">
                      <table class="table">
                          <tbody>
                            <tr>
                              <th>{{ $t('Product') }}</th>
                              <td v-for="item in compareStore.compare_items" :key="item.id" class="px-5">
                                <nuxt-link :href="toolsService.getProductUrl(item)">
                                  <div class="tp-compare-thumb h-100">
                                    <img :src="toolsService.parseImageUrl(item?.images?.[0])" alt="product">
                                  </div>

                                  <p class="tp-compare-product-title">
	                                  {{ toolsService.parseProductName(item) }}
		                              </p>
                                </nuxt-link>
                              </td>
                            </tr>

                            <tr>
                              <th>{{ $t('Description') }}</th>
                              <td v-for="item in compareStore.compare_items" :key="item.id" class="p-1">
                                  <div class="text-end tp-compare-desc m-1">
                                      <p
		                                      class="card-text description-text overflow-x-auto w-100"
		                                      v-html="parseDescription(item)"
                                      >
                                      </p>
                                  </div>
                              </td>
                            </tr>

                            <tr>
                              <th>{{ $t('Price') }}</th>
                              <td v-for="item in compareStore.compare_items" :key="item.id">
                                  <div v-if="item?.discount > 0" class="tp-compare-price">
                                      <span>{{ currency(item.net) }}</span>
                                      <span class="old-price">{{ currency(item.price) }}</span>
                                  </div>
                                  <div v-else class="tp-compare-price">
                                      <span>{{ currency(item.price) }}</span>
                                  </div>
                              </td>
                            </tr>
                            
                            <tr>
                              <th>{{ $t('Add To Cart') }}</th>
                              <td v-for="item in compareStore.compare_items" :key="item.id">
                                  <div class="tp-compare-add-to-cart">
                                      <button
		                                      class="tp-btn"
		                                      type="button"
		                                      @click="cartStore.openCartProduct(item)"
                                      >{{ $t('Add To Cart') }}</button>
                                  </div>
                              </td>
                            </tr>

                            <tr>
                              <th>{{ $t('Rating') }}</th>
                              <td v-for="item in compareStore.compare_items" :key="item.id">
                                  <div class="tp-compare-rating">
	                                  <product-rating :product="item" />
                                  </div>
                              </td>
                            </tr>

                            <tr>
                              <th>{{ $t('Remove') }}</th>
                              <td v-for="item in compareStore.compare_items" :key="item.id">
                                  <div class="tp-compare-remove">
                                      <button
		                                      :title="$t('Remove :name', {name: toolsService.parseProductName(item)})"
		                                      @click="compareStore.removeCompare(item)"
                                      ><i class="fal fa-trash-alt"></i></button>
                                  </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                  </div>
              </div>
              <div class="col-xl-12 col-md-4">
                <div class="tp-cart-update text-md-end">
                    <button @click="compareStore.clearCompare()" type="button" class="tp-cart-update-btn">{{ $t('Remove all') }}</button>
                </div>
              </div>
          </div>
      </div>
  </section>
 </template>
 
 <script lang="ts" setup>
 import {useCompareStore} from "@/pinia/useCompareStore";
 import {useCartStore} from "@/pinia/useCartStore";
 import toolsService from "@/services/toolsService";
 import type {IProduct} from "@/types/product-d-t";
 import {useUtilityStore} from "@/pinia/useUtilityStore";

 const currency = useUtilityStore()?.currency
 const compareStore = useCompareStore();
 const cartStore = useCartStore();
 const {t} = useI18n();
 let textMore = ref<boolean>(true)

 const parseDescription = (product: IProduct): string => {
	 let description = product?.description || "";
	 return toolsService.normalizeLineEndingsToHtml(textMore.value ? description : `${description.substring(0, 100)}...`);
 };
 const textMoreLabel = computed(() => textMore.value ? t('See less') : t('See more'));
 const toggleTextMore = () => {
	 textMore.value = !textMore.value
 };
 </script>

 <style scoped>
 .description-text {
	 height: 96px;
 }

 .table td:nth-child(odd),
 .table th:nth-child(odd) {
	 background-color: var(--bs-gray-100);
 }

 /*
	.table th:nth-child(odd) {
		background-color: var(--tp-grey-3);
	}*/

 </style>