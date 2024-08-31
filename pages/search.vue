<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb :subtitle="$t('Search Page')" :title="propSearchText ? t('Search for (:search)', {search: propSearchText}) : $t('Search Page')" />
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
<!--                          {{ $t('Showing ') }}1–{{store.filteredProducts?.slice(0, perView).length}}{{ $t(' of ') }}{{ product_data.length }}{{ $t(' results') }}-->
	                        {{
		                        $t('Showing :start-:end of :total results', {
			                        start: 1,
			                        end: searchStore.filteredProducts?.slice(0, perView).length,
			                        total: searchStore.filteredProducts?.length || 0,
		                        })
	                        }}
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
		                    v-for="item in searchStore.filteredProducts?.slice(0,perView)"
		                    v-if="!searchStore.loading"
		                    :key="item.id"
		                    class="col-xl-3 col-md-4 col-sm-6 infinite-item"
                    >
                      <product-single :product="item" />
                    </div>
	                  <loading-skeleton v-else />
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center" v-if="!searchStore.loading">
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

const propSearchText = computed(() => useRoute()?.query?.searchText);
const store = useProductFilterStore();
const searchStore = useSearchStore();
const {$settings} = useNuxtApp();
const {title} = useSiteSettings();
const {t} = useI18n();
const perPage = $settings.perPage;
const perView = ref<number>(perPage);

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

watch(propSearchText, () => {
	searchStore
			.triggerSearch()
			.then(setTitle)
})
</script>
