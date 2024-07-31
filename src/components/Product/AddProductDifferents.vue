<template>
    <div class="col-12 h-100 pb-2 row">
        <div class="col-12">
          <div class="form-group d-flex align-items-center">
            <label class="mr-2 font-weight-bold" for="productSelect">المنتج:</label>
            <select id="productSelect" v-model="selectedProduct" class="form-control">
              <option
		              v-for="(product_different, index) in product_differents || []"
		              :key="index"
		              :value="product_different"
              >
                {{ parseProductName(product_different) }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-10 h-100 pr-1">
          <div class="card h-100 mt-0">
            <div class="card-body">
              <h5 class="card-title">{{ parseProductName(selectedProduct) }}</h5>
              <p class="card-text">{{ parseProductDescription(selectedProduct?.description) }}</p>
              <p class="card-text">
                <small class="text-muted">السعر: {{ siteCurrency }}{{ selectedProduct?.price }}</small>
              </p>
            </div>
          </div>
        </div>
        <div class="col-2 pl-1 h-100">
          <div v-if="selectedProduct" class="card h-100 mt-0">
            <img
		            :src="parseImageUrl(selectedProduct.imageUrl)"
		            alt="Product Image"
		            class="card-img-top h-100"
            >
          </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import productParser from "@/utils/productParser";

export default {
	name: "AddProductDifferents",
	mixins: [productParser],
	props: {
		productsCount: {
			type: Number,
			default: () => 4
		},
		select: {
			type: [Object, Number, null],
			default: () => null
		}
	},
	data() {
		return {
			selectedProduct: null
		};
	},
	methods: {
		async loadProductDifferents() {
			await this.$nextTick(async () => {
				await this.$store.dispatch('fetchProductDifferents', this?.product?.slug);
				this.selectedProduct = this.selectedProduct || this?.product_differents?.[0] || null;
			});
		}
	},
	mounted() {
		this.loadProductDifferents();
	},
	computed: {
		...mapGetters(['siteCurrency', 'product_differents', 'product']),
	},
	watch: {
		select(n, o) {
			if (!n && this.selectedProduct?.slug) {
				this.selectedProduct = null;
			} else if (!this.selectedProduct?.slug) {
				this.loadProductDifferents();
			}
		}
	}
}
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
</style>
