<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb
		    :subtitle="$t('Search Page')"
		    :title="propSearchText ? t('Search for (:search)', {search: propSearchText}) : $t('Search Page')"
    />
	  <!-- breadcrumb end -->

	  <!-- shop area start -->
    <section class="tp-shop-area pb-120">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="tp-shop-main-wrapper">
              <div v-if="searchStore.filteredProducts?.slice(0,perView).length" class="tp-shop-top mb-45">
                <div class="row">
                  <div class="col-xl-6">
                    <div class="tp-shop-top-left d-flex align-items-center">
                      <div class="tp-shop-top-result">
                        <p>
<!--                          {{ $t('Showing ') }}1–{{store.filteredProducts?.slice(0, perView).length}}{{ $t(' of ') }}{{ product_data.length }}{{ $t(' results') }}-->
	                        {{
		                        $t('Showing :start-:end of :total results', {
			                        start: searchStore.filteredProducts?.length ? 1 : 0,
			                        end: searchStore.filteredProducts?.slice(0, perView).length,
			                        total: searchStore.filteredProducts?.length || 0,
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
                <div>
                  <div class="infinite-container">
	                  <div v-if="!searchStore.loading" class="row">
					            <div v-if="!searchStore.filteredProducts?.slice(0,perView).length" class="container">
						            <div v-if="!propSearchText" class="border rounded-0">
                          <form @submit.prevent="handleSubmit">
		                        <div class="tp-header-search-input-box-5">
		                            <div class="tp-header-search-input-5">
		                              <input
				                              v-model="searchText"
				                              :placeholder="$t('Search for products keywords ...')"
				                              type="text"
		                              >
		                              <span class="tp-header-search-icon-5">
		                                  <svg-search-2></svg-search-2>
		                              </span>
		                            </div>
		                            <button class="rounded-0" type="submit">{{ $t('Search') }}</button>
		                        </div>
		                      </form>
						            </div>
									      <div v-else class='text-center pt-50'>
									        <h5>{{ $t('No Products Found') }}</h5>
									        <nuxt-link class="tp-cart-checkout-btn mt-20" href="/">{{ $t('Back to Home') }}</nuxt-link>
									      </div>
					            </div>
	                    <div
			                    v-for="item in searchStore.filteredProducts?.slice(0,perView)"
			                    v-else
			                    :key="item.id"
			                    class="col-xl-3 col-md-4 col-sm-6 infinite-item"
	                    >
	                      <product-single :product="item" />
	                    </div>
	                  </div>
	                  <loading-skeleton v-else />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!searchStore.loading" class="text-center">
              <button
		              v-if="
                  searchStore.filteredProducts &&
                  perView < searchStore.filteredProducts.length
                "
		              class="btn-loadmore tp-btn tp-btn-border tp-btn-border-primary"
		              type="button"
		              @click="handlePerView"
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

<script lang="ts" setup>
import {useProductFilterStore} from "@/pinia/useProductFilterStore";
import {useSearchStore} from "@/pinia/useSearchStore";

const router = useRouter();
const route = useRoute();
const propSearchText = computed(() => route?.query?.searchText);
const store = useProductFilterStore();
const searchStore = useSearchStore();
const {$settings} = useNuxtApp();
const {title} = useSiteSettings();
const {t} = useI18n();
const perPage = $settings.perPage;
const perView = ref<number>(perPage);
const searchText = ref<string>(propSearchText.value);

const handleSubmit = () => {
	if (searchText.value) {
		if (searchText.value === router.currentRoute.value?.query?.searchText) {
			searchStore.triggerSearch();
			return false;
		}

		router.push({
			path: '/search',
			query: {
				...route?.query,
				searchText: searchText.value
			}
		});
	} else {
		store.handleResetFilter();
		router.push(`/search`)
	}
}

function handlePerView() {
	perView.value = perView.value + 3;
}

function setTitle() {
	nextTick(function () {
		useSeoMeta({
			title: title(
					propSearchText.value ? t('Search for (:search)', {search: propSearchText.value}) : ''
			)
		});
	});
}

onMounted(() => {
	searchStore
			.triggerSearch()
			.then(setTitle)
})

watch(
		() => route.query,
		() => {
			searchStore
					.triggerSearch()
					.then(setTitle);

			searchText.value = propSearchText.value
		}
)
</script>
