<template>
  <div v-if="!pending && product">
      <!-- breadcrumb start -->
      <product-details-breadcrumb v-if="product?.id" :product="product" />
      <breadcrumb v-else :subtitle="propProduct" :title="propProduct" />
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
import type {IProductResponse} from "@/types/product-response-d-t";
import productAddionalsData, {convertProductAddionalResponse} from "@/plugins/data/product-addionals-data";
import type {IProductAddionals} from "@/types/product-addionals-d-t";
import type {IProductAddionalsResponse} from "@/types/product-addionals-response-d-t";

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const propProduct = computed(() => (router.currentRoute.value?.params?.product));
const {title} = useSiteSettings();
const {$settings} = useNuxtApp();
const {noImageUrl, updateSlugOnLocale} = $settings;

function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({
				title: title(toolsService.parseProductName(p, true), route.query?.page),
				// todo:
				description: p?.seo_description,
				keywords: p?.seo_keywords
			});
		});
	}
}

const {data: product, pending, error, refresh, execute} = useLazyAsyncData(
		`product_${propProduct?.value}`,
		() => {
			if (product.value && product.value?.sku && propProduct.value !== product.value?.sku) {
				return {};
			}

			return api.productData({
				slug: propProduct?.value,
				plain: true
			})
					.then((data: IProductResponse[]) => {
						data = (data || []).map(x => convertProductResponse(x, noImageUrl));

						if (!data || data.length === 0) {
							return [[]];
						}

						productStore.setData(data);
						return data;
					})
					.then(data => data?.[0])
					.then((data: IProduct) => {
						if (updateSlugOnLocale ===true && (data?.sku && data?.sku !== propProduct.value)) {
							return navigateTo({params: {product: data.sku}, query: route.query});
						}

						if (data && data?.images?.length > 0) {
							productStore.handleImageActive(data.images[0]);
						}

						if (process.client) {
							setTitle(data)
						}

						// await refreshNuxtData([`product-${product?.id}-differents`, `product-${product?.id}-accessories`]);
						return data;
					});
		},
		{
			initialData: productStore.product_data?.[0],
			watch: [route],
			immediate: false
		}
);

await execute();

if (product.value && product.value?.id) {
	setTitle(product.value)
}

if (
		(error?.value && error?.value?.message === 'EMPTY')
		// || !(product?.value && product?.value?.id)
) {
	showError({
		statusCode: 404,
		statusMessage: useI18n().t('Product not found'),
		data: 'EMPTY',
		error: error?.value || new Error('EMPTY'),
		url: route.href,
		fatal: true
	});
}

await execute();

if (product.value && product.value?.id) {
	setTitle(product.value)
}

if (
		(error?.value && error?.value?.message === 'EMPTY')
		// || !(product?.value && product?.value?.id)
) {
	showError({
		statusCode: 404,
		statusMessage: useI18n().t('Product not found'),
		data: 'EMPTY',
		error: error?.value || new Error('EMPTY'),
		url: route.href,
		fatal: true
	});
}

watch(
		() => router.currentRoute.value?.params,
		(n) => {
			if (product.value && product.value?.sku && propProduct.value !== product.value?.sku) {
				product.value = undefined;
				// refresh();
			}
		}
);
</script>
