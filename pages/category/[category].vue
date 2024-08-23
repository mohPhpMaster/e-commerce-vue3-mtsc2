<template>
  <div v-if="category">
      <!-- breadcrumb start -->
      <category-details-breadcrumb :category="category" />
	  <!-- breadcrumb end -->

	  <!-- shop area start -->
      <shop-area :category="category" />
	  <!-- shop area end -->
  </div>
</template>

<script lang="ts" setup>
import type {ICategory} from "@/types/category-d-t";
import {api} from "@/plugins/api";

const category = ref<ICategory | undefined>(undefined);
const propCategory = computed(() => useRoute()?.params?.category);

useSeoMeta({title: "Category Details Page"});

onMounted(() => {
	api.categoryData({
		slug: propCategory.value,
	})
			.then(data => {
				category.value = data?.[0];

				return data;
			})
});
// const get_data = (name: string = 'default') => {
// 	if (_data.value[name]) {
// 		return _data.value[name]
// 	}
//
// 	let categories = categoryStore.loadCategories({name})
// 	console.log(27, {categories, _data,name});
// 	debugger
// 	return _data
// }
</script>
