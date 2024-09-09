<template>
	<div  class="tp-product-details-differents-accessories">
    <div class="row">
	    <product-loading-sm v-if="productDifferentsPending" />
      <div
		      v-for="productDifferent in productDifferents"
		      v-else
		      :key="productDifferent.id"
		      class="col-12 col-xxl-6 pb-3"
      >
        <product-sm :current="different" :product="productDifferent" @clicked="emit('clicked', $event)" />
      </div>
    </div>
    <div class="row">
	    <product-accessory-group-loading-sm v-if="productAccessoriesPending" />
      <div v-for="(productAccessory, i) in productAccessories" v-else :key="productAccessory.id" class="col-12 pb-3">
        <product-accessory-group-sm
		        :group="productAccessory"
		        :selected="accessories?.[Number(productAccessory.id)]?.accessory"
		        @updated="emit('updated', productAccessory, $event,productAccessories)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {$axios} from "@/plugins/00.axiosInstance";
import toolsService from "@/services/toolsService.js";
import type {IProduct} from "@/types/product-d-t";
import {convertProductDifferentsResponse} from "@/plugins/data/product-differents-data.js";
import {convertProductAccessoriesResponse} from "@/plugins/data/product-accessories-groups-data";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";
import type {IProductAccessoriesData} from "@/types/selected-accessories-data-d-t";

const route = useRoute();
const router = useRouter();
const {t} = useI18n();
const emit = defineEmits(['updated', 'clicked', 'onLoading']);

const props = withDefaults(defineProps<{
	// productAccessories?: IProductAccessoriesGroups[];
	accessories?: ISelectedAccessories[]|IProductAccessoriesData[];
	different?: IProduct;
	product: IProduct;
}>(), {
	different: (d) => d.product,
})

const {
	data: productDifferents,
	error: productDifferentsError,
	pending: productDifferentsPending,
	refresh: productDifferentsRefresh,
} = useAsyncData(
		`products-${props.product?.id}-differents`,
		() => !Object.keys(props.product).length ? [] : $axios.get(`products/${toolsService.id(props.product)}/differents`).then(res => {
			let data = (res?.data?.data || []).map(convertProductDifferentsResponse);
			data.unshift(props?.product);
			return data
		}),
		{
			watch: [props.product, props.different, route],
		}
)

const {
	data: productAccessories,
	error: productAccessoriesError,
	pending: productAccessoriesPending,
	refresh: productAccessoriesRefresh,
	execute: productAccessoriesExecute
} = useAsyncData(
		`products-${props.product?.id}-accessories`,
		() => !Object.keys(props.product).length ? [] : $axios.get(`products/${toolsService.id(props.product)}/accessories_groups`)
				.then(res => (res?.data?.data || []).map(convertProductAccessoriesResponse)),
		{
			watch: [props.product, route],
		}
)

const loadingPending = computed(() => {
	return props.loading?.pending || productDifferentsPending.value || productAccessoriesPending.value
})

onMounted(async () => {
	if (Object.keys(props.product).length) {
		if (!productDifferents.value) await productDifferentsRefresh()
		if (!productAccessories.value) await productAccessoriesRefresh()
	}
});

watch(
		() => props.product,
		async (newVal) => {
			if (Object.keys(newVal).length) {
				productAccessoriesRefresh()
				productDifferentsRefresh()
			}
		}
)

watch(
		[productAccessoriesPending, productDifferentsPending],
		([accessoriesPending, differentsPending]) => {
			emit('onLoading', accessoriesPending || differentsPending)
		}
)
</script>