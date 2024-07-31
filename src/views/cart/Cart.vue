<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">سلة التسوق</h3>
      </div>
    </div>
    <div v-for="cartItem in cart" :key="cartItem?.slug" class="row mt-2 pt-3 justify-content-around">
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <router-link :to="{ name: 'ShowProduct', params: { id : cartItem?.slug } }">
          <img v-if="cartItem.imageUrl" v-bind:src="cartItem.imageUrl" class="w-100 card-img-top embed-responsive-item">
          <img v-else :src="cartItem.imageUrl" class="w-100 card-img-top embed-responsive-item">
        </router-link>
      </div>
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title"><router-link :to="{ name: 'ShowProduct', params: { id : cartItem.slug } }">{{cartItem.name}} </router-link></h6>
          <p id="item-price" class="mb-0 font-weight-bold"><sup>{{ siteCurrency }}</sup> {{cartItem.price}}</p>
          <p id="item-quantity" class="mb-0">
            الكمية :
            <input size="1" class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0" v-model="cartItem.qty" /></p>
          <p id="item-total-price" class="mb-0">الاجمالي : <span class="font-weight-bold"> <sup>{{ siteCurrency }}</sup> {{cartItem.price*cartItem.qty}}</span></p>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr></div>
    </div>

    <div class="total-cost pt-2 text-right">
      <h5>الاجمالي : <sup>{{ siteCurrency }}</sup> {{cart_total}}</h5>
      <button :disabled="isDisabled()" type="button" class="btn btn-primary confirm"  @click="checkout">تاكيد الطلب</button>
    </div>
  </div>
</template>

<script>
// import parseImageUrl from "@/utils/productParser";
import swal from "sweetalert";
import {mapGetters} from "vuex";
import {removeProductFromCart} from "@/plugins/axios";
import productParser from "@/utils/productParser";

export default {
	name: 'Cart',
	mixins: [productParser],
	data() {
    return {
      token: null,
    }
  },
  props: [],
  methods: {
	  async removeFromCart(product) {
		  console.log(58, {product})

		  removeProductFromCart(product?.slug)
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
		  if (!this.cart || this.cart?.length === 0) {
			  await this.$store.dispatch('fetchCart');
		  }
	  },
     isDisabled(){
       return this.cart.length === 0;
     },
    // go to checkout page
    checkout(){
      this.$router.push({ name: 'Checkout'})
    },
  },
	computed: {
		...mapGetters(["cart", "cart_total","siteCurrency"]),
	},
  mounted() {
    this.token = localStorage.getItem("token");
	  this.loadData();
  },
	watch: {
		$route() {
			this.loadData()
		}
	}
};

</script>

<style scoped>
h4, h5 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}

#item-price {
  color: #232F3E;
}

#item-quantity{
  float: left;
}

#item-total-price {
  float: right;
}

.confirm {
  font-weight: bold;
  font-size: larger;
}

</style>
