<template>
	<div class="">
		<div class="py-5">
	      <div class="row">
	          <div class="col-12 text-center">
	              <h2 class="content-header-title float-center mb-0">تصفح بالماركة</h2>
	          </div>
	      </div>
	  </div>

	  <div class="row text-center">
	    <div v-for="(brand, index) in featured_brands" :key="index" class="col-12 col-md-4 mb-4 mb-md-0 pointer">
				<div class="w-75 mx-auto" @click.prevent="$router.push({name : 'ShowBrand', params : {id : brand.slug} })">
				    <img :alt="brand?.name" :src="parseImageUrl(brand?.imageUrl)" class="" width="180" height="180">
				    <h5 class="py-2">{{ brand?.name }}</h5>
				</div>
	    </div>
	  </div>

	</div>
</template>

<script>
import productParser from "@/utils/productParser";
import ProductBox from "@/components/Product/ProductBox.vue";

export default {
	name: "FeaturedBrandBox",
	mixins: [productParser],
	components: {ProductBox},
	props: ["featured_brands"],
	methods: {
	},
	mounted() {

	},
	data() {
		return {
			placeholderImg: 'https://via.placeholder.com/300x200',
			domeImg: 'https://www.pngitem.com/pimgs/m/484-4847451_dome-of-the-rock-clipart-transparent-png-free.png',
		};
	},
};
</script>

<style scoped>
.container {
	margin-top: 20px;
}

.card {
	margin-bottom: 20px;
}

.card-img-top {
	height: 200px;
	object-fit: cover;
}

.price {
	font-weight: bold;
}
</style>