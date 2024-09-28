<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb :title="$t('Wishlist')" :subtitle="$t('Wishlist')"/>
      <!-- breadcrumb end -->

      <!-- wishlist area start -->
      <wishlist-area/>
      <!-- wishlist area end -->
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Wishlist"))});
</script>
