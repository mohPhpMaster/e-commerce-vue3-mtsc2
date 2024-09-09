<template>
	<div class="tp-footer-social">
	  <a v-for="item in arrayWrap(socialLinks)" :key="item?.id || item?.link" :href="item?.link" target="_blank" class="me-1" :title="item?.title">
	    <i class="fa-brands" :class="item?.icon"></i>
	  </a>
  </div>
</template>

<script setup lang="ts">
import {arrayWrap} from "../utils/arrayWrap";
import {getSocialLinks, toSocialLinks} from "../utils/toSocialLinks";

const socialLinks = toSocialLinks(getSocialLinks(useNuxtApp().$settings));
</script>
