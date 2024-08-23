<template>
    <div class="col-12 h-100 pb-3 row" v-if="selectedProductDifferent">
        <div class="col-12">
          <div class="form-group d-flex align-items-center">
            <label class="mr-2 font-weight-bold" for="productSelect">{{ $t("Product:") }}</label>
            <select id="productSelect" v-model="selectedProduct" @change="commit()" class="form-control">
              <option v-for="(product_different, index) in productDifferents" :key="index" :value="product_different?.id">
                {{ toolsService.parseProductName(product_different, true) }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-10 h-100 pr-1 py-2">
          <div class="card h-100 mt-0">
            <div class="card-body">
              <h5 class="card-title">{{ toolsService.parseProductName(selectedProductDifferent, true) }}</h5>
              <p v-html="toolsService.normalizeLineEndingsToHtml(selectedProductDifferent?.description)" class="overflow-x-auto card-text description-text"/>
              <p class="card-text">
                <small class="text-muted">{{ $t('Price:') }} {{ currency(selectedProductDifferent?.price) }}</small>
              </p>
            </div>
          </div>
        </div>
        <div class="col-2 pl-1 align-self-stretch py-2">
          <div class="card h-100 mt-0">
            <img
		            :src="toolsService.parseImageUrl(selectedProductDifferent?.images?.[0])"
		            alt="Product Image"
		            class="card-img-top h-100"
            >
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import toolsService from "@/services/toolsService";
import {api} from "@/plugins/api";
import type {IProduct} from "@/types/product-d-t";
import {useUtilityStore} from "@/pinia/useUtilityStore";

const emit = defineEmits(['updated'])

const currency = useUtilityStore()?.currency;

const props = defineProps<{
	product: IProduct;
	productsCount: number;
	select?: string|number;
	productDifferents: IProduct[];
}>();

// State
const selectedProduct = ref<string|number>(props?.select || props.product?.id);
const selectedProductDifferent = computed((): IProduct => {
	return <IProduct>props.productDifferents.find((product_different: IProduct) => product_different?.id === selectedProduct.value);
})

const commit = () => {
	emit('updated', selectedProductDifferent.value);
};

// Watchers
// watch(
// 		() => selectedProduct.value,
// 		(newVal) => {
			// console.log(selectedProductDifferent.value, selectedProduct.value)
		// }
// );
watch(
		() => props.select || props.product?.id,
		(newVal) => {
			if (!newVal) {
				selectedProduct.value = "";
			} else {
				selectedProduct.value = newVal;
			}
		}
);
</script>

<style scoped>
.ribbon {
	position: absolute;
	top: -10px;
	left: -10px;
	z-index: 1;
	overflow: hidden;
	width: 75px;
	height: 75px;
	text-align: right;
}

.ribbon span {
	font-size: 10px;
	font-weight: bold;
	color: #fff;
	text-transform: uppercase;
	text-align: center;
	line-height: 20px;
	transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
	width: 100px;
	display: block;
	background: #79a70a;
	background: linear-gradient(#2989d8 0%, #1e5799 100%);
	box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
	position: absolute;
	top: 19px;
	left: -21px;
}

.card {
	margin-top: 20px;
}

.card-img-top {
	object-fit: contain;
}

.description-text {
	white-space: pre-wrap;
	height: calc(25vh / 1.2);
}
</style>
