<template>
		<Carousel v-if="slides?.length" :autoplay="2000" :wrap-around="true" class="site-carousel">
		  <Slide v-for="(slide, i) in slides" :key="slide?.id || i">
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

const route = useRoute()

const {data: slides, pending, error, refresh} = useLazyAsyncData<string[]>('carousel', () =>
		$axios.get('carousel').then(res => res?.data?.data)
);

// trying to fix a bug in carousel
const isPending = () => {
	return pending.value || useLoading().status() === true
}

const windowResizeTrigger = () => {
	if (isPending()) {
		setTimeout(windowResizeTrigger, 1000);
	} else {
		setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
	}
};

onMounted(() => {
	windowResizeTrigger()
});

watch(() => route.path, () => {
	windowResizeTrigger()
});
</script>

<style>
  .site-carousel {
	  height: 400px;
	  margin: 0;
  }

	.carousel__track {
		margin: 0;
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