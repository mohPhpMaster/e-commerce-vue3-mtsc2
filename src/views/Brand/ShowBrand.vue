<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">{{ brand?.name }}</h4>
                <span class="font-weight-light ">
	                {{ brand?.products?.length}} منتجات
                </span>
            </div>
        </div>
        <div class="row brand-products-box">
            <div v-for="(product,index) in brand?.products" :key="index" class="col-3 py-3">
		          <ProductBox :product="product">
		          </ProductBox>
		        </div>
        </div>
    </div>
</template>

<script>
    import BrandBox from '@/components/Brand/BrandBox';
    import productParser from "@/utils/productParser";
    import {mapGetters} from "vuex";
    import ProductBox from "@/components/Product/ProductBox.vue";

    export default {
	    name: 'ShowBrand',
	    mixins: [productParser],
	    components: {ProductBox, BrandBox},
	    data() {
		    return {
			    current_brand: null,
		    }
	    },
	    methods: {
		    async getBrands() {
			    if (!this.brands || !this.brands?.length) {
				    await this.$store.dispatch('fetchBrands');
			    }
		    },
	    },
	    computed: {
		    ...mapGetters(['brands']),
		    id() {
			    return this.$route.params.id;
		    },
		    brand() {
			    return this.current_brand || this.brands?.find(brand => brand.slug == this.id);
		    },
	    },
	    mounted() {
		    this.getBrands();
	    },
	    watch: {
		    async id(n) {
			    await this.getBrands();
			    this.current_brand = this.brands?.find(brand => brand.slug == this.id)
		    },
	    }
    }
</script>

<style scoped>
    h4 {
	    font-family: 'Roboto', sans-serif;
	    color: #484848;
	    font-weight: 700;
    }

    #add-brand {
	    float: right;
	    font-weight: 500;
    }
</style>
