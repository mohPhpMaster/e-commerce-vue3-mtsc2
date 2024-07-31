<template>
  <div class="card h-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img class="card-img-top embed-responsive-item" :src="parseImageUrl(brand?.imageUrl)" alt="Brand Image">
    </div>

    <div class="card-body">

<!--      <p class="card-text font-italic">{{brand.description.substring(0,65)}}...</p>-->
      <router-link id="show-brand" :to="{ name: 'ShowBrand', params: { id : brand.slug } }">
        <h5 class="card-title">{{brand?.name}}</h5>
      </router-link>
    </div>
  </div>
</template>

<script>
import productParser from "@/utils/productParser";

export default {
	name: "BrandBox",
	mixins: [productParser],
	props: ["brand"],
	methods: {
	},
}
</script>

<style scoped>

.card {
	width: 20rem;
	height: 24rem;
}

.embed-responsive .card-img-top {
	object-fit: cover;
}

a {
	text-decoration: none;
}

.card-title {
	color: #484848;
	font-size: 1.1rem;
	font-weight: 400;
}

.card-title:hover {
	font-weight: bold;
}

.card-text {
	font-size: 0.9rem;
}

#edit-brand {
	float: right;
}
</style>
