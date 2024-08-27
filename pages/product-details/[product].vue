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

const {data: product, pending} = useLazyAsyncData(`product-${route.params.product}`, () => productStore.loadProducts()
		.then((products: IProduct[]) => {
			if (products.value?.[0] && products.value?.[0]?.images?.length > 0) {
				productStore.activeImg = products.value?.[0]?.images?.[0];
			}

			return products.value?.[0];
		}), {
	initialData: productStore.product_data?.[0],
	watch: [productStore.product_data, route],
});
// console.log(37,product)
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
