<template>
  <div>
    <a :href="shareUrl('whatsapp')" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
    <a :href="shareUrl('facebook')" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
    <a :href="shareUrl('twitter')" target="_blank"><i class="fa-brands fa-twitter"></i></a>
    <a :href="shareUrl('linkedin')" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
    <a :href="shareUrl('vimeo')" target="_blank"><i class="fa-brands fa-vimeo-v"></i></a>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

type SocialMedia = 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'vimeo';

const socialMediaUrls: Record<SocialMedia, string> = {
	whatsapp: 'https://wa.me/?text=',
	facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
	twitter: 'https://twitter.com/intent/tweet?url=',
	linkedin: 'https://www.linkedin.com/shareArticle?url=',
	vimeo: 'https://vimeo.com/share/link?url=',
};

const getOrigin = () => {
	let origin = process.client ? window.location.origin : useNuxtApp()?.$baseUrl;

	if (typeof origin === 'string') {
		origin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
	}

	return encodeURIComponent(origin + route.fullPath);
};


const shareUrl = (platform: SocialMedia): string => {
	return socialMediaUrls[platform] + getOrigin();
};

const shareOnSocialMedia = (platform: SocialMedia, event: Event) => {
	event?.preventDefault();
	if (process.client) {
		window.open(shareUrl(platform), '_blank', 'noopener,noreferrer');
	}
};

</script>
