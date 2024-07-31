<template>
	<div class="features row">
	    <h5 class="py-2"><strong>منتجات اخرى</strong></h5>
	    <div class="col-12 p-0 m-0">
        <div class="row similar-products-box">
            <div
		            v-for="(cproduct,index) in similar_products"
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
import {getSimilarProducts} from "@/plugins/axios";
import mixins from "@/utils/mixins";

export default {
	name: 'SimilarProductsBlock',
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
			similar_products: null,
		}
	},
	methods: {
		async loadData() {
			if (this.id) {
				return getSimilarProducts(this.id)
						.then(res => {
							this.similar_products = res;
						});
			}

			return null;
		}
	},
	mounted() {
	},
	computed: {
	},
	watch: {
	}
}
</script>


<style scoped>
.similar-product-name {
	font-size: medium;
}
</style>