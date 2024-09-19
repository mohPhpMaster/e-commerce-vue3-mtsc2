<template>
  <section class="tp-shop-area pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4">
          <shop-sidebar />
        </div>
        <div class="col-xl-9 col-lg-8">
          <div class="tp-shop-main-wrapper" v-if="!pending">
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
		                    <!--		                    {{-->
		                    <!--			                    $t('Showing :start-:end of :total results', {-->
		                    <!--				                    start: items_pagination_mode === 1 ? (filteredProducts?.length ? 1 : 0) : (startIndex + 1),-->
		                    <!--				                    end: items_pagination_mode === 1 ? (filteredProducts.slice(startIndex, endIndex)?.length || filteredProducts?.length || 0) : (startIndex + filteredProducts.slice(startIndex, endIndex)?.length),-->
		                    <!--				                    total: filteredProducts?.length || 0,-->
		                    <!--			                    })-->
		                    <!--		                    }}-->
		                    {{
			                    $t('Showing :start-:end of :total results', {
				                    start: showingStartLabel(),
				                    end: showingEndLabel(),
				                    total: showingTotalLabel(),
			                    })
		                    }}
											</p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <shop-sidebar-filter-select />
                </div>
              </div>
            </div>
            <div class="tp-shop-items-wrapper tp-shop-item-primary">
	            <div v-if="displayedProducts.length === 0" class="container">
					      <div class='text-center pt-50'>
					        <h5>{{ $t('No Products Found') }}</h5>
					        <nuxt-link href="/" class="tp-cart-checkout-btn mt-20">{{ $t('Back to Home') }}</nuxt-link>
					      </div>
	            </div>
              <div v-else-if="displayStyle === 'grid'">
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

              <div v-else-if="displayStyle === 'list'">
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
		              v-if="showingPagination()"
		              class="tp-pagination"
              >
                <ui-pagination
		                :data="filteredProducts || []"
		                :items-per-page="perPage"
		                :total="meta?.total"
		                @handle-paginate="handlePagination"
                />
              </div>
            </div>
          </div>
					<loading-skeleton v-else />
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
import toolsService from "@/services/toolsService";
import {calcEndIndexByStartIndex, calcStartIndexByPage} from "@/services/calcPageService";

const props = defineProps({
	items_pagination_mode: {
		type: [Number] as PropType<number>,
		default: 2,
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
const route = useRoute();
const router = useRouter();
const {$settings} = useNuxtApp();
const {title} = useSiteSettings();
const store = useProductFilterStore();
const perPage = $settings.perPage;
const noImageUrl = $settings.noImageUrl;

// const page = ref<number>(route?.query?.page || 1);
const filteredProducts = ref<IProduct[]>([]);
const startIndex = ref<number>(0);
const endIndex = ref<number>(filteredProducts.value?.length!);
const meta = useState('meta', () => {});

const propListStyle = computed(() => (props?.list_style === undefined ? "grid" : (props?.list_style ? "list" : "grid")));
const displayedProducts = computed(() => {
	if (filteredProducts.value?.length > perPage) {
		return filteredProducts.value.slice(startIndex.value, endIndex.value);
	}

	return filteredProducts.value;
});
const displayStyle = ref<string>(propListStyle.value);

function setTitle() {
	nextTick(function () {
		useSeoMeta({
			title: title(
					props?.category?.id ? toolsService.parseCategoryName(props?.category) : props?.brand?.id ? toolsService.parseBrandName(props?.brand) : ""
					, router.currentRoute.value?.query?.page)
		});
	});
}

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

function handlePagination(data: IProduct[], start: number, end: number = undefined): void {
	end = end === undefined ? calcEndIndexByStartIndex(start, perPage) : end;
	filteredProducts.value = data;
	startIndex.value = start;
	endIndex.value = end;
	store.handlePageChange(start);
	store.setData(data);

	if (process.client) {
		setTitle()
	}
}

const {data, pending, refresh} = useLazyAsyncData(
		`load-products-${props?.category?.id || 0}-${props?.brand?.id || 0}-${router.currentRoute.value?.query?.page || 1}`,
		() => {
			if (
					(!props?.category?.id && !props?.brand?.id) ||
					(
							!router.currentRoute.value?.params?.category &&
							!router.currentRoute.value?.params?.brand
					) ||
					(
							props?.category && props?.category?.slug && router.currentRoute.value?.params?.category !== props?.category?.slug
					)
			) {
				meta.value = undefined;
				handlePagination(
						[],
						0,
						0
				)

				return [];
			}

			let opt: IFetchProductOptions = {
				category: props?.category,
				brand: props?.brand,
				page: Number(router.currentRoute.value?.query?.page || 1),
				plain: true,
				pagination: true,
				// baseUrl: "http://localhost:3000/api"
			};

			store.updateProductOptions(opt);
			return api.productData(opt)
					.then(({data, meta: $meta}) => {
						meta.value = $meta;
						data = data.map(x => convertProductResponse(x, noImageUrl));
						let _data = [];
						return data.filter(x => {
							if (_data.includes(Number(x.id))) {
								return false
							}
							_data.push(Number(x.id));
							return true;
						})
					})
					.then((products: IProduct[]) => {
						if (process.client) {
							if (products.length === 0 && opt.page > 1) {
								router.push({
									query: {
										...router.currentRoute.value?.query,
										page: 1,
										l: 258
									}
								})

								return products;
							}

							let $products = store.filterProducts(products || [])
							handlePagination(
									$products,
									0,
									$products.length
							)
						}

						return products;
					});
		},
		{
			watch: [router.currentRoute, props],
			// server: true, // optional
		}
);

const showingStartLabel = () => {
	if (props.items_pagination_mode === 1) {
		// items_pagination_mode === 1 ? (filteredProducts?.length ? 1 : 0) : (startIndex + 1)
		return filteredProducts.value?.length ? 1 : 0
	} else if (props.items_pagination_mode === 2) {
		return meta.value?.from || 0
	} else {
		return startIndex.value + 1
	}
}

const showingEndLabel = () => {
	// items_pagination_mode === 1 ? (filteredProducts.slice(startIndex, endIndex)?.length || filteredProducts?.length || 0) : (startIndex + filteredProducts.slice(startIndex, endIndex)?.length)
	if (props.items_pagination_mode === 1) {
		return filteredProducts.value.slice(startIndex.value, endIndex.value)?.length || filteredProducts.value?.length || 0;
	} else if (props.items_pagination_mode === 2) {
		return meta.value?.to || 0
	} else {
		return startIndex.value + filteredProducts.value.slice(startIndex.value, endIndex.value)?.length;
	}
}

const showingTotalLabel = () => {
	if (props.items_pagination_mode === 2) {
		return meta.value?.total || 0
	} else {
		return filteredProducts.value?.length || 0;
	}
}

const showingPagination = () => {
	if (props.items_pagination_mode === 2) {
		return meta.value?.total > perPage || false
	} else {
		return filteredProducts.value?.length > perPage;
	}
}

onMounted(() => {
	displayStyleStore();

	if (process.client) {
		if (!pending.value) {
			if (data.value?.length) {
				if (data.value.length !== store.product_data.length) {
					store.setData(data.value);
				}
				if (data.value.length !== filteredProducts.value.length) {
					filteredProducts.value = store.filterProducts(data.value || []);
				}
			} else {
				if (data.value?.length === 0 && Number(router.currentRoute.value?.query?.page) > 0) {
					router.push({
						query: {
							...route?.query,
							page: 1,
							l: 338,
						}
					})
				} else {
					refresh();
				}
			}
		}
	}
});

watch(
		() => props,
		(newStatus, oldStatus) => {
			if (newStatus[0] !== oldStatus[0] || newStatus[1] !== oldStatus[1]) {
				refresh();
			}
		}
);

watch(
		() => [route.query, route.params],
		() => {
			if (process.client) {
				handlePagination(
						filteredProducts.value || [],
						calcStartIndexByPage(undefined, perPage)
				)
			}
		}
);
</script>
