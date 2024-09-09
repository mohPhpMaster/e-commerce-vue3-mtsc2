<template>
  <div class="tp-shop-widget-content" v-if="!brand_pending">
    <div class="tp-shop-widget-brand-list d-flex justify-content-start flex-wrap">
      <div
		      v-for="item in (brand_data as IBrandFilter[])"
		      :key="item?.id"
		      :class="{ 'tp-shop-widget-brand-item-selected': isActiveQuery(item) }"
		      class="tp-shop-widget-brand-item"
      >
        <nuxt-link :href="toolsService.getBrandUrl(item)" @click.prevent="handleBrandRoute(item?.id)">
	        <img
			        v-if="item?.imageUrl"
			        :src="item?.imageUrl"
			        :title="toolsService.parseBrandName(item)"
			        alt="brand image"
			        class="ms-3"
	        />
	        <span v-else>{{ toolsService.parseBrandName(item) }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
	<loading-skeleton v-else />
</template>

<script lang="ts" setup>
import {useProductFilterStore} from "@/pinia/useProductFilterStore";
import {$axios} from "@/plugins/00.axiosInstance";
import type {IBrandFilter} from "@/types/brand-filter-d-t";
import type {TBrandFilter} from "@/types/brand-t";
import toolsService from "@/services/toolsService";

const store = useProductFilterStore();
const router = useRouter();
const route = useRoute();
const activeQuery = ref(store.productBrand);

const isActiveQuery = (brand: TBrandFilter) => activeQuery.value === brand?.id;
const currentPath = computed(() => router.currentRoute.value.path);

const handleBrandRoute = (value: number) => store.handleProductBrandChangeAndFilter(value);

const {
	data: brand_data,
	pending: brand_pending,
	error: brand_error,
	refresh: brand_refresh,
	execute: brand_execute
} = useLazyAsyncData(
		`brands-filter`,
		() => $axios.get(`brands-filter?filter=1`, {baseURL: "http://localhost:3000/api"})
				.then(res => (res?.data?.data || []).map(convertBrandFilterResponse))
				.then((data): IBrandFilter[] => (!data || data?.length === 0) ? [] : data),
		{
			watch: [currentPath],
			immediate: true
		}
);

const fetchRouterProductBrand = () => {
	store.fetchRouterProductBrand();
	activeQuery.value = store.productBrand;
};

onMounted(() => {
	fetchRouterProductBrand();
})

watch(
		() => route.query,
		(n) => {
			fetchRouterProductBrand();
		}
);
</script>
