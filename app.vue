<template>
  <NuxtLayout name="default">
    <loading-indicator  />
    <NuxtPage />

	  <cart-modal
			  id="addToCartModal"
			  :cart_accessory_products_count="cart_accessory_products_count"
			  :cart_different_products_count="cart_different_products_count"
			  :title="$t('Select product')"
	  />
  </NuxtLayout>
</template>


<script lang="ts" setup>
import {useProductFilterStore} from './pinia/useProductFilterStore';
import {useUtilityStore} from './pinia/useUtilityStore';
// import localeService from "@/services/localeService";
import {useUserStore} from "@/pinia/useUserStore";
import {useCartStore} from "@/pinia/useCartStore";
import {useLocaleStore} from "@/pinia/useLocaleStore";

const route = useRoute();
const {t} = useI18n();
const prdFilterStore = useProductFilterStore();
const utilsStore = useUtilityStore();
const userStore = useUserStore()
const localeStore = useLocaleStore()
const cart_accessory_products_count = ref(4);
const cart_different_products_count = ref(4);
const cartStore = useCartStore();

onMounted(() => {
	localeStore.checkLanguage();
	userStore.initializeUser();

	// $axios.instance.defaults.headers.common['language'] = localeService.locale();
	// console.log(17, $axios.instance.defaults.headers.common['language'], localeService.locale())
})

watch(() => route.path, () => {
	prdFilterStore.$reset
	prdFilterStore.handleResetFilter();
	utilsStore.removeBackdrop();
})

</script>