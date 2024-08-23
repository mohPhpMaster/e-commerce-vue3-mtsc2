<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb title="Search Products" subtitle="Search Products" />
    <!-- breadcrumb end -->

    <!-- shop area start -->
    <section class="tp-shop-area pb-120">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="tp-shop-main-wrapper">
              <div class="tp-shop-top mb-45">
                <div class="row">
                  <div class="col-xl-6">
                    <div class="tp-shop-top-left d-flex align-items-center">
                      <div class="tp-shop-top-result">
                        <p>
                          {{ $t('Showing ') }}1–{{store.filteredProducts?.slice(0, perView).length}}{{ $t(' of ') }}{{ product_data.length }}{{ $t(' results') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <shop-sidebar-filter-select
                      @handle-select-filter="store.handleSelectFilter"
                    />
                  </div>
                </div>
              </div>
              <div class="tp-shop-items-wrapper tp-shop-item-primary">
                <div>
                  <div class="row infinite-container">
                    <div
                      v-for="item in store.filteredProducts?.slice(0,perView)"
                      :key="item.id"
                      class="col-xl-3 col-md-4 col-sm-6 infinite-item"
                    >
                      <product-single :product="item"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button
                v-if="
                  store.filteredProducts &&
                  perView < store.filteredProducts.length
                "
                @click="handlePerView"
                type="button"
                class="btn-loadmore tp-btn tp-btn-border tp-btn-border-primary"
              >
								{{ $t('Load More Products') }}
              </button>

              <p v-else class="btn-loadmore-text">{{ $t('No More Products') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- shop area end -->
  </div>
</template>

<script setup lang="ts">
import {api} from "@/plugins/api";

useSeoMeta({ title: "Search Page" });

import { ref } from "vue";
// import product_data from "@/data/product-data";
import { useProductFilterStore } from "@/pinia/useProductFilterStore";
import type {ICategory} from "@/types/category-d-t";
import type {IProduct} from "@/types/product-d-t";

const product_data = ref<IProduct[]>([]);
const propSearchText = computed(() => useRoute()?.query?.searchText);
let perView = ref<number>(8);
const store = useProductFilterStore();

// api.productData({
// 	query: store.selectVal || propSearchText?.value || '',
// })
// 		.then(data => {
// 			// category.value = data?.[0];
// 			console.log(87, data, store.selectVal || propSearchText, store.filteredProducts);
// 			product_data.value = data;
// 			return data;
// 		})

function handlePerView() {
  perView.value = perView.value + 3;
}

onMounted(() => {
	store.loadProducts({search: propSearchText?.value || '',})
			.then(data => {
				product_data.value = data;
			})
})

watch(propSearchText, () => {
	store.loadProducts({search: propSearchText?.value || '',})
			.then(data => {
				product_data.value = data;
			})
})
</script>
