<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="category in (category_data as ICategoryFilter[])" :key="category?.id">
          <a
		          :class="{
								active: isActiveQuery(category)
							}"
		          class="pointer"
		          :href="toolsService.getCategoryUrl(category)"
		          @click.prevent="store.handleProductCategoryChangeAndFilter(category?.id)"
          >
            {{ toolsService.parseCategoryName(category) }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import type {ICategoryFilter} from "@/types/category-filter-d-t";
import type {TCategoryFilter} from "@/types/category-t";
import {useProductFilterStore} from "@/pinia/useProductFilterStore";

const store = useProductFilterStore();
const router = useRouter();
const route = useRoute();
const activeQuery = ref(store.productCategory);

const isActiveQuery = (category: TCategoryFilter) => activeQuery.value === category?.id;
const currentPath = computed(() => router.currentRoute.value.path);

const {
	data: category_data,
	execute: category_execute
} = useLazyAsyncData(
		`categories-filter`,
		() => $axios.get(`categories-filter?filter=1`)
				.then(res => (res?.data?.data || []).map(convertCategoryFilterResponse))
				.then((data): ICategoryFilter[] => (!data || data?.length === 0) ? [] : data),
		{
			watch: [ currentPath ],
			immediate: false
		}
);

await category_execute();

const fetchRouterProductCategory = () => {
	store.fetchRouterProductCategory()
	activeQuery.value = store.productCategory;
};

onMounted(() => {
	fetchRouterProductCategory();
});

watch(
		() => route.query,
		(n, o) => {
			fetchRouterProductCategory();
		}
);
</script>
