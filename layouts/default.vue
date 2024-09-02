<template>
    <Html :dir="head.htmlAttrs.dir" :lang="head.htmlAttrs.lang">
      <Head>
        <title v-if="title !== undefined">{{ title }}</title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :href="link.href" :hreflang="link.hreflang" :rel="link.rel" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :content="meta.content" :property="meta.property" />
        </template>
      <link
		      v-if="isArabic"
		      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
		      rel="stylesheet"
      />

      </Head>
    <Body
		    :class="{
        'overflow-hidden': status(),
      }"
    >
		    <Header></Header>
		    <main>
		      <slot />
		    </main>
		    <Footer></Footer>
		    <modal-product />
		    <back-to-top />
      </Body>
    </Html>
</template>

<script lang="ts" setup>
import {useLocaleStore} from "@/pinia/useLocaleStore";
import {getArabicLocale} from "../utils";

const {stop, status} = useLoading()
const route = useRoute()
const i18n = useI18n()
const {t} = i18n;
const localeStore = useLocaleStore();
const head = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: 'id',
	addSeoAttributes: true
});

const siteTitle = useNuxtApp().$settings.siteTitle;
useHead({
	titleTemplate: (t) => {
		return t ? `${t} - ${siteTitle}` : siteTitle;
	},
	htmlAttrs: {
		lang: localeStore.locale(),
	},
});

const title = computed(() => {
	return route.meta.title || undefined;
});

// Determine if the current locale is Arabic
const isArabic = computed(() => [getArabicLocale()?.iso, getArabicLocale()?.code].includes(head.value.htmlAttrs.lang));

// Watch for changes in locale and reload the page to apply RTL styles
watch(isArabic, (newVal) => {
	if (newVal) {
		// Dynamically load Bootstrap RTL if the locale is Arabic
		const rtlLink = document.createElement('link');
		rtlLink.rel = 'stylesheet';
		rtlLink.href =
				'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
		document.head.appendChild(rtlLink);
	} else {
		// Remove RTL styles if the locale is not Arabic
		const rtlLink = document.querySelector(
				'link[href*="bootstrap-rtl.min.css"]'
		);
		if (rtlLink) rtlLink.remove();
	}
});
</script>
