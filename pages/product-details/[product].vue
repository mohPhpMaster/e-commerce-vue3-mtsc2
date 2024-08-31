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
import toolsService from "@/services/toolsService";
import {api} from "@/plugins/api";
import {convertProductResponse} from "@/plugins/data/product-data";

const productStore = useProductStore();
const route = useRoute();
const {title} = useSiteSettings();

function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({title: title(toolsService.parseProductName(p, true), route.query?.page)});
		});
	}
}

const noImageUrl = useNuxtApp().$settings.noImageUrl;
const {data: product, pending} = useLazyAsyncData(
		`product-${route.params.product}`,
		() => api.productData({
			slug: route.params.product,
			plain: true
		})
				.then((products: IProduct[]) => {
					products = products.map(x => convertProductResponse(x, noImageUrl));
					productStore.setData(products);
					return products?.[0];
				})
				.then((product: IProduct) => {
					if (product && product?.images?.length > 0) {
						productStore.handleImageActive(product.images[0]);
					}

					if (process.client)
					{
						setTitle(product)
					}
					// await refreshNuxtData([`product-${product?.id}-differents`, `product-${product?.id}-accessories`]);
					return product;
				}),
		{
			initialData: productStore.product_data?.[0],
			watch: [route],
		}
);

onMounted(() => {
	setTitle(product.value)
})

</script>
