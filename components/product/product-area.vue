<template>
  <section class="tp-product-area py-5">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-xl-6 col-lg-5">
          <div
            class="tp-section-title-wrapper-5 mb-45 text-center text-lg-start"
          >
            <span class="tp-section-title-pre-5">
							{{ title }}
	            <svg width="82" height="22" viewBox="0 0 82 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M81 14.5798C0.890564 -8.05914 -5.81154 0.0503902 5.00322 21" stroke="currentColor" stroke-opacity="0.3" stroke-width="2" stroke-miterlimit="3.8637" stroke-linecap="round"/>
              </svg>
            </span>
            <h3 class="tp-section-title-5">{{ title }}</h3>
          </div>
        </div>
        <div class="col-xl-6 col-lg-7">
          <div class="tp-product-tab-2 tp-product-tab-5 tp-tab mb-55">
            <div
              class="tp-product-tab-inner-3 d-flex align-items-center justify-content-center justify-content-lg-end"
            >
              <nav>
                <div class="nav nav-tabs justify-content-center tp-product-tab tp-tab-menu p-relative" id="nav-tab">
                    <nuxt-link :href="toolsService.getCategoryUrl(category)" @click="toolsService.gotoCategory(category)" :class="`nav-link active`" id="nav_active">
                      {{ category?.parentName }}
                      <span class="tp-product-tab-tooltip" v-if="products?.length > 0">{{ products?.length }}</span>
                    </nuxt-link>
                  <span id="productTabMarker" class="tp-tab-line d-none d-sm-inline-block"></span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="row">
            <div v-for="item in products" :key="item.id" class="col-xl-3 col-lg-4 col-sm-6">
              <product-single :product="item" :mini="true"></product-single>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {IProduct} from "@/types/product-d-t";
import type {ICategory} from "@/types/category-d-t";
import toolsService from "@/services/toolsService";

const props = defineProps<{
	category: ICategory,
	products: IProduct[],
	title: string,
	url: string
}>()

// const $products: Ref<IProduct[]> = ref([]);
//
// onMounted(() => {
// 	console.log(64, props?.products,$products.value)
// });
</script>
