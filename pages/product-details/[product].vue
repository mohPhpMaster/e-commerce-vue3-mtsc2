<template>
  <div v-if="!pending && product">
      <!-- breadcrumb start -->
      <product-details-breadcrumb :product="product" />
	  <!-- breadcrumb end -->

	  <!-- product details area start -->
      <product-details-area :product="product" />
	  <!-- product details area end -->

	  <!-- related products start -->
      <product-related :product="product" />
	  <!-- related products end -->
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "@/pinia/useProductStore";
import type {IProduct} from "@/types/product-d-t";

const productStore = useProductStore();
const route = useRoute();
// let product = computed(() => productStore.product_data?.[0]);

useSeoMeta({title: "Product Details Page"});

const {data: product, pending} = useLazyAsyncData(`product-${route.params.product}`, () => productStore.loadProducts({
	slug: route.params.product,
})
		.then(async (products: IProduct[]) => {
			if (products.value?.[0] && products.value?.[0]?.images?.length > 0) {
				productStore.activeImg = products.value?.[0]?.images?.[0];
			}

			// await refreshNuxtData([`products-${products.value?.[0]?.id}-differents`, `products-${products.value?.[0]?.id}-accessories`]);
			return products.value?.[0];
		}), {
	initialData: productStore.product_data?.[0],
	watch: [route],
});
// onMounted(() => {
// 	productStore
// 			.loadProducts()
// 			.then((products: IProduct[]) => {
// 				if (products?.[0] && products?.[0]?.images?.length > 0) {
// 					productStore.activeImg = products?.[0]?.images?.[0];
// 				}
// 			});
// });

</script>
