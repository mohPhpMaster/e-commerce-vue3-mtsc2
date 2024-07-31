<template>
	<div class="features row">
	    <h5 class="py-2"><strong>منتجات ذات صلة</strong></h5>
	    <div class="col-12 p-0 m-0">
        <div class="row related-products-box">
            <div
		            v-for="(cproduct,index) in related_products"
		            :key="index"
		            class="py-3"
		            :class=[columnClass(productsCount)]
            >
		          <ProductBox :product="cproduct" />
		        </div>
        </div>
	    </div>
	</div>
</template>
<script>
import ProductBox from "@/components/Product/ProductBox.vue";
import {getRelatedProducts} from "@/plugins/axios";
import mixins from "@/utils/mixins";

export default {
	name: 'RelatedProductsBlock',
	components: {ProductBox},
	mixins: [mixins],
	props: {
		product: {
			type: [Object, null],
			required: true
		},
		productsCount: {
			type: Number,
			default: ()=> 4
		}
	},
	data() {
		return {
			related_products: null,
		}
	},
	methods: {
		async loadData() {
			if (this.id) {
				return getRelatedProducts(this.id)
						.then(res => {
							this.related_products = res;
						});
			}

			return null;
		}
	},
	mounted() {
		// this.$nextTick(() => {
		// })
	},
	computed: {},
	watch: {}
}
</script>


<style scoped>
</style>