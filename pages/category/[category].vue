<template>
  <div v-if="!pending && category?.id">
      <!-- breadcrumb start -->
	  <!--      <breadcrumb :title="category?.parentName" :subtitle="category?.parentName" />-->
      <category-details-breadcrumb :category="category" />
	  <!-- breadcrumb end -->

	  <!-- shop area start -->
      <shop-area :category="category" />
	  <!-- shop area end -->
  </div>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";
import toolsService from "@/services/toolsService";

const route = useRoute();
// const category = ref<ICategory | undefined>(undefined);
const propCategory = computed(() => route.params?.category);
const {title} = useSiteSettings();

function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({title: title(toolsService.parseCategoryName(p), route.query?.page)});
		});
	}
}

const {data: category, pending, error, refresh} = useLazyAsyncData(
		`categories_${propCategory?.value}`,
		() => api.categoryData({
			slug: propCategory?.value,
			page: route.query?.page || 1
		})
		.then(data => data?.[0])
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
