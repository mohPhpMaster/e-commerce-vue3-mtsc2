<template>
  <div v-if="product">
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

<script setup lang="ts">
import {useProductStore} from "@/pinia/useProductStore";
import type {IProduct} from "@/types/product-d-t";

const productStore = useProductStore();
let product = computed(() => productStore.product_data?.[0]);

useSeoMeta({ title: "Product Details Page" });

onMounted(() => {
	productStore
			.loadProducts()
			.then((products: IProduct[]) => {
				if (products?.[0] && products?.[0]?.images?.length > 0) {
					productStore.activeImg = products?.[0]?.images?.[0];
				}
			});
});

</script>
