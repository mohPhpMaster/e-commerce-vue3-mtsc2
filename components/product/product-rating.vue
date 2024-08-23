<template>
	<span v-for="(star, index) in 5" :key="index" :title="product_rating_label">
	  <i v-if="index < product_rating" class="fa-solid fa-star" @click="starClicked(index)"></i>
	  <i v-else class="fa-regular fa-star" @click="starClicked(index)"></i>
	</span>
</template>

<script lang="ts" setup>
import type {IProduct} from "@/types/product-d-t";

const emit = defineEmits(['clicked'])

const props = defineProps<{
	product?: IProduct,
	rating?: number | string,
	title?: string,
}>()

const product_rating = computed(() => Number(props?.rating || props?.product?.rating || 0) || 0)
const product_rating_label = computed(() => props?.title || `${product_rating.value} / 5`);
const starClicked = (i) => {
	emit('clicked', i)
};
</script>
