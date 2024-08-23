<template>
    <Html :dir="head.htmlAttrs.dir" :lang="head.htmlAttrs.lang">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :href="link.href" :hreflang="link.hreflang" :rel="link.rel" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :content="meta.content" :property="meta.property" />
        </template>
      </Head>
      <Body>
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
const route = useRoute()
const {t} = useI18n()
const head = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: 'id',
	addSeoAttributes: true
})
const title = computed(() => t(route.meta.title ?? 'TBD', t('layouts.title'))
);
</script>
