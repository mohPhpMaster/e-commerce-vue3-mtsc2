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
                            :class="`nav-link ${displayStyleStore() === 'grid' ? 'active' : ''}`"
                            @click="displayStyleStore('grid')"
                          >
                            <svg-grid />
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            :class="`nav-link ${displayStyleStore() === 'list' ? 'active' : ''}`"
                            @click="displayStyleStore('list')"
                          >
                            <svg-list />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div class="tp-shop-top-result">
	                    <p>
											  {{ $t('Showing ') }}{{ items_pagination_mode === 1 ? (displayedProducts.length ? 1 : 0) : (startIndex + 1) }}–{{ items_pagination_mode === 1 ? Number(displayedProducts?.length || 0) : (startIndex + filteredProducts?.slice(startIndex, endIndex).length) }}{{ $t(' of ') }}{{ filteredProducts?.length || 0 }}{{ $t(' results') }}
											</p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <shop-sidebar-filter-select @handle-select-filter="store.handleSelectFilter" />
                </div>
              </div>
            </div>
            <div class="tp-shop-items-wrapper tp-shop-item-primary">
              <div v-show="displayStyleStore() === 'grid'">
                <div class="row infinite-container">
                  <div
		                  v-for="product in filteredProducts.slice(startIndex, endIndex)"
		                  :key="product.id"
		                  class="col-xl-4 col-md-6 col-sm-6 infinite-item"
                  >
                    <product-single :product="product" />
                  </div>
                </div>
              </div>

              <div v-show="displayStyleStore() === 'list'">
                <div class="row">
                  <div class="col-xl-12">
                    <product-list-item
		                    v-for="product in filteredProducts?.slice(startIndex,endIndex)"
		                    :key="product.id"
		                    :item="product"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="tp-shop-pagination mt-20">
              <div
		              v-if="filteredProducts.length > 9"
		              class="tp-pagination"
              >
                <ui-pagination
		                :data="filteredProducts || []"
		                :items-per-page="9"
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
import { ref, watch } from "vue";
import { useProductFilterStore } from "@/pinia/useProductFilterStore";
import type { IProduct } from "@/types/product-d-t";
import type { ICategory } from "@/types/category-d-t";
import type { IBrand } from "@/types/brand-d-t";

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
	currentPage: {
		type: Number,
		default: 1,
	},
});

const store = useProductFilterStore();
const startIndex = ref<number>(0);
const endIndex = ref<number>(store.filteredProducts?.length!);
const filteredProducts = ref<IProduct[]>(store.filteredProducts!);
const propListStyle = computed(() => (props?.list_style === undefined ? "grid" : (props?.list_style ? "list" : "grid")));
const displayedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value));
const displayStyle = ref<string>(propListStyle?.value);

const displayStyleStore = (style?: string): string => {
	if (style !== undefined) {
		try {
			window && window.localStorage && window.localStorage.setItem("display_style", style);
		} catch (error) {
			console.error("Error accessing localStorage:", error);
		}
		displayStyle.value = style;
	}

	let result = propListStyle?.value;
	try {
		 result = window && window.localStorage && window.localStorage.getItem("display_style") || result;
	} catch (error) {
		console.error("Error accessing localStorage:", error);
	}

	if (displayStyle.value !== result)
	{
		return displayStyleStore(result)
	}

	return result;
};

function handlePagination(data: IProduct[], start: number, end: number): void {
	filteredProducts.value = data;
	startIndex.value = start;
	endIndex.value = end;
	store.handlePageChange(start)
}

watch(
		props,
		(newStatus, oldStatus) => {
			if (newStatus.category !== oldStatus.category || newStatus.brand !== oldStatus.brand) {
				store.loadProducts({
					category: newStatus.category,
					brand: newStatus.brand,
				});
			}
			// store.loadProducts({
			// 	category: props?.category,
			// 	brand: props?.brand,
			// })
		}
);


watch(
		() => String(route.query) + JSON.stringify(route.params) + JSON.stringify(filteredProducts.value),
		(newStatus) => {
			startIndex.value = 0;
			endIndex.value = store.filteredProducts && (store.filteredProducts.length > 9 ? 9 : store.filteredProducts?.length)!;
		}
);

onMounted(() => {
	store
			.loadProducts({
				category: props?.category,
				brand: props?.brand,
			})
			.then((data) => {
				filteredProducts.value = store.filteredProducts!;
			});
})

// watch(
//   () => startIndex.value,
//   (newStatus) => {
//     store.handlePageChange(9/newStatus);
//   }
// );
</script>
