<template>
  <div id="home">
		<Carousel :autoplay="2000" :wrap-around="true" class="site-carousel">
		  <Slide v-for="slide in slides" :key="slide">
		    <div class="carousel__item">
					<img :src="parseImageUrl(slide, '')" class="w-100 site-carousel">
		    </div>
		  </Slide>

		  <template #addons>
		      <Navigation />
		  </template>
		</Carousel>

	  <div id="start-shopping" class="block-container">
	    <div class="row">
	      <div v-for="index in this.featured_categories" :key="index" class="col-12 pt-3">
	        <FeaturedCategoryBox :category="index">
	        </FeaturedCategoryBox>
	      </div>
	    </div>
	  </div>

	  <FeaturedBrandBox :featured_brands="featured_brands" />
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from 'vue3-carousel'
import {mapGetters} from "vuex";

import productParser from "@/utils/productParser";
import ProductBox from "@/components/Product/ProductBox";
import CategoryBox from "@/components/Category/CategoryBox";
import FeaturedCategoryBox from "@/components/Category/FeaturedCategoryBox.vue";
import FeaturedBrandBox from "@/components/Brand/FeaturedBrandBox.vue";

export default {
	mixins: [productParser],
	name: 'Home',
	methods: {

	},
	components: {
		FeaturedBrandBox,
		FeaturedCategoryBox,
		ProductBox,
		CategoryBox,
		Carousel,
		Slide,
		Navigation,
	},
	props: ["products", "categories", "featured_categories", "featured_brands"],
	data() {
		return {
			someLocalProperty: null,
			// category_size:0,
			// product_size:0
		}
	},
	computed: {
		...mapGetters(['slides']),
	},
	mounted() {
		// this.category_size = this.categories.length;
		// this.category_size = Math.min(6, this.category_size);

		// this.product_size = this.products.length;
		// this.product_size = Math.min(8, this.product_size);
	}
}
</script>

<style>
  .page-holder {
	  min-height: 80vh;
  }

  .bg-cover {
	  background-size: cover !important;
  }

  #background-div {
	  background: url(../assets/home.jpg)
  }

  #heading {
	  text-decoration: none;
	  font-family: 'Roboto', sans-serif;
	  font-weight: 400;
	  opacity: 0.8;
	  font-family: 'Josefin Sans', sans-serif;
  }

  #content {
	  opacity: 0.8;
  }

  h2 {
	  font-family: 'Josefin Sans', sans-serif;
  }

  .block-container {
	  padding: calc(2.2rem - 0.4rem) 2.2rem 0;
  }

  .site-carousel {
	  height: 400px;
  }

  .carousel__item {
	  min-height: 400px;
	  width: 100%;
	  border-radius: 8px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
  }

  .carousel__slide {
	  padding: 10px;
  }

  .carousel__prev,
  .carousel__next {
	  box-sizing: content-box;
  }
</style>
