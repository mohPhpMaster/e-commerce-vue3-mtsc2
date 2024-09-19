<template>
  <div v-if="!pending && brand">
		<img
				v-if="brand?.imageUrl"
				:src="brand?.imageUrl"
				class="hero-image d-block mx-auto"
				alt="hero image"
		>

    <brand-details-breadcrumb v-if="brand?.id" :brand="brand" />
    <breadcrumb v-else :title="propBrand" :subtitle="propBrand" />

    <shop-area :brand="brand" />
  </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import {convertBrandResponse} from "@/plugins/data/brand-data";

const route = useRoute();
const router = useRouter();
const propBrand = computed(() => (router.currentRoute.value?.params?.brand));
const {title, settings} = useSiteSettings();
const {updateSlugOnLocale} = useNuxtApp().$settings;
// todo:
function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({
				title: title(toolsService.parseBrandName(p), route.query?.page),
				// todo:
				description: p?.seo_description,
				keywords: p?.seo_keywords,
			});
		});
	}
}

const {data: brand, pending, error, refresh, execute} = useLazyAsyncData(
		`brands_${propBrand.value}`,
		() => {
			if (brand.value && brand.value?.slug && propBrand.value !== brand.value?.slug) {
				return {};
			}

			return useF(`brands/${propBrand.value}`, {
				params: {
					page: route.query?.page || 1
				},
				parseResponse: (res) => (JSON.parse(res)?.data || []).map(convertBrandResponse),
			})
					.then(({error, data, /*execute, */status}) => {
						if (!data || data.value?.length === 0) {
							return [[]];
						}

						return data.value;
					})
					.then(data => data?.[0])
					.then(data => {
						if (updateSlugOnLocale === true && (data?.slug && data?.slug !== propBrand.value)) {
							return navigateTo({params: {brand: data.slug}, query: route.query});
						}

						if (process.client) {
							setTitle(data)
						}

						return data;
					});
		},
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

watch(
		() => router.currentRoute.value?.params,
		(n) => {
			if (brand.value && brand.value?.slug && propBrand.value !== brand.value?.slug) {
				brand.value = undefined;
				// refresh();
			}
		}
);
</script>

<style lang="scss" scoped>
.hero-image {
	max-height: 400px;
	margin: 0;
}
</style>