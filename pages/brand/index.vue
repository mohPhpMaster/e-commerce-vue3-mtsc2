<template>
  <div v-if="brand">
    <!-- breadcrumb start -->
    <brand-details-breadcrumb :brand="brand" />
	  <!-- breadcrumb end -->

	  <!-- shop area start -->
    <shop-area v-if="brand" :brand="brand" />
	  <!-- shop area end -->
  </div>
</template>

<script lang="ts" setup>
import type {IBrand} from "@/types/brand-d-t";
import {api} from "@/plugins/api";

const brand = ref<IBrand>();
const propBrand = computed(() => useRoute()?.params?.brand);

useSeoMeta({title: "Brand Details Page"});

onMounted(() => {
});

api.brandData({
	slug: propBrand.value,
})
		.then(data => {
			brand.value = data?.[0];

			return data;
		})
</script>
