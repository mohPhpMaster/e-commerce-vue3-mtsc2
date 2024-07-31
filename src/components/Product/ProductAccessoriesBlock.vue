<template>
	<div class="features">
	    <h5 class="py-2"><strong>يحتاج الى</strong></h5>
	    <div class="row p-0 m-0" :class="[`col-${col}`]">
	      <ProductAccessoriesBox v-bind="$props"></ProductAccessoriesBox>
	    </div>
	</div>
</template>
<script>
import ProductAccessoriesBox from '@/components/Product/ProductAccessoriesBox'

export default {
	name: 'ProductAccessoriesBlock',
	components: {ProductAccessoriesBox},
	props: {
		product: {
			type: [Object, null],
			required: true
		},
		col: {
			type: Number,
			default: () => 12
		}
	}
}
</script>

<style>
</style>