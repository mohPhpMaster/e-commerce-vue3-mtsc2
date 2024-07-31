<template>
  <div class="container text-left">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <div class="col-md-4 col-12 card h-100">
	      <div v-if="product?.label" class="ribbon">
	        <span>{{ product?.label }}</span>
        </div>
        <img :alt="product?.name" :src="parseImageUrl(product?.imageUrl, '')" class="img-fluid" />
      </div>

      <div class="col-md-6 col-12 pt-3 pt-md-0">
          <h4 class="card-title py-2 product-name">{{ product_name }}

		      <div class="item-rating pull-left">
		        <p class="badge badge-primary badge-md">
		          {{ product?.rating }}
		          <template v-if="Number(product?.rating)">
		            <i v-for="star in Number(product?.rating)" :key="star" class="fa fa-star"></i>
		          </template>
		          <template v-else>
		            <i class="fa fa-star-o"></i>
		          </template>
		        </p>
		      </div>
          </h4>

          <div v-if="product?.brand_slug" class="card-subtitle py-2">
			      <router-link class="font-weight-bold text-primary" :to="{ name: 'ShowBrand', params: { id: product?.brand_slug } }">{{ product?.brand }}</router-link>
			    </div>

	        <h6 v-if="product?.price_after_discount" class="font-italic old text-left">
	          <sup>{{ siteCurrency }}</sup>{{ product?.price }}
	        </h6>

          <h6 class="category text-left"><sup>{{ siteCurrency }}</sup>{{ product?.price_after_discount || product?.price }}</h6>

          <p class="description text-muted">{{ product?.description }}</p>

          <div class="d-flex flex-row justify-content-end align-items-center">
              <div class="input-group justify-content-start ">
                  <div class="input-group-prepend">
                      <label for="product-qty" id="product-qty-label" class="input-group-text">الكمية</label>
                  </div>
			            <div class="input-group-prepend">
			              <button class="btn btn-outline-secondary" type="button" @click="decrementQty">
			                <i class="fa fa-minus"></i>
			              </button>
			            </div>

			            <input id="product-qty" v-model="qty" class="input-qty form-control text-center border-secondary" size="2" min="1" type="number" />

                  <div class="input-group-append">
			              <button class="btn btn-outline-secondary" type="button" @click="incrementQty">
			                <i class="fa fa-plus"></i>
			              </button>
                  </div>
              </div>

              <div class="input-group justify-content-end ">
                  <div class="input-group-prepend">
                    <button id="add-to-cart-button" class="btn btn-outline-primary btn-lg px-4" title="اضف ألى السلة" type="button" @click.prevent="openAddToCart()">
                        <span class="fa fa-shopping-cart"></span>
                    </button>
                  </div>
                  <div class="input-group-append">
		                <button
				                id="wishlist-button"
				                class="btn btn-outline-danger btn-lg px-4"
				                title="اضافة الى المفضلة"
				                type="button"
				                @click="addToFavorites()"
		                >
		                  <span class="fa fa-heart"></span>
		                </button>
                  </div>
              </div>
          </div>
      </div>

      <div v-if="0" class="col-md-12 col-12 p-0 pt-2">
            <ProductAccessoriesBlock :product="product" />
      </div>

      <div class="col-md-12 col-12 p-0 pt-2">
            <RelatedProductsBlock :product="product" :productsCount="relatedProductsCount" />
      </div>

      <div class="col-md-12 col-12 p-0 pt-2">
            <SimilarProductsBlock :product="product" :productsCount="similarProductsCount" />
      </div>
    </div>

    <div class="row pt-5">
	        <ReviewsBlock :product="product" />
    </div>
  </div>
</template>

<script>
import {addProductToWishlist} from '@/plugins/axios';
import swal from 'sweetalert';
import {mapGetters} from "vuex";
import ProductAccessoriesBlock from "@/components/Product/ProductAccessoriesBlock.vue";
import productParser from "@/utils/productParser";
import RelatedProductsBlock from "@/components/Product/RelatedProductsBlock.vue";
import SimilarProductsBlock from "@/components/Product/SimilarProductsBlock.vue";
import ReviewsBlock from "@/components/Review/ReviewsBlock.vue";

export default {
	name: "ShowProduct",
	mixins: [productParser],
	data() {
		return {
			qty: 1,
			relatedProductsCount: 4,
			similarProductsCount: 3,
		};
	},
	props: {
	},
	components: {
		ReviewsBlock,
		RelatedProductsBlock,
		ProductAccessoriesBlock,
		SimilarProductsBlock,
	},
	methods: {
		incrementQty() {
			this.qty++;
		},
		decrementQty() {
			if (this.qty > 1) {
				this.qty--;
			}
		},
		async loadProduct() {
			let forceFetch = false;
			if (!this.product || String(this.product?.slug).trim() !== this.id) {
				await this.$store.dispatch('fetchProduct', this.id);

				forceFetch = true;
			}
		},
		// add to wishlist
		async addToFavorites() {
			try {
				await addProductToWishlist(this.product?.slug);

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

		// add to cart function
		openAddToCart() {
			if (!this.cart_modal_status) {
				this.$store.dispatch('openCart', {
					product: this.product,
					qty: this.qty
				});
			}

			// post productId and qty
			// axios.post(`cart/add?token=${this.token}`, {
			// 	productId: productId,
			// 	qty: this.qty
			// }).then((response) => {
			// 	// success
			// 	if (response.status == 201) {
			// 		swal({
			// 			text: "Product Added to the cart!",
			// 			icon: "success",
			// 			closeOnClickOutside: false,
			// 		});
			// 	}
			// }, (error) => {
			// 	// error handling
			// 	console.log(error)
			// 	swal({
			// 		text: "Something wrong with add to cart",
			// 		icon: "error",
			// 		closeOnClickOutside: false,
			// 	});
			// });
		},
	},
	computed: {
		...mapGetters(["siteCurrency", "product", "cart_modal_status"]),

		product_name() {
			return this.parseProductName(this.product);
		},
		id() {
			return String(this.$route.params.id).trim();
		},
	},
	mounted() {
		this.loadProduct()
	},
	watch: {
		$route() {
			this.loadProduct()
		}
	}
}
</script>

<style>
.category {
	font-weight: 500;
	margin-top: 5px;
	font-size: 28px;
}

.description {
	min-height: 180px;
}

.old {
	text-decoration: line-through;
	font-size: 14px;
	color: var(--secondary);
	font-weight: 500;
	margin-top: 5px;
	margin-bottom: -5px;
}
.product-name {
	font-size: 32px;
	font-weight: 600;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.btn-outline-secondary {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
}

.btn-outline-primary,
.btn-outline-danger {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
}

.input-group-text {
	padding: 0.5rem 1rem;
}

.input-group-prepend .btn,
.input-group-append .btn {
	margin: 0;
}

.input-qty {
	max-width: 48px !important;
}
.item-rating {
	font-size: medium;
}
</style>