<template>
  <section class="tp-shop-area pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4">
          <!-- shop sidebar start -->
          <shop-sidebar />
	        <!-- shop sidebar end -->
        </div>
        <div class="col-xl-9 col-lg-8">
          <div class="tp-shop-main-wrapper">
            <div class="tp-shop-top mb-45">
              <div class="row">
                <div class="col-xl-6">
                  <div class="tp-shop-top-left d-flex align-items-center">
                    <div class="tp-shop-top-tab tp-tab">
                      <ul id="productTab" class="nav nav-tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
		                          :class="`nav-link ${displayStyle === 'grid' ? 'active' : ''}`"
		                          @click="displayStyleStore('grid')"
                          >
                            <svg-grid />
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
		                          :class="`nav-link ${displayStyle === 'list' ? 'active' : ''}`"
		                          @click="displayStyleStore('list')"
                          >
                            <svg-list />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div class="tp-shop-top-result">
	                    <p>
<!--                        {{ $t('Showing ') }}{{ items_pagination_mode === 1 ? (displayedProducts.length ? 1 : 0) : (startIndex + 1) }}–{{ items_pagination_mode === 1 ? Number(displayedProducts?.length || 0) : (startIndex + filteredProducts.slice(startIndex, endIndex).length) }}{{ $t(' of ') }}{{ filteredProducts?.length || 0 }}{{ $t(' results') }}-->
		                    {{
			                    $t('Showing :start-:end of :total results', {
				                    start: items_pagination_mode === 1 ? (filteredProducts?.length ? 1 : 0) : (startIndex + 1),
				                    end: items_pagination_mode === 1 ? (filteredProducts.slice(startIndex, endIndex)?.length || filteredProducts?.length || 0) : (startIndex + filteredProducts.slice(startIndex, endIndex)?.length),
				                    total: filteredProducts?.length || 0,
			                    })
		                    }}
											</p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <shop-sidebar-filter-select v-if="filteredProducts?.length" @handle-select-filter="store.handleSelectFilter" />
                </div>
              </div>
            </div>
            <div class="tp-shop-items-wrapper tp-shop-item-primary">
              <div v-if="displayStyle === 'grid'">
                <div class="row infinite-container">
                  <div
		                  v-for="product in displayedProducts"
		                  :key="product.sku"
		                  class="col-xl-4 col-md-6 col-sm-6 infinite-item"
                  >
                    <product-single :product="product" />
                  </div>
                </div>
              </div>

              <div v-if="displayStyle === 'list'">
                <div class="row">
                  <div class="col-xl-12">
                    <product-list-item
		                    v-for="product in displayedProducts"
		                    :key="product.id"
		                    :item="product"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="tp-shop-pagination mt-20">
              <div
		              v-if="filteredProducts?.length > perPage"
		              class="tp-pagination"
              >
                <ui-pagination
		                :data="filteredProducts || []"
		                :items-per-page="perPage"
		                @handle-paginate="handlePagination"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {useProductFilterStore} from "@/pinia/useProductFilterStore";
import type {IProduct} from "@/types/product-d-t";
import type {ICategory} from "@/types/category-d-t";
import type {IBrand} from "@/types/brand-d-t";
import type {IFetchProductOptions} from "@/types/fetch-product-options-d-t";
import {api} from "@/plugins/api";
import {convertProductResponse} from "@/plugins/data/product-data";
import {$axios} from "@/plugins/axiosInstance";
import toolsService from "@/services/toolsService";
import {convertProductDifferentsResponse} from "@/plugins/data/product-differents-data";

const perPage = useNuxtApp().$settings.perPage;
const route = useRoute();
const props = defineProps({
	items_pagination_mode: {
		type: [Number] as PropType<number>,
		default: 1,
	},
	list_style: {
		type: [Boolean, undefined] as PropType<boolean | undefined>,
		default: undefined,
	},
	category: {
		type: Object as PropType<ICategory>,
		default: null,
	},
	brand: {
		type: Object as PropType<IBrand>,
		default: null,
	},
	products: {
		type: Array as PropType<IProduct[]>,
		default: [],
	},
	// currentPage: {
	// 	type: Number,
	// 	default: 1,
	// },
});
const store = useProductFilterStore();
const page = ref<number>(route?.query?.page || 1);
const filteredProducts = ref<IProduct[]>([]);
const startIndex = ref<number>(0);
const endIndex = ref<number>(filteredProducts.value?.length!);

const propListStyle = computed(() => (props?.list_style === undefined ? "grid" : (props?.list_style ? "list" : "grid")));
const displayedProducts = computed(() => {
	if (filteredProducts.value?.length > perPage) {
		return filteredProducts.value.slice(startIndex.value, endIndex.value);
	}

	return filteredProducts.value;
});
const displayStyle = ref<string>(propListStyle.value);

const displayStyleStore = (style?: string): string => {
	if (style !== undefined) {
		if (process.client) { // Ensure this runs only on the client side
			try {
				window.localStorage.setItem("display_style", style);
				displayStyle.value = style;
			} catch (error) {
				console.error("Error accessing localStorage:", error);
			}
		}
	}

	let result = propListStyle.value;
	if (process.client) { // Ensure this runs only on the client side
		try {
			result = window.localStorage.getItem("display_style") || result;
		} catch (error) {
			console.error("Error accessing localStorage:", error);
		}
	}

	if (displayStyle.value !== result) {
		return displayStyleStore(result);
	}

	return result;
};

function handlePagination(data: IProduct[], start: number, end: number): void {
	filteredProducts.value = data;
	startIndex.value = start;
	endIndex.value = end;
	store.handlePageChange(start);
	store.setData(data);
}

const {data, pending, refresh} = await useAsyncData(
		`load-products-${props?.category?.id || 0}-${props?.brand?.id || 0}-${page.value || 1}`,
		() => {
			let opt: IFetchProductOptions = {
				category: props?.category,
				brand: props?.brand,
				page: page.value,
				plain: true
			};
			store.updateProductOptions(opt);
			const {siteSettings} = useSiteSettings();
			let noImageUrl = siteSettings.noImageUrl;
			const response = api.productData(opt)
					.then(data => {
						return data.map(x => convertProductResponse(x, noImageUrl));
					});

			return response;
		},
		{
			// initialData: [], // optional
			// server: true, // optional
		}
);

store.setData(data.value)
// console.log(201,data.value)
filteredProducts.value = store.filterProducts(data.value || []);

// loadProduct({
// 	category: props?.category,
// 	brand: props?.brand,
// 	page: page.value
// });

watch(
		() => [props.category, props.brand],
		(newStatus, oldStatus) => {
			if (newStatus[0] !== oldStatus[0] || newStatus[1] !== oldStatus[1]) {
				refresh();
			}
		}
);

watch(
		() => String(route.query) + JSON.stringify(route.params),
		() => {
			startIndex.value = 0;
			endIndex.value = store.filteredProducts && (store.filteredProducts?.length > perPage ? perPage : store.filteredProducts?.length)!;
		}
);

watch(
		() => page,
		() => {
			store.updateCurrentPage(page);
		}
)

onMounted(() => {
	displayStyleStore();

	if (!data.value) {
		refresh()
	}
});
</script>
