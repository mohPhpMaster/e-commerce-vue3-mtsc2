<template>
  <div
		  v-if="product && product?.id"
		  :class="{
		'tp-product-different-selected': current?.id === product?.id,
		// 'pointer': current !== toolsService.parseProductDifferent(product)
  }" class="tp-product-different-item-5 d-flex align-items-center" @click="emit('clicked', product)"
  >
    <div class="tp-product-different-thumb-5 fix">
        <img :alt="toolsService.parseProductDifferent(product)" :src="product?.images[0]">
    </div>
    <div class="tp-product-different-content-5">
        <h4 class="tp-product-different-title-5">
          {{ toolsService.parseProductDifferent(product) }}
        </h4>
        <div class="tp-product-different-price-wrapper-5">
          <span class="tp-product-different-price-5">
            {{ currency(product?.net) }}
          </span>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {IProduct} from '@/types/product-d-t';
import toolsService from "@/services/toolsService";

const route = useRoute();
const currency = useSiteSettings().currency;
const emit = defineEmits(['clicked'])

const props = defineProps<{ product: IProduct, current: IProduct }>()

const checkQuery = () => {
	if (route.query?.different) {
		if (Number(props.product.id) === Number(route.query?.different) && Number(props.current?.id) !== Number(route.query?.different)) {
			console.log(37, Number(props.product?.id), Number(route.query?.different), Number(props.current?.id))
			emit('clicked', props.product)
		}
	}
}

onMounted(checkQuery);
watch(
	() => route.query,
	(newStatus, oldStatus) => {
		checkQuery()
	}
)
</script>
