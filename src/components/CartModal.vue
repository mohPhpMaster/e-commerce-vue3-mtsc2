<template>
	<div :id="id" class="modal fade " onclose="close()" role="dialog" tabindex="-1">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">

	      <!-- CartModal Header -->
	      <div class="modal-header">
	        <h4 class="modal-title">{{ parsedTitle }}</h4>
	        <button class="close" data-dismiss="modal" type="button">&times;</button>
	      </div>

		    <!-- CartModal body -->
	      <div class="modal-body">
		      <div class="pb-2 product-differents-block">
            <AddProductDifferents
		            :product="product"
		            :productsCount="cart_different_products_count"
		            :select="product_differents_value"
		            @updated="setProductDifferents"
            ></AddProductDifferents>
		      </div>

		      <div class="pt-2">
				    <AddProductAccessories
						    :product="product"
						    :productsCount="cart_accessory_products_count"
						    :select="product_accessories_value"
						    @updated="setProductAccessories"
				    />
		      </div>
	      </div>

		    <!-- CartModal footer -->
	      <div class="modal-footer ">
          <div class="input-group justify-content-start">
                  <div class="input-group-prepend">
                      <span id="basic-addon1" class="input-group-text">الكمية</span>
                  </div>
			            <div class="input-group-prepend">
			              <button class="btn btn-outline-secondary" type="button" @click="$store.dispatch('decrementCartQty')">
			                <i class="fa fa-minus"></i>
			              </button>
			            </div>

			            <input
					            :value="cart_modal_qty"
					            class="input-qty form-control text-center border-secondary"
					            size="2"
					            min="1"
					            type="number"
			            />

                  <div class="input-group-append">
			              <button class="btn btn-outline-secondary" type="button" @click="$store.dispatch('incrementCartQty')">
			                <i class="fa fa-plus"></i>
			              </button>
                  </div>
            </div>

	        <button class="btn btn-primary" data-dismiss="modal" type="button" @click.prevent="commitProductToCart">اضافة الى السلة</button>
	        <button class="btn btn-danger" data-dismiss="modal" type="button">الغاء</button>
	      </div>

	    </div>
	  </div>
	</div>
</template>

<script>
import AddProductDifferents from "@/components/Product/AddProductDifferents.vue";
import AddProductAccessories from "@/components/Product/AddProductAccessories.vue";
import productParser from "@/utils/productParser";
import {mapGetters} from "vuex";
import swal from 'sweetalert';

export default {
	name: "CartModal",
	mixins: [productParser],
	components: {AddProductAccessories, AddProductDifferents},
	props: {
		title: {
			type: String,
			default: () => "CartModal"
		},
		id: {
			type: String,
			required: true
		},
		cart_different_products_count: {
			type: Number,
			default: () => 4
		},
		cart_accessory_products_count: {
			type: Number,
			default: () => 4
		},
	},
	data() {
		return {
			modal_status: false,
			product_differents_value: null,
			product_accessories_value: null
		}
	},
	computed: {
		...mapGetters(["cart_modal_status", "cart_modal_qty", "product_differents","product"]),
		parsedTitle() {
			// return this.parseProductName(this.product_differents_value) ||
				return this.title;
		},
		modalElement() {
			return window.$(`#${this.id}`);
		},
	},
	methods: {
		incrementQty() {
			this.$store.dispatch('incrementCartQty')
		},
		decrementQty() {
			this.$store.dispatch('decrementCartQty')
		},
		modal(...args) {
			return this.modalElement.modal(...args);
		},
		close() {
			this.modal_status = false;

			if (this.cart_modal_status) {
				this.$store.dispatch('closeCart')
			}

			this.modal({
				backdrop: false,
				keyboard: true,
				focus: false,
				show: false,
			});
		},
		async open() {
			await this.$store.dispatch('fetchProductAccessoriesGroups', this?.product?.slug);
			await this.$store.dispatch('fetchProductDifferents', this?.product?.slug);

			this.modal_status = true;

			if (!this.cart_modal_status) {
				this.$store.dispatch('openCart')
			}

			this.modal({
				backdrop: 'static',
				keyboard: false,
				focus: true,
				show: true,
			});
		},
		commitProductToCart() {
			if (!this.product_differents_value) {
				swal('خطأ', 'يجب تحديد المنتجات', 'error');

				return;
			}

			this.$emit('selected', {
				differents: this.product_differents_value,
				accessories: this.product_accessories_value,
				qty: this.cart_modal_qty
			})

			this.$store.commit("SET_CART_MODAL_QTY", 1);
		},
		async checkModal() {
			await this.$nextTick(async () => {
				if (this.cart_modal_status) {
					this.modal_status || this.open();
				} else {
					this.modal_status && this.close();
				}
			})
		},
		setProductDifferents(value) {
			this.product_differents_value = value
		},
		setProductAccessories(value) {
			this.product_accessories_value = value
		}
	},
	async mounted() {
		await this.checkModal();
		this.modalElement
				?.on('hidden.bs.modal', (e) => {
					if (this.cart_modal_status) {
						this.$store.dispatch('closeCart')
					}
					this.$emit('closed');
					this.setProductDifferents(null);
					this.setProductAccessories(null);
				})
				?.on('shown.bs.modal', (e) => {
					if (!this.cart_modal_status) {
						this.$store.dispatch('openCart');
					}

					this.$emit('opened');

					this.setProductDifferents(this?.product_differents?.[0] || null);
					this.setProductAccessories(null);
				});

		// this.$nextTick(() => {
		// 	window.$(function () {
		// 		window.$('[data-toggle="tooltip"]').tooltip()
		// 	});
		// })
	},
	unmounted() {
		this.modalElement
				?.off('hidden.bs.modal')
				?.off('shown.bs.modal');
	},
	watch: {
		async cart_modal_status(n, o) {
			await this.checkModal();
		}
	}
}
</script>

<style>
.modal-dialog {
	max-width: 99%;
}
.product-differents-block {
	max-height: 25vh;
	height: 25vh;
}
</style>