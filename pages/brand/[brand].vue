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
import toolsService from "@/services/toolsService";

const route = useRoute();
// const propBrand = () => useRoute()?.params?.brand;
const propBrand = computed(() => route.params?.brand);
const {title} = useSiteSettings();

function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({title: title(toolsService.parseBrandName(p), route.query?.page)});
		});
	}
}

const {data: brand, pending, error, refresh} = useLazyAsyncData(
		`brand-${propBrand.value}`,
		() => $fetch(`brands/${propBrand.value}`, {
			baseURL: useSiteSettings().settings.apiURL,
			responseType: 'json',
			parseResponse: (res) => JSON.parse(res)?.data?.[0],
			params: {
				page: route.query?.page || 1
			}
		})
		.then(data => {
			if (process.client) {
				setTitle(data)
			}

			return data;
		}),
		{
			watch: [route]
		}
);
</script>
