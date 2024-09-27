<template>
	<section v-if="!loadingStatus()" class="tp-about-area pb-80 pt-95">
	  <div class="container">
	      <div class="row">
	        <div class="col-xl-8 col-lg-10">
	            <div class="tp-about-banner-wrapper">
	              <span class="tp-about-banner-subtitle">{{ data?.subtitle || '' }}</span>
	              <h3 class="tp-about-banner-title">{{ data?.title || '' }}</h3>
	            </div>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xl-12" v-if="data?.image">
	            <div class="tp-about-banner-thumb w-img">
	              <img :src="data?.image || '/images/about/about-big-1.jpg'" alt="about-img">
	            </div>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xl-12">
	            <div class="tp-about-banner-content">
	              <p v-html="data?.description || ''"></p>
	            </div>
	        </div>
	      </div>
	  </div>
	</section>
	<div v-else class="container">
		<loading-skeleton />
	</div>
</template>

<script lang="ts" setup>
 import toolsService from "@/services/toolsService";
 import {$axios} from "@/plugins/00.axiosInstance";

 const router = useRouter();
 const {t} = useI18n();
 const loading = useLoading();

 const currentPath = computed(() => router.currentRoute.value.path);
 const {
	 data,
	 error,
	 pending
 } = useLazyAsyncData(
		 `site-privacy-policy`,
		 () => $axios.get(`privacy-policy`)
				 .then(res => res?.data?.data || {}),
		 {
			 watch: [currentPath],
			 immediate: true
		 }
 );

 if (error.value) {
	 console.error('Failed to load privacy policy data:', error.value);
 }

 const parsedDescription = computed(() => {
	 return toolsService.normalizeLineEndingsToHtml(t('Privacy Policy'));
 })

 const loadingStatus = () => {
	 return pending.value || loading.status() === true
 };
</script>
