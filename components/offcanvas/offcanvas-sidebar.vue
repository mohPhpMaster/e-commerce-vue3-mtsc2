<template>
  <div>
    <div
      :class="`tp-filter-offcanvas-area ${store.openFilterOffcanvas ? 'offcanvas-opened' : ''}`"
    >
      <div class="tp-filter-offcanvas-wrapper">
        <div class="tp-filter-offcanvas-close">
          <button
            @click="store.handleOpenFilterOffcanvas()"
            type="button"
            class="tp-filter-offcanvas-close-btn filter-close-btn"
          >
            <i class="fa-solid fa-xmark"></i>
            {{ $t('Close') }}
          </button>
        </div>
        <div class="tp-shop-sidebar">
          <!-- filter -->
          <div class="tp-shop-widget mb-35">
            <h3 class="tp-shop-widget-title no-border">{{ $t('Price Filter') }}</h3>

            <shop-sidebar-price-filter :filter_offcanvas="true" />
          </div>
          <!-- status -->
          <div class="tp-shop-widget mb-50">
            <h3 class="tp-shop-widget-title">{{ $t('Product Status') }}</h3>

            <shop-sidebar-filter-status :filter_offcanvas="true" />
          </div>
          <!-- categories -->
          <div class="tp-shop-widget mb-50">
            <h3 class="tp-shop-widget-title">{{ $t('Categories') }}</h3>

            <shop-sidebar-filter-categories :filter_offcanvas="true" />
          </div>

          <!-- product rating -->
          <div class="tp-shop-widget mb-50">
            <h3 class="tp-shop-widget-title">{{ $t('Top Rated Products') }}</h3>
            <shop-sidebar-top-product />
          </div>
          <!-- brand -->
          <div class="tp-shop-widget mb-50">
            <h3 class="tp-shop-widget-title">{{ $t('Popular Brands') }}</h3>
            <!-- filter brand start -->
            <shop-sidebar-filter-brand :filter_offcanvas="true" />
            <!-- filter brand end -->
          </div>

          <!-- reset filter start -->
          <shop-sidebar-reset-filter :filter_offcanvas="true" />
          <!-- reset filter end -->
        </div>
      </div>
    </div>
    <div
      @click="store.handleOpenFilterOffcanvas()"
      :class="`body-overlay ${store.openFilterOffcanvas ? 'opened' : ''}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/pinia/useProductStore";
import { useProductFilterStore } from "@/pinia/useProductFilterStore";
const store = useProductStore();
const filterStore = useProductFilterStore();
const router = useRouter();
const route = useRoute();

const handleFilterReset = () => {
  filterStore.handleResetFilter();
  store.handleOpenFilterOffcanvas()
  router.push("/shop-filter-offcanvas");
};

watch(
  () => route.query || route.path,
  (newStatus) => {
    store.openFilterOffcanvas = false
  }
);
</script>
