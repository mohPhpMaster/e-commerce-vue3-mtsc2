<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">قائمة التفضيل</h4>
            </div>
        </div>

        <div class="row">
            <div v-for="product of wishlist || []" :key="product.slug" class="col-md-6 col-lg-3 col-12 pt-3">
                <ProductBox
		                :product="product"
		                EmitOnAddToFavorites
		                @addToFavorites="removeFromFavorites"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProductBox from '@/components/Product/ProductBox';
import {mapGetters} from "vuex";
import {removeProductFromWishlist} from "@/plugins/axios";
import swal from "sweetalert";

export default {
	name: 'WishList',
	data() {
		return {
			token: null
		}
	},
	components: {ProductBox},
	props: [],
	methods: {
		async removeFromFavorites(product) {
			console.log(35, 'removeFromFavorites',{product})

			removeProductFromWishlist(product?.slug)
					.then((response) => {
						swal({
							text: "تمت ازالة المنتج بنجاح",
							icon: "success"
						});

						this.loadData();
					})
					.catch((error) => {
						console.error('Error response:', error)
						swal({
							text: "حصل خطا غير متوقع!",
							icon: "error",
							closeOnClickOutside: false,
						});
					});
		},
		async loadData() {
			// todo: what is this.id ??
			if (!this.wishlist || String(this.wishlist.slug).trim() !== this.id) {
				await this.$store.dispatch('fetchWishlist');
			}
		},
	},
	computed: {
		...mapGetters(["wishlist", "siteCurrency"]),
	},
	mounted() {
		this.token = localStorage.getItem('token');
		this.loadData();
	},
	watch: {
		$route() {
			this.loadData()
		}
	}
}
</script>

<style scoped>
    h4 {
	    font-family: 'Roboto', sans-serif;
	    color: #484848;
	    font-weight: 700;
    }
</style>
