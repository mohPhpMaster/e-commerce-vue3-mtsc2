<template>
  <div class="tp-product-details-wrapper has-sticky">
    <div v-if="product?.parentCategory" class="tp-product-details-category">
      <span>{{ toolsService.parseCategoryName(product?.parentCategory) }}</span>
    </div>
    <h3 class="tp-product-details-title">{{ toolsService.parseProductName(product) }}</h3>

    <!-- inventory details -->
    <div class="tp-product-details-inventory d-flex align-items-center mb-10">
      <div class="tp-product-details-stock mb-10">
          <span>{{ product?.quantity === 0 ? $t('Out of Stock') : $t('In Stock') }}</span>
      </div>
      <div class="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div class="tp-product-details-rating">
						<product-rating :product="product" />
          </div>
          <div class="tp-product-details-reviews">
            <span>{{ $t(':count Reviews', { count: product?.reviews?.length || 0}) }}</span>
          </div>
      </div>
    </div>
	  <p>
		  <p v-html="product_description"></p>
		  <span @click="textMore = !textMore">{{ textMore ? $t('See less') : $t('See more') }}</span>
	  </p>
	  <!--    <p >{{ textMore ? product.description : `${product.description.substring(0, 100)}...` }} <span @click="textMore = !textMore">{{textMore ? 'See less' : 'See more'}}</span></p>-->

    <!-- price -->
    <div class="tp-product-details-price-wrapper mb-20">
      <div v-if="product?.discount">
        <span class="tp-product-details-price new-price">{{ currency(product?.net) }} {{ " " }}</span>
        <span class="tp-product-details-price old-price">
          {{ currency(product?.price) }}
        </span>
      </div>
      <span v-else class="tp-product-details-price new-price">{{ currency(product?.price) }}</span>
   </div>

  <!-- product countdown start -->
  <div v-if="product?.offerDate?.endDate">
    <product-details-countdown :product="product"/>
  </div>
  <!-- product countdown end -->

    <!-- actions -->
    <div class="tp-product-details-action-wrapper">
      <h3 class="tp-product-details-action-title">{{ $t("Quantity") }}</h3>
      <div class="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <div class="tp-product-details-quantity">
            <div class="tp-product-quantity mb-15 mr-15">
                <span class="tp-cart-minus" @click.stop.prevent="cartStore.decrement">
                  <svg-minus/>
                </span>
                <input class="tp-cart-input" type="text" :value="cartStore.orderQuantity" readonly>
                <span class="tp-cart-plus" @click.stop.prevent="cartStore.increment">
                  <svg-plus-sm/>
                </span>
            </div>
          </div>
          <div class="tp-product-details-add-to-cart mb-15 w-100">
            <button
		            data-bs-dismiss="modal"
		            @click="openCartProduct(product)" class="tp-product-details-add-to-cart-btn w-100">{{ $t("Add To Cart") }}</button>
          </div>
      </div>
<!--      <nuxt-link @click="cartStore.openCartProduct(product)" :href="'/cart'" class="tp-product-details-buy-now-btn w-100 text-center">{{ $t("Buy Now") }}</nuxt-link>-->
    </div>

    <div v-if="isShowBottom">
      <div class="tp-product-details-query">
      <div v-if="product?.tags?.length" class="tp-product-details-query-item d-flex align-items-center">
          <span>{{ $t("Tags:") }}  </span>
          <p v-for="tag in product?.tags" :key="tag">{{ tag }}</p>
      </div>
      <div v-if="product?.parentCategory" class="tp-product-details-query-item d-flex align-items-center">
          <span>{{ $t("Category:") }}  </span>
          <p>{{ toolsService.parseCategoryName(product?.parentCategory) }}</p>
      </div>
    </div>
    <div class="tp-product-details-social">
      <span>{{ $t("Share:") }}  </span>
      <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="#"><i class="fa-brands fa-twitter"></i></a>
      <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
      <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>
    </div>
    <div class="tp-product-details-msg mb-15">
      <ul>
          <li>{{ $t("30 days easy returns") }}</li>
          <li>{{ $t("Order yours before 2.30pm for same day dispatch") }}</li>
      </ul>
    </div>
    <div class="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
      <p v-html="toolsService.normalizeLineEndingsToHtml($t('Guaranteed safe & secure checkout'))" />
      <img src="/images/product/icons/payment-option.png" alt="">
    </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { type IProduct } from '@/types/product-d-t';
import { useCartStore } from "@/pinia/useCartStore";
import toolsService from "@/services/toolsService";
import {useUtilityStore} from "@/pinia/useUtilityStore";

const currency = useUtilityStore()?.currency;
// import { useCompareStore } from "@/pinia/useCompareStore";
// import { useWishlistStore } from "@/pinia/useWishlistStore";

// store
// const compareStore = useCompareStore();
// const wishlistStore = useWishlistStore();
// const productStore = useProductStore();
const cartStore = useCartStore();
let textMore = ref<boolean>(false)

const props = withDefaults(defineProps<{product:IProduct;isShowBottom?:boolean}>(), {
  isShowBottom:true,
})

const product_description = computed(function () {
	return toolsService.normalizeLineEndingsToHtml(textMore.value ? props.product?.description : `${props.product?.description.substring(0, 100)}...`);
});

const openCartProduct = (product: IProduct) => {
	cartStore.openCartProduct(product)
}

</script>
