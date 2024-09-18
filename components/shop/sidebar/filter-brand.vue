<template>
  <div class="tp-shop-widget-content" v-if="!brand_pending">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="brand in (brand_data as IBrandFilter[])" :key="brand?.id">
          <a
		          :class="{
								active: isActiveQuery(brand)
							}"
		          class="pointer"
		          :href="toolsService.getBrandUrl(brand)"
		          @click.prevent="store.handleProductBrandChangeAndFilter(brand?.id)"
          >
            {{ toolsService.parseBrandName(brand) }}
          </a>
        </li>
      </ul>
    </div>
  </div>
	<loading-skeleton v-else />
</template>

<script lang="ts" setup>
import {useProductFilterStore} from "@/pinia/useProductFilterStore";
import toolsService from "@/services/toolsService";
import {$axios} from "@/plugins/00.axiosInstance";
import type {IBrandFilter} from "@/types/brand-filter-d-t";
import type {TBrandFilter} from "@/types/brand-t";

const store = useProductFilterStore();
const router = useRouter();
const route = useRoute();
const activeQuery = ref(store.productBrand);

const isActiveQuery = (brand: TBrandFilter) => activeQuery.value === brand?.id;
const currentPath = computed(() => router.currentRoute.value.path);

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
			watch: [ currentPath ],
			immediate: false
		}
);

await brand_execute();

const fetchRouterProductBrand = () => {
	store.fetchRouterProductBrand()
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
