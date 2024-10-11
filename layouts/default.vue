<template>
    <Html :dir="head?.htmlAttrs?.dir" :lang="head?.htmlAttrs?.lang">
      <Head>
        <title v-if="title !== undefined">{{ title }}</title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :href="link.href" :hreflang="link.hreflang" :rel="link.rel" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :content="meta.content" :property="meta.property" />
        </template>
        <template v-for="style in head.style" :key="style.id">
          <Style :id="style.id" :type="style.type" v-html="style.innerHTML" />
        </template>
	      <link
			      v-if="isArabic"
			      href="/css/bootstrap-rtl.css"
			      rel="stylesheet"
	      />

      </Head>
    <Body
		    :class="{
        'overflow-hidden': status(),
      }"
    >
			  <cart-modal
					  id="addToCartModal"
					  :cart_accessory_products_count="cart_accessory_products_count"
					  :cart_different_products_count="cart_different_products_count"
					  :title="$t('Select product')"
			  />

		    <Header></Header>
		    <main>
		      <slot />
		    </main>
		    <Footer />
		    <modal-product />
		    <back-to-top />
      </Body>
    </Html>
</template>

<script lang="ts" setup>
import {useLocaleStore} from "@/pinia/useLocaleStore";
import {devRefresh, getArabicLocale} from "@/utils/";

const {t} = useI18n();
const route = useRoute()
const localeStore = useLocaleStore();
const {stop, status} = useLoading()

const settings = useNuxtApp().$settings;
const {siteTitle, siteDescription, siteKeywords, favicon} = settings;

const head = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: 'id',
	addSeoAttributes: true
});
const title = computed(() => route.meta.title || undefined);
const isArabic = computed(() => [getArabicLocale()?.iso, getArabicLocale()?.code].includes(head.value?.htmlAttrs?.lang));

const cart_accessory_products_count = ref(4);
const cart_different_products_count = ref(4);

useHead({
	titleTemplate: (t) => {
		return t ? `${t} - ${siteTitle}` : siteTitle;
	},
	htmlAttrs: {
		lang: localeStore.locale(),
	},
	meta: [
		{name: 'description', content: siteDescription},
		{name: 'keywords', content: siteKeywords},
	],
	link: [{rel: 'icon', type: 'image/png', href: favicon}],
	style: [
		{
			id: 'settings-style',
			type: 'text/css',
			innerHTML: `
:root {
	--tp-theme-primary: ${settings?.primaryColor || '#678E61'} !important;
	--tp-theme-green: ${settings?.primaryColor || '#678E61'} !important;
	--tp-hover-color: ${settings?.hoverColor || 'var(--tp-common-white)'} !important;
	--tp-footer-text-color: ${settings?.footerColor || 'var(--tp-common-black)'} !important;
	--tp-footer-bg-color: ${settings?.footerBackground || '#f4f7f9'} !important;
	--tp-footer-text-color: ${settings?.footerColor || 'var(--tp-common-black)'} !important;
	--tp-navbar-text-color: ${settings?.navbarColor || 'var(--tp-common-white)'} !important;
	--tp-navbar-bg-color: ${settings?.navbarBackground || '#678E61'} !important;
	--tp-price-text-color: ${settings?.priceColor || 'var(--tp-common-black)'} !important;
	--tp-price-bg-color: ${settings?.priceBackground || 'initial'} !important;
	--tp-category-color: ${settings?.categoryColor || 'var(--tp-common-black)'} !important;
	--tp-category-title-color: ${settings?.categoryTitleColor || 'var(--tp-heading-primary)'} !important;
	--tp-category-title-bg-color: ${settings?.categoryTitleBackground || 'initial'} !important;
}
.dropdown-menu {
	--bs-dropdown-link-active-bg: ${settings?.primaryColor || '#0d6efd'} !important;
}
.product-price-value {
	background-color: var(--tp-price-bg-color);
	color: var(--tp-price-text-color);
}
`
		},
	],
});

onMounted(() => {
	devRefresh();
})
</script>
