<template>
  <div v-if="!pending && category">
      <!-- breadcrumb start -->
      <category-details-breadcrumb v-if="category?.id" :category="category" />
      <breadcrumb v-else :subtitle="propCategory" :title="propCategory" />
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
const router = useRouter();
// const category = ref<ICategory | undefined>(undefined);
const propCategory = computed(() => router.currentRoute.value?.params?.category);
const {title} = useSiteSettings();

function setTitle(p) {
	if (p && Object.keys(p).length) {
		nextTick(function () {
			useSeoMeta({title: title(toolsService.parseCategoryName(p), route.query?.page)});
		});
	}
}

const {data: category, pending, error, refresh, execute} = useLazyAsyncData(
		`categories_${propCategory?.value}`,
		() => {
			if (category.value && category.value?.slug && propCategory.value !== category.value?.slug) {
				return {};
			}

			return api.categoryData({
				slug: propCategory?.value,
				page: route.query?.page || 1,
				// baseUrl: "http://localhost:3000/api"
			})
					.then(data => {
						if (data.length === 0) {
							return [[]];
						}

						return data;
					})
					.then(data => data?.[0])
					.then(data => {
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

if (category.value && category.value?.id) {
	setTitle(category.value)
}

if (
		(error?.value && error?.value?.message === 'EMPTY')
		// || !(category?.value && category?.value?.id)
) {
	showError({
		statusCode: 404,
		statusMessage: useI18n().t('Category not found'),
		data: 'EMPTY',
		error: error?.value || new Error('EMPTY'),
		url: route.href,
		fatal: true
	});
}

watch(
		() => router.currentRoute.value?.params,
		(n) => {
			if (category.value && category.value?.slug && propCategory.value !== category.value?.slug) {
				category.value = undefined;
				refresh();
			}
		}
);
</script>
