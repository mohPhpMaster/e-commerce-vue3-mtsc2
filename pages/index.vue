<template>
  <main>
    <!-- hero area start -->
    <hero-area></hero-area>
    <!-- hero area end -->

    <!-- product area start -->
    <product-area
		    v-for="item in category_data"
		    :key="item.id"
		    :category="item"
		    :products="item.products"
		    :title="item.parentName"
		    :url="item.url"
    ></product-area>
    <!-- product area start -->

	  <!-- brand area start -->
    <brand-area />
	  <!-- brand area end -->

  </main>
</template>

<script setup lang="ts">
import {useCategoryFeaturedStore} from "@/pinia/useCategoryFeaturedStore";
import type {ICategory} from "@/types/category-d-t";

useSeoMeta({title: "Shofi Grocery - eCommerce Vue Nuxt 3 Template"});

const {loadCategoriesFeatured} = useCategoryFeaturedStore();
let category_data = ref<ICategory[]>([]);

onMounted(() => {
	loadCategoriesFeatured()
			.then((data) => {
				category_data.value = data
			})

})

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
