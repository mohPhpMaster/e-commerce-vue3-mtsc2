<template>
  <section class="tp-category-area pt-110 pb-110">
    <div class="container">
        <div class="row">
          <div class="col-xl-12">
              <div class="tp-section-title-wrapper-5 mb-50 text-center">
                <span class="tp-section-title-pre-5">
                    Shop by Brands
                    <svg-shape-line></svg-shape-line>
                </span>
                <h3 class="tp-section-title-5">Shop by Brands</h3>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12">
              <div class="tp-category-slider-5">
                <swiper v-bind="slider_setting" :modules="[Scrollbar,Pagination,Navigation]" class="tp-category-slider-active-5 swiper-container mb-50">
                      <swiper-slide v-for="item in brand_items" :key="item.id" class="tp-category-item-5 p-relative z-index-1 fix" data-bg-color="#E5EFE2">
                          <a @click="toolsService.gotoBrand(item)" class="pointer">
                            <div class="tp-category-thumb-5 include-bg" :style="`background-image:url(${item.imageUrl})`"></div>
                            <div class="tp-category-content-5">
                                <h3 class="tp-category-title-5">{{ toolsService.parseBrandName(item) }}</h3>
                            </div>
                          </a>
                      </swiper-slide>
                </swiper>
                <div class="tp-category-5-swiper-scrollbar tp-swiper-scrollbar"></div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar,Pagination,Navigation } from "swiper/modules";
import toolsService from "@/services/toolsService";
import {useBrandFeaturedStore} from "@/pinia/useBrandFeaturedStore";
import type {IBrand} from "@/types/brand-d-t";
import {$axios} from "@/plugins/axiosInstance";
import {convertBrandResponse} from "@/plugins/data/brand-data";

// const props = defineProps<{}>()

const {data: brand_items, pending, error, refresh} = useLazyAsyncData<string[]>('brands/featured', () =>
		$axios.get('brands/featured').then(res => (res?.data?.data || []).map(convertBrandResponse))
);
// const {loadBrandsFeatured} = useBrandFeaturedStore();
// let brand_featured_data = ref<IBrand[]>([]);
// const brand_items: Ref<IBrand[]> = ref([]);

// onMounted(() => {
// 	loadBrandsFeatured()
// 			.then((data) => {
// 				brand_items.value = data
// 			})
// })

const slider_setting = {
    slidesPerView: 5,
		spaceBetween: 12,
		pagination: {
			el: ".tp-category-slider-dot-4",
			clickable: true,
		},
		navigation: {
			nextEl: ".tp-category-slider-button-next-5",
			prevEl: ".tp-category-slider-button-prev-5",
		},
		scrollbar: {
			el: '.tp-category-5-swiper-scrollbar',
			draggable: true,
			dragClass: 'tp-swiper-scrollbar-drag',
			snapOnRelease: true,
		},

		breakpoints: {
			'1400': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'400': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		}
}
</script>
