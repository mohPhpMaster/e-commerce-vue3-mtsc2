<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">{{ category?.name }}</h4>
                <span class="font-weight-light ">
	                {{ category_products?.length }} منتجات
                </span>
            </div>
        </div>

        <div class="row category-products-box">
            <div
		            v-for="(cproduct,index) in category_products"
		            :key="index"
		            class="col-3 py-3"
            >
		          <ProductBox :product="cproduct" />
		        </div>
        </div>
    </div>
</template>

<script>
    import CategoryBox from '@/components/Category/CategoryBox';
    import productParser from "@/utils/productParser";
    import {mapGetters} from "vuex";
    import ProductBox from "@/components/Product/ProductBox.vue";
    // import parseImageUrl from "@/utils/parseImageUrl";

    export default {
			mixins: [productParser],
	    name: 'Category',
	    components: {ProductBox, CategoryBox},
	    data() {
		    return {
			    current_category: null,
			    category_products: null,
		    }
	    },
	    props: ["products", "featured_categories", "featured_brands"],
	    methods: {
		    // parseImageUrl,

		    // async getCategories() {
			  //   if (!this.categories) {
				//     await this.$store.dispatch('fetchCategories');
			  //   }
		    // },

		    async loadCategory() {
			    if (this.id && (
					    !this.current_category ||
					    !this.category ||
					    !this.products
			    )) {
				    // let category = await this.$store.dispatch('fetchCategory', this.id);
				    // this.current_category = this?.category || this.categories?.find(c => c.slug == this.id) || category;
				    let {category,products} = await this.$store.dispatch('fetchCategoryProducts', this.id);
				    this.category_products = products;
				    this.current_category = category;
			    }
		    },

		    // async loadProduct() {
			  //   let forceFetch = false;
			  //   if (!this.product || String(this.product.slug).trim() !== this.id) {
				//     await this.$store.dispatch('fetchProduct', this.id);
				//     forceFetch = true;
			  //   }
		    // },
	    },
	    computed: {
		    ...mapGetters(['categories', 'product', 'category']),
		    id() {
			    return this.$route.params.id;
		    },
		    // category() {
		    //   return this.current_category || this.categories?.find(c => c.slug == this.id);
		    // },
	    },
	    mounted() {
		    this.loadCategory();
		    // this.getCategories();

	    },
	    watch: {
		    async id(n) {
			    await this.loadCategory();
			    this.current_category = this?.category || this.categories?.find(c => c.slug == this.slug)
		    },
	    },
    }
</script>

<style scoped>
    h4 {
	    font-family: 'Roboto', sans-serif;
	    color: #484848;
	    font-weight: 700;
    }
</style>
