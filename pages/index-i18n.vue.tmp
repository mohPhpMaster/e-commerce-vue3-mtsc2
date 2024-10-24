<template>
  <div>
    <p>{{ t('pages.top.description') }}</p>
    <p>{{ t('pages.top.languages') }}</p>
    <nav>
      <template v-for="(locale, index) in availableLocales" :key="locale.code">
        <span v-if="index"> | </span>
        <NuxtLink :to="switchToLocalePath(locale.code)">
          {{ locale.name ?? locale.code }}
	        {{ t('pages.top.title') }}
	        {{ switchToLocalePath(locale.code) }}
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'pages.title.top' // set resource key
})

const {locale, locales, t} = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
	return locales.value.filter(i => i.code !== locale.value)
})

import {useCategoryFeaturedStore} from "@/pinia/useCategoryFeaturedStore";

useSeoMeta({ title: "Shofi Grocery - eCommerce Vue Nuxt 3 Template" });

const categoryFeaturedStore = useCategoryFeaturedStore();
// categoryFeaturedStore.loadCategoriesFeatured();
let category_data = computed(() => categoryFeaturedStore.category_featured_data);
const router = useRouter();
const route = useRoute();
// console.log(21, category_data);
const switchToLocalePath = (code: string) => {
	let urlSearchParams = new URLSearchParams(route.query);
	urlSearchParams.set('locale', code);
	let url = route.path + '?' + urlSearchParams.toString();
	// if (route.href !== url)
	// {
	// 	router.push(url)
	// }

	return url
}
</script>
