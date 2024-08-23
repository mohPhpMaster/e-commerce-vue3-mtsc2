<template>
		<Carousel v-if="slides?.length" :autoplay="2000" :wrap-around="true" class="site-carousel">
		  <Slide v-for="(slide, i) in slides" :key="i">
		    <div class="carousel__item">
					<img :src="toolsService.parseImageUrl(slide, '')" class="w-100 site-carousel" :alt="`carousel image ${i}`">
		    </div>
		  </Slide>

		  <template #addons>
		      <Navigation />
		  </template>
		</Carousel>
</template>

<script setup lang="ts">
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel/dist/carousel.es.js'
import toolsService from "@/services/toolsService";
import {$axios} from "@/plugins/axiosInstance";

const slides = ref<string[]>([])

$axios.get('carousel')
		.then((response: { data: { data: string[] } }) => {
			slides.value = response?.data?.data || [];
		});

</script>

<style>
  .site-carousel {
	  height: 400px;
  }

  .carousel__item {
	  min-height: 400px;
	  width: 100%;
	  border-radius: 8px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
  }

  .carousel__slide {
	  padding: 0px;
  }

  .carousel__prev,
  .carousel__next {
	  box-sizing: content-box;
  }
</style>