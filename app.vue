<template>
  <NuxtLayout name="default">
    <loading-indicator />
    <NuxtPage />
  </NuxtLayout>
</template>


<script lang="ts" setup>
import {useProductFilterStore} from '@/pinia/useProductFilterStore';
import {useUtilityStore} from '@/pinia/useUtilityStore';
import {useUserStore} from "@/pinia/useUserStore";
import {useLocaleStore} from "@/pinia/useLocaleStore";

const route = useRoute();
const {t} = useI18n();
const prdFilterStore = useProductFilterStore();
const utilsStore = useUtilityStore();
const userStore = useUserStore()
const localeStore = useLocaleStore()
// const cartStore = useCartStore();
userStore.initializeUser();

onMounted(() => {
	localeStore.checkLanguage();
	// cartStore.fetchCart();
	// useWishlistStore().fetchWishlist();
	// useCompareStore().fetchComparelist();

	// $axios.instance.defaults.headers.common['language'] = localeService.locale();
	// console.log(17, $axios.instance.defaults.headers.common['language'], localeService.locale())
})

watch(
		() => route.path,
		() => {
			prdFilterStore.$reset
			prdFilterStore.handleResetFilter();
			utilsStore.removeBackdrop();
		}
);
</script>