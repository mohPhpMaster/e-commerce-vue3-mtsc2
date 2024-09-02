<template>
  <div v-if="!pending && brand">
	  <!-- breadcrumb start -->
    <brand-details-breadcrumb v-if="brand?.id" :brand="brand" />
    <breadcrumb v-else :title="propBrand" :subtitle="propBrand" />
	  <!-- breadcrumb end -->

	  <!-- shop area start -->
    <shop-area :brand="brand" />
	  <!-- shop area end -->
  </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";

const route = useRoute();
// const propBrand = () => useRoute()?.params?.brand;
const propBrand = computed(() => route.params?.brand);
const {title, settings} = useSiteSettings();

function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({title: title(toolsService.parseBrandName(p), route.query?.page)});
		});
	}
}

const {data: brand, pending, error, refresh, execute} = useLazyAsyncData(
		`brand-${propBrand.value}`,
		() => $fetch(`brands/${propBrand.value}`, {
			baseURL: settings.apiURL,
			responseType: 'json',
			parseResponse: (res) => JSON.parse(res)?.data,
			params: {
				page: route.query?.page || 1
			}
		})
		.then(data => {
			if (!data || data?.length === 0) {
				return [[]];
			}

			return data;
		})
		.then(data => data?.[0])
		.then(data => {
			if (process.client) {
				setTitle(data)
			}

			return data;
		}),
		{
			watch: [route],
			immediate: false
		}
);

await execute();

if (brand.value && brand.value?.id) {
	setTitle(brand.value)
}

if (
		(error?.value && error?.value?.message === 'EMPTY')
		// || !(brand?.value && brand?.value?.id)
) {
	showError({
		statusCode: 404,
		statusMessage: useI18n().t('Brand not found'),
		data: 'EMPTY',
		error: error?.value || new Error('EMPTY'),
		url: route.href,
		fatal: true
	});
}
</script>
