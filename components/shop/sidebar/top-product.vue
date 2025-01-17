<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-product">
      <div v-for="item in topRatedProducts" :key="item.product.id" class="tp-shop-widget-product-item d-flex align-items-center">
        <div class="tp-shop-widget-product-thumb">
          <nuxt-link :href="toolsService.getProductUrl(item.product)">
            <img :src="item.product.images[0]" alt="product-img" />
          </nuxt-link>
        </div>
        <div class="tp-shop-widget-product-content">
          <div
            class="tp-shop-widget-product-rating-wrapper d-flex align-items-center"
          >
            <div class="tp-shop-widget-product-rating">
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
            </div>
            <div class="tp-shop-widget-product-rating-number">
              <span>({{item.rating}})</span>
            </div>
          </div>
          <h4 class="tp-shop-widget-product-title">
            <nuxt-link :href="toolsService.getProductUrl(item.product)">{{ toolsService.parseProductName(item.product) }}</nuxt-link>
          </h4>
          <div class="tp-shop-widget-product-price-wrapper">
            <span class="tp-shop-widget-product-price">${{item.product.price.toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import product_data from "@/data/product-data";
import { type IProduct } from "@/types/product-d-t";
import toolsService from "@/services/toolsService";
import {useProductStore} from "@/pinia/useProductStore";

const productStore = useProductStore();
const {data: product_data} = useLazyAsyncData('product', () => productStore.loadProducts()
		.then((products: IProduct[]) => {
			if (products.value?.[0] && products.value?.[0]?.images?.length > 0) {
				productStore.activeImg = products.value?.[0]?.images?.[0];
			}

			return products.value;
		}), {
	initialData: productStore.product_data,
	watch: [productStore.product_data],
});

let topRatedProducts: { product: IProduct; rating: number }[] = product_data.value
  .map((product) => {
    if (product.reviews && product.reviews.length > 0) {
      const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / product.reviews.length;

      return {
        product,
        rating: parseFloat(averageRating.toFixed(1)),
      };
    }
    return undefined; // Return undefined for products with no reviews
  })
  .filter(
    (product): product is { product: IProduct; rating: number } =>
      product !== undefined
  );

if (topRatedProducts.length > 0) {
  topRatedProducts = topRatedProducts
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

</script>
