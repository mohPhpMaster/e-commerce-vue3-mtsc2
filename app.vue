<template>
  <NuxtLayout name="default">
	  <NuxtLoadingIndicator :skip="['error']" />
    <NuxtPage />

	  <cart-modal
			  id="addToCartModal"
			  :cart_accessory_products_count="cart_accessory_products_count"
			  :cart_different_products_count="cart_different_products_count"
			  :title="$t('Select product')"
	  ></cart-modal>
  </NuxtLayout>
</template>


<script lang="ts" setup>
import {useProductFilterStore} from './pinia/useProductFilterStore';
import {useUtilityStore} from './pinia/useUtilityStore';
import localeService from "@/services/localeService";
import {useUserStore} from "@/pinia/userStore";
import {useCartStore} from "@/pinia/useCartStore";

const route = useRoute();
const {t} = useI18n();
const prdFilterStore = useProductFilterStore();
const utilsStore = useUtilityStore();
const userStore = useUserStore()
const cart_accessory_products_count = ref(4);
const cart_different_products_count = ref(4);
const cartStore = useCartStore();

onMounted(() => {
	localeService.checkLanguage();
	userStore.initializeUser(true);
	// $axios.instance.defaults.headers.common['language'] = localeService.locale();
	// console.log(17, $axios.instance.defaults.headers.common['language'], localeService.locale())
})

watch(() => route.path, () => {
	prdFilterStore.$reset
	prdFilterStore.handleResetFilter();
	utilsStore.removeBackdrop();
})

</script>