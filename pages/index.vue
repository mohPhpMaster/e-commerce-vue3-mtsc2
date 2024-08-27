<template>
  <main>
    <!-- hero area start -->
    <hero-area></hero-area>
    <!-- hero area end -->

    <!-- product area start -->
    <product-area
		    v-for="item in category_data"
		    :key="item?.id"
		    :category="item"
		    :products="item?.products || []"
		    :title="item?.parentName || '-'"
		    :url="item?.url || ''"
    ></product-area>
    <!-- product area start -->

	  <!-- brand area start -->
    <brand-area />
	  <!-- brand area end -->

  </main>
</template>

<script setup lang="ts">
import {$axios} from "@/plugins/axiosInstance";
import {convertCategoryFeaturedResponse} from "@/plugins/data/category-featured-data";

useSeoMeta({title: "Shofi Grocery - eCommerce Vue Nuxt 3 Template"});

const {data: category_data, pending, error, refresh} = useLazyAsyncData<string[]>('categories/featured', () =>
		$axios.get('categories/featured').then(res => (res?.data?.data || []).map(convertCategoryFeaturedResponse))
);

// const {loadCategoriesFeatured} = useCategoryFeaturedStore();
// const category_data = ref<ICategory[]>([]);

// onMounted(() => {
// 	loadCategoriesFeatured()
// 			.then((data: Ref<ICategory[]>) => {
// 				category_data.value = data.value;
// 				return data;
// 			})
//
// })

// definePageMeta({
// 	title: 'pages.title.top' // set resource key
// })
//
// const {locale, locales, t} = useI18n()
// const switchLocalePath = useSwitchLocalePath()
//
// const availableLocales = computed(() => {
// 	return locales.value.filter(i => i.code !== locale.value)
// })

</script>
