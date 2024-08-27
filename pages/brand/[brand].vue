<template>
  <div v-if="!pending && brand?.id">
	  <!-- breadcrumb start -->
    <brand-details-breadcrumb :brand="brand" />
	  <!-- breadcrumb end -->

	  <!-- shop area start -->
    <shop-area :brand="brand" />
	  <!-- shop area end -->
  </div>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";

// const propBrand = () => useRoute()?.params?.brand;
const propBrand = computed(() => useRoute()?.params?.brand);

useSeoMeta({title: "Brand Details Page"});

const page = ref(1)
const {data: brand, pending} = await useAsyncData(
		`brand-${propBrand.value}`,
		() => $fetch(`brands/${propBrand.value}`, {
			baseURL: useNuxtApp().$settings.apiURL,
			responseType: 'json',
			parseResponse: (res) => JSON.parse(res)?.data?.[0],
			params: {
				page: page.value
			}
		}), {
			watch: [page]
		}
)

// const {data: brand, pending} = useLazyAsyncData(`brands-${propBrand?.value}`, () => api.brandData({
// 	slug: propBrand.value,
// 	plain: true
// }, {
// 	initialData: {},
// 	transform: (data) => data?.[0],
// 	watch: [productStore.product_data],
// }).then(data => {
// 	console.log(28,data)
// 	return data;
// }))
</script>
