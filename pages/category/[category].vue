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

// const category = ref<ICategory | undefined>(undefined);
const propCategory = computed(() => useRoute()?.params?.category);

useSeoMeta({title: "Category Details Page"});

const {data: category, pending} = useLazyAsyncData(`categories_${propCategory?.value}`, () => api.categoryData({
	slug: propCategory?.value,
	// plain: true
}).then(data => {
	return data?.[0];
}));
// category.value = data.value?.[0];

// const {data, pending, error, refresh} = useLazyAsyncData<string[]>('categories', () =>
// 		api.categoryData({
// 			slug: propCategory?.value,
// 		})
// 				.then(data => {
// 					category.value = data?.[0];
//
// 					return data;
// 				})
// );

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
