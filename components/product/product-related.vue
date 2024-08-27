<template>
  <section v-if="related_products?.length > 0" class="tp-related-product pt-95 pb-120">
    <div class="container">
      <div class="row">
        <div class="tp-section-title-wrapper-6 text-center mb-40">
          <span class="tp-section-title-pre-6">{{ $t('Next day Products') }}</span>
          <h3 class="tp-section-title-6">{{ $t('Related Products') }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="tp-product-related-slider">
          <swiper v-bind="slider_setting" :modules="[Scrollbar]" class="tp-product-related-slider-active swiper-container mb-10">
            <swiper-slide v-for="(item, i) in related_products" :key="i">
              <product-single :product="item"/>
            </swiper-slide>
          </swiper>
          <div class="tp-related-swiper-scrollbar tp-swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Scrollbar} from "swiper/modules";
import type {ICategory} from "@/types/category-d-t";
import type {IProduct} from "@/types/product-d-t";
import {$axios} from "@/plugins/axiosInstance";
import toolsService from "@/services/toolsService";
import {convertProductResponse} from "@/plugins/data/product-data";

const props = defineProps<{
	product?: IProduct;
	category?: ICategory
}>();

const productRelatedLoader = () => $axios.get(toolsService.getRelatedProductUrl(props.product)).then(res => {
	return (res?.data?.data || []).map(convertProductResponse)
});

const {data: related_products, pending, refresh: refresh_related_products} = useLazyAsyncData(`products-${props?.product?.id}-related`,
		productRelatedLoader,{
	watch: [props.product],
});

onMounted(async () => {
	if (!related_products.value) {
		await refresh_related_products()
	}
})
// slider_setting
const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 24,
  enteredSlides: false,
  scrollbar: {
    el: ".tp-related-swiper-scrollbar",
    draggable: true,
    dragClass: "tp-swiper-scrollbar-drag",
    snapOnRelease: true,
  },
  breakpoints: {
    "1200": {
      slidesPerView: 4,
    },
    "992": {
      slidesPerView: 3,
    },
    "768": {
      slidesPerView: 2,
    },
    "576": {
      slidesPerView: 2,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};
</script>
