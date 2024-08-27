<template>
  <section class="tp-product-details-area">
    <div class="tp-product-details-top pb-115">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-6">
            <!-- product details thumb start -->
            <product-details-thumb :product="different" />
            <!-- product details thumb end -->
          </div>
          <!-- col end -->
          <div class="col-xl-5 col-lg-6">
            <!-- product details wrapper -->
            <product-details-wrapper :main-product="product" :product="different" @updated="productUpdated"/>
            <!-- product details wrapper -->
          </div>
        </div>
      </div>
    </div>
    <div class="tp-product-details-bottom pb-140">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <!-- product details tab nav -->
            <product-details-tab-nav :product="different" />
            <!-- product details tab nav -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type IProduct } from '@/types/product-d-t';
const props = defineProps<{ product: IProduct; }>()
const route = useRoute();

const different = useState('different', () => props?.product);

const productUpdated = ($product: IProduct) => {
	different.value = $product
}

watch(
		() => props.product,
		(newStatus, oldStatus) => {
	different.value = newStatus
})
</script>
