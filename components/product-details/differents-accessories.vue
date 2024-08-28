<template>
	<div class="tp-product-details-differents-accessories">
    <div class="row">
      <div v-for="productDifferent in productDifferents" :key="productDifferent.id" class="col-12 col-xxl-6 pb-3">
        <product-sm :current="different" :product="productDifferent" @clicked="emit('clicked', $event)" />
      </div>
    </div>
    <div class="row">
      <div v-for="(productAccessory, i) in productAccessories" :key="productAccessory.id" class="col-12 pb-3">
        <product-accessory-group-sm
		        :group="productAccessory"
		        @updated="emit('updated', productAccessory, $event,productAccessories)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {$axios} from "@/plugins/axiosInstance.js";
import toolsService from "@/services/toolsService.js";
import {convertProductDifferentsResponse} from "@/plugins/data/product-differents-data.js";
import {convertProductAccessoriesResponse} from "@/plugins/data/product-accessories-groups-data.js";
import type {IProduct} from "@/types/product-d-t";

const route = useRoute();
const router = useRouter();
const {t} = useI18n();
const emit = defineEmits(['updated','clicked'])
const currency = useSiteSettings().currency;

const props = withDefaults(defineProps<{
	productAccessories?: IProductAccessoriesGroups[];
	different?: IProduct;
	product: IProduct;
	mainProduct: IProduct;
	isShowBottom?: boolean
}>(), {
	isShowBottom: true,
})

const productDifferentsLoader = () => $axios.get(`products/${toolsService.id(props.mainProduct)}/differents`).then(res => {
	let data = (res?.data?.data || []).map(convertProductDifferentsResponse);
	data.unshift(props?.mainProduct);
	return data
});


const {
	data: productDifferents,
	error: productDifferentsError,
	pending: productDifferentsPending,
	refresh: productDifferentsRefresh,
} = await useLazyAsyncData(`products-${props.mainProduct?.id}-differents`, productDifferentsLoader, {
	watch: [props.mainProduct, props.different, route],
})

// const productAccessoriesLoader = () => $axios.get(`products/${toolsService.id(props.mainProduct)}/accessories_groups`)
// 		.then(res => (res?.data?.data || []).map(convertProductAccessoriesResponse));
//
// const {
// 	data: productAccessories,
// 	error: productAccessoriesError,
// 	pending: productAccessoriesPending,
// 	refresh: productAccessoriesRefresh,
// } = await useLazyAsyncData(`products-${props.mainProduct?.id}-accessories`, productAccessoriesLoader, {
// 	watch: [props.mainProduct, props.different, route],
// })

onMounted(async () => {
	if (!productDifferents.value) {
		await productDifferentsRefresh()
	}
	// if (!productAccessories.value) {
	// 	await productAccessoriesRefresh()
	// }
});

</script>