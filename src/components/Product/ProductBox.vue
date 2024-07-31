<template>
  <div class=" card h-100 pointer" @click.prevent="productCardClicked($event)">
	  <div v-if="product?.label" class="ribbon"><span>{{ product?.label }}</span></div>
	  <div class="embed-responsive embed-responsive-16by9">
	    <img :src="parseImageUrl(product.imageUrl)" alt="Product Image" class="card-img-top embed-responsive-item">
	  </div>
	  <div class="card-body">
	    <div class="item-wrapper">
	      <div class="item-rating pull-right">
	        <div class="badge badge-primary badge-md">
	          {{ product.rating }}
	          <template v-if="Number(product?.rating)">
	            <i v-for="star in Number(product?.rating)" :key="star" class="fa fa-star"></i>
	          </template>
	          <template v-else>
	            <i class="fa fa-star-o"></i>
	          </template>
	        </div>
	      </div>
	      <div class="item-price pull-left">
	        <h6 class="item-price"><sup>{{ siteCurrency }}</sup>{{ product.price }}</h6>
          <h6
		          v-if="product?.price_after_discount ?? 0"
		          class="category font-italic old text-left"
          ><sup>{{ siteCurrency }}</sup>{{ product?.price_after_discount }}</h6>

	      </div>
	    </div>
	    <h5 class="card-title">{{ product.name }}</h5>
	    <div v-if="product?.brand_slug || false" class="card-subtitle text-muted">
	      <router-link :to="{ name: 'ShowBrand', params: { id: product?.brand_slug } }">{{ product?.brand }}</router-link>
	    </div>

	    <div class="card-text font-italic">
	      <p>{{ parseProductDescription(product?.description) }}</p>
	    </div>
	    <div class="card-footer item-options p-0 d-flex">
	      <span
			      :class="{
					'btn-danger' : !EmitOnAddToFavorites,
					'btn-outline-danger' : EmitOnAddToFavorites
				}"
			      :title="EmitOnAddToFavorites ? 'حذف من المفضلة' : 'اضف ألى المفضلة'"
			      class="btn"
			      @click.stop="addToFavorites($event)"
	      >
	        <i class="fa fa-heart align-middle"></i>
	      </span>
	      <span
			      class="btn btn-outline-secondary btn-compare w-100"
			      title="مقارنة"
			      @click.stop="compareProduct($event,product)"
	      >
	        <i class="fa fa-retweet align-middle"></i>
	      </span>
	      <span
			      class="btn"
			      :class="{
					'btn-primary' : !EmitOnAddToCart,
					'btn-outline-primary' : EmitOnAddToCart
				}"
			      :title="EmitOnAddToCart ? 'حذف من السلة' : 'اضف ألى السلة'"
			      @click.stop="addToCart($event)"
	      >
	        <i class="fa fa-shopping-cart"></i>
	      </span>
	    </div>
	  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import productParser from "@/utils/productParser";
import {addProductToCart, addProductToWishlist} from "@/plugins/axios";
import swal from "sweetalert";

export default {
	name: "ProductBox",
	mixins: [productParser],
	props: {
		product: Object,
		qty: {
			type: Number,
			default: ()=> 1
		},
		EmitOnAddToFavorites: {
			type: Boolean,
			default: false
		},
		EmitOnAddToCart: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},
	methods: {
		productCardClicked(event) {
			this.$router.push({name: 'ShowProduct', params: {id: this.product.slug}})
		},
		async addToCart(event) {
			if (this.EmitOnAddToCart) {
				this.$emit('addToCart', this.product, this.qty);
				return;
			}

			if (!this.cart_modal_status) {
				this.$store.dispatch('openCart', {
					product: this.product,
					qty: this.qty
				})
			}
		},
		// add to wishlist
		async addToFavorites() {
			if (this.EmitOnAddToFavorites) {
				this.$emit('addToFavorites', this.product);
				return;
			}

			try {
				const response = await addProductToWishlist(this.product?.slug);

				swal({
					text: "تمت اضافة المنتج بنجاح",
					icon: "success"
				});
			} catch (error) {
				console.error('Error submitting review:', error);

				swal({
					text: "حصل خطا غير متوقع!",
					icon: "error",
					closeOnClickOutside: false,
				});
			}
		},
		compareProduct(event, product) {
			this.$store.dispatch('compareProduct', product);
			console.log("product added to compare", this.product.slug);
		}
	},
	mounted() {

	},
	computed: {
		...mapGetters(['siteCurrency', "cart_modal_status"]),
	}
}
</script>

<style scoped>

.embed-responsive .card-img-top {
	object-fit: cover;
}

.btn-compare {
	display: flow;
}


.card-title1 {
	color: #484848;
	font-size: 1.1rem;
	font-weight: 400;
}

.card-text1:hover {
	font-weight: 500;
}

.card-text1 {
	font-size: 0.9rem;
}

#edit-product {
	float: right;
}
</style>
