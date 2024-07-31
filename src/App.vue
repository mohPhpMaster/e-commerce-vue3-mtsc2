<template>
  <div id="apps">
    <div id="nav">
      <Navbar />
    </div>

	  <CartModal
			  id="addToCartModal"
			  :cart_accessory_products_count="cart_accessory_products_count"
			  :cart_different_products_count="cart_different_products_count"
			  title="اختر منتج"
			  @selected="addToCart($event)"
	  ></CartModal>

    <div style="min-height: 60vh">
      <router-view
		      :baseURL="baseURL"
		      :products="products"
		      :categories="categories"
		      :featured_brands="featured_brands"
		      :featured_categories="featured_categories"
		      @fetchData="fetchData"
      >
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
/* eslint-disable no-mixed-spaces-and-tabs */
import axios from '@/plugins/axios';
// const axios = require('axios');
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import store from "@/store";
import {mapGetters} from "vuex";
import CartModal from "@/components/CartModal.vue";
import swal from "sweetalert";

export default {
  data() {
    return {
      // baseURL : "https://mobark.mtsc.tech/api/",
      baseURL : process.env.VUE_APP_BASE_URL,
      products : null,
	    featured_brands : null,
	    cart_different_products_count: 4,
	    cart_accessory_products_count: 4,
    }
  },
  components : {CartModal, Navbar, Footer},
  methods : {
    async fetchData() {
      // fetch products
      // this.products = require("../api/products.json").data;
			// this.featured_categories = require("../api/featured_categories.json").data;
			this.featured_brands = require("../api/featured_brands.json").data;
	    // this.categories = require("../api/categories.json").data;
	    this.$store.dispatch('fetchFeaturedCategories');
	    this.$store.dispatch('fetchSiteSettings');
	    this.$store.dispatch('fetchMenus');
	    this.$store.dispatch('fetchSlides');
	    this.$store.dispatch('fetchCategories');
	    this.$store.dispatch('fetchBrands');
      // axios.get("products")
      //         .then(res => {
			// 					try {
			// 						this.products = Array.isArray(res?.data?.data) ? res?.data?.data : Object.values(res.data.data);
			// 					} catch (error) {
			// 						this.products = res?.data?.data;
			// 						console.error(error);
			// 					}
      //         })
      //         .catch(err => console.error(err))
    },

	  addToCart(cart) {
		  console.log(79, 'addToCart', cart)
		  // todo: continue coding
		  if (this.cart_modal_status) {
			  this.$store.dispatch('closeCart')
		  }

		  swal({
			  text: "تمت الاضافة بالسلة",
			  icon: "success",
			  buttons: false,
			  closeOnClickOutside: true,
			  closeOnEsc: true,
			  timer: 1000,
		  });
	  }
  },
	computed: {
		...mapGetters(['categories','brands','featured_categories']),
	},
  mounted() {
    this.fetchData();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  /*color: #2c3e50;*/
}

#nav a.router-link-exact-active {
  color: var(--primary);
}
</style>
