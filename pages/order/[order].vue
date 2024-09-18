<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb :title="$t('Order Details')" :subtitle="$t('Order Details')" />
	  <!-- breadcrumb end -->

	  <!-- order area start -->
      <order-area />
	  <!-- order area end -->
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Order Details"))});
</script>
