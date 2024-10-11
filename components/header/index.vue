<template>
  <header>
    <div
		    id="header-sticky"
		    :class="`tp-header-area p-relative tp-header-sticky tp-header-height ${isSticky ? 'header-sticky' : ''}`"
    >
      <div class="tp-header-5 pl-25 pr-25" style="background-color: var(--tp-navbar-bg-color); color: var(--tp-navbar-text-color);">
          <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-xxl-2 col-xl-3 col-6">
                  <div class="tp-header-left-5 d-flex align-items-center">
                      <div class="tp-header-hamburger-5 ms-15 d-none d-lg-block">
                        <button class="tp-hamburger-btn-2 tp-hamburger-toggle" @click="handleActive">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                      </div>
                      <div class="tp-header-hamburger-5 ms-15 d-lg-none">
                        <button
		                        class="tp-hamburger-btn-2 tp-offcanvas-open-btn"
		                        @click="utilityStore.handleOpenMobileMenu()"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                      </div>
                      <div class="logo">
                        <nuxt-link href="/">
                          <img alt="logo" :src="$settings?.logo" class="site-logo">
                        </nuxt-link>
                      </div>
                  </div>
	                <!-- category start -->
                  <header-top-categories :categories="topCategories" :is-active="isActive" @toggle="handleActive"></header-top-categories>
	                <!-- category end -->
                </div>
                <div class="col-xxl-4 col-xl-6 d-none d-xl-block">
                  <div class="main-menu">
                    <nav class="tp-main-menu-content">
                      <!-- menus start -->
                      <header-menus />
	                    <!-- menus end -->
                    </nav>
                  </div>
                </div>
                <div class="col-xxl-4 d-none d-xxl-block">
                  <div class="tp-header-search-5">
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
                            <button type="submit">{{ $t('Search') }}</button>
                        </div>
                      </form>
                  </div>
                </div>
                <div class="col-xxl-2 col-xl-3 col-6">
                  <div class="tp-header-right-5 d-flex align-items-center justify-content-end">
                      <div class="tp-header-login-5 d-none d-md-block">
                        <header-user-block></header-user-block>
                      </div>

                      <div class="tp-header-action-5 d-flex align-items-center ml-20">
                        <div class="tp-header-action-item-5 d-none d-sm-block">
                            <nuxt-link href="/wishlist">
                              <svg-wishlist></svg-wishlist>
                              <span class="tp-header-action-badge-5">{{ wishlistStore.wishlists.length }}</span>
                            </nuxt-link>
                        </div>
                        <div class="tp-header-action-item-5 d-none d-sm-block">
                            <nuxt-link href="/compare">
	                            <svg-compare-2 />
                              <span class="tp-header-action-badge-5">{{ compareStore.compare_items.length }}</span>
                            </nuxt-link>
                        </div>
                        <div class="tp-header-action-item-5">
                            <button class="cartmini-open-btn" type="button" @click="cartStore.handleCartOffcanvas">
                              <svg-cart-bag></svg-cart-bag>
                              <span class="tp-header-action-badge-5">{{ products_count }}</span>
                            </button>
                        </div>
                        <div class="tp-header-action-item-5 d-none d-sm-block d-xxl-none">
                            <button type="button" @click="utilityStore.handleOpenSearchBar()">
                              <svg-search-2></svg-search-2>
                            </button>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>

    </div>
  </header>

	<!-- cart offcanvas start -->
  <offcanvas-cart-sidebar />
	<!-- cart offcanvas end -->

	<!-- search start -->
  <header-search></header-search>
	<!-- search end -->

	<!-- cart offcanvas start -->
  <offcanvas-mobile-sidebar :categories="topCategories"></offcanvas-mobile-sidebar>
	<!-- cart offcanvas end -->
</template>

<script lang="ts" setup>
import {useCartStore} from '@/pinia/useCartStore';
import {useWishlistStore} from '@/pinia/useWishlistStore';
import {useUtilityStore} from '@/pinia/useUtilityStore';
import {useCompareStore} from "@/pinia/useCompareStore";
import {useSearchStore} from "@/pinia/useSearchStore";
import {useProductFilterStore} from "@/pinia/useProductFilterStore";
import {api} from "@/plugins/api";
import {computed} from "vue";

const {isSticky} = useSticky();
const router = useRouter();
const route = useRoute();
const store = useProductFilterStore();

const {data: topCategories, pending, error, refresh} = useLazyAsyncData('topCategories', () => {
	return api.topCategoryData();
});

let isActive = ref<boolean>(false);
let searchText = ref<string>(route?.query?.searchText);

const handleActive = () => {
	return isActive.value = !isActive.value;
};

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();
const compareStore = useCompareStore();
const products_count = computed(() => cartStore?.cart_products?.length);

const handleSubmit = () => {
	if (searchText.value) {
		if (searchText.value === router.currentRoute.value?.query?.searchText) {
			useSearchStore().triggerSearch();
			return false;
		}

		router.push({
			path: '/search',
			query: {
				...router.currentRoute.value?.query,
				searchText: searchText.value
			}
		});
	} else {
		store.handleResetFilter();
		router.push(`/search`)
	}
}

watch(
		() => route.href,
		() => {
			isActive.value = false;
			searchText.value = router.currentRoute.value?.query?.searchText
		}
)
</script>

<style lang="scss" scoped>
.site-logo {
	height: 72px;
}
</style>