<template>
  <main>
    <!-- hero area start -->
    <hero-area v-if="$settings?.sliderShow"></hero-area>
    <!-- hero area end -->

    <!-- product area start -->
    <product-area
		    v-for="item in category_data"
		    :key="item?.id"
		    :category="item"
		    :products="item?.products || []"
		    :pretitle="item?.preName || toolsService.parseCategoryName(item)"
		    :title="toolsService.parseCategoryName(item)"
		    :url="item?.url || ''"
    ></product-area>
    <!-- product area start -->

	  <!-- brand area start -->
    <brand-area />
	  <!-- brand area end -->

  </main>
</template>

<script setup lang="ts">
import {$axios} from "@/plugins/00.axiosInstance";
import {convertCategoryFeaturedResponse} from "@/plugins/data/category-featured-data";
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";

const {data: category_data, pending, error, refresh} = useLazyAsyncData<ICategory[]>('categories/featured', () =>
		$axios.get('categories/featured').then(res => (res?.data?.data || []).map(convertCategoryFeaturedResponse))
);
</script>
