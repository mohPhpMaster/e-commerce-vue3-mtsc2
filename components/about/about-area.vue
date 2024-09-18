<template>
	<section v-if="!loadingStatus()" class="tp-about-area pb-80 pt-95">
	  <div class="container">
	      <div class="row">
	        <div class="col-xl-8 col-lg-10">
	            <div class="tp-about-banner-wrapper">
	              <span class="tp-about-banner-subtitle">{{ data?.subtitle || $t('History') }}</span>
	              <h3 class="tp-about-banner-title">{{ data?.title || $t('Well-coordinated Teamwork Speaks About Us') }}</h3>
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
	              <p v-html="data?.description || parsedDescription"></p>
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
		 `site-about-us`,
		 () => $axios.get(`site-about-us`, {baseURL: "http://localhost:3000/api"})
				 .then(res => res?.data?.data || {}),
		 {
			 watch: [currentPath],
			 immediate: true
		 }
 );

 if (error.value) {
	 console.error('Failed to load about us data:', error.value);
 }

 const parsedDescription = computed(() => {
	 return toolsService.normalizeLineEndingsToHtml(t(`We are thrilled to offer you a wide range of products that you won't find anywhere else. Whether you're shopping for clothing, accessories, gadgets, or home decor, we have something for everyone.\\nOur commitment to quality is reflected in every product we offer. We work with top suppliers and manufacturers to ensure that every item we sell meets our high standards for durability, performance, and style. And with a user-friendly interface and intuitive navigation, shopping on our site is a breeze. We understand that security is a top concern for online shoppers, which is why we employ the latest encryption technologies and follow industry best practices to keep your personal information safe. And with fast, reliable shipping options, you can enjoy your purchases in no time.`));
 })

 const loadingStatus = () => {
	 return pending.value || loading.status() === true
 };

</script>
