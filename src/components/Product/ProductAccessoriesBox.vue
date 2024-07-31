<template>
	<div class="m-0 p-0" :class="[`col-${col}`]" v-for="($product, index) in product_accessories || []" :key="index" :id="'product-accessory-container-' + index + $product?.slug" @click.prevent.stop="toggleCheckbox($event, $product)">
	    <input type="checkbox" :id="'product_accessory-' + index + $product?.slug" :value="$product" v-model="selectedProducts" :checked="isChecked($product)" class="hidden-checkbox">
	    <label
			    :for="'product_accessory-' + index + $product?.slug" class="checkbox-label btn alert text-left" :class="{
						'checked btn-secondary': isChecked($product),
						'alert-secondary alert-link': !isChecked($product),
						'required disabled': $product?.type === 'required',
			    }"
	    >
	      <span class="font-weight-bold pull-left product-accessory-name">{{ $product?.name }}</span>
	      <span class="pull-left m-0 mr-2 product-accessory-qty-price">{{ $product?.qty }}</span>
	      <span class="font-weight-bold pull-left m-0 mx-1 product-accessory-qty-price">&times;</span>
	      <span class="pull-left m-0 product-accessory-qty-price"><sup>{{ siteCurrency }}</sup>{{ $product?.price }}</span>
        <span class="font-weight-normal"><sup>{{ siteCurrency }}</sup>{{ Number($product?.price * Number($product?.qty || 1)).toFixed(2) }}</span>
	    </label>
	  </div>
</template>

<script>
import productParser from "@/utils/productParser";
import {mapGetters} from 'vuex';

export default {
	name: "ProductAccessoriesBox",
	mixins: [productParser],
	props: {
		product: {
			type: [Object, null],
			required: true
		},
		col: {
			type: Number,
			default: ()=>12
		}
	},
	data() {
		return {
			selectedProducts : []
		}
	},
	methods: {
		isChecked($product) {
			return this.selectedProducts.includes($product);
		},
		toggleCheckbox($event, $product) {
			if ($product.type === 'required')
			{
				$event.preventDefault();
				$event.stopPropagation();
				$event.stopImmediatePropagation();
				return;
			}

			const index = this.selectedProducts.indexOf($product);

			if (index === -1) {
				this.selectedProducts.push($product);
			} else {
				this.selectedProducts.splice(index, 1);
			}
		},
		async loadProductAccessories() {
			await this.$nextTick(async () => {
				if (!this.product_accessories && this?.product?.slug) {
					await this.$store.dispatch('fetchProductAccessories', this?.product?.slug);
				}

				this.selectedProducts = Array.from(this?.product_accessories || [])
			});
		}
	},
	mounted() {
		this.loadProductAccessories();
	},
	computed: {
		...mapGetters(['siteCurrency', "product_accessories"]),
	}
}
</script>

<style scoped>
.checkbox-label:not(.required) {
	cursor: pointer;
}
.checkbox-label {
	display: block;
	padding: 10px;
	/*border: 1px solid var(--primary);
	color: var(--primary);*/
	cursor: not-allowed;
	text-align: center;
}

/*.checkbox-label.checked {
	background-color: var(--primary);
	color: var(--light);
}

.checkbox-label:not(.required):hover {
	border: 1px solid var(--dark);
	background-color: var(--light);
	color: var(--dark);
}

.checkbox-label:not(.required).checked:hover {
	border: 1px solid var(--primary);
	background-color: var(--light);
	color: var(--primary);
}*/

.hidden-checkbox {
	display: none;
}

.product-accessory-name {
	font-size: medium;
}

.product-accessory-qty-price {
	font-size: small;
}/*
.checked .product-accessory-qty-price {
	color: var(--warning);
}*/
</style>
