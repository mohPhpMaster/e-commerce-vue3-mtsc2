<template>
      <div class="category-box row">
        <div class="col-12 bg-secondary text-white p-2 pointer" @click.prevent="$router.push({name : 'ShowCategory', params : {id : category.slug} })">
          <span class="m-auto pull-right font-weight-bold">{{ category?.name }}</span>
          <span class="pull-left">
			          <button class="btn btn-primary">المزيد</button>
          </span>
        </div>
				<div class="table-responsive text-nowrap">
		      <div class="d-flex justify-content-start">
		        <div v-for="index in this.category?.products" :key="index" class="col-xl-3 col-lg-4 col-md-6 col-sm-12 py-3">
		          <ProductBox :product="index" />
		        </div>
		      </div>
				</div>
      </div>
</template>

<script>
import productParser from "@/utils/productParser";
import ProductBox from "@/components/Product/ProductBox.vue";

export default {
	name: "FeaturedCategoryBox",
	mixins: [productParser],
	components: {ProductBox},
	props: ["category"],
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