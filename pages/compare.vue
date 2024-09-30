<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb :title="$t('Compare')" :subtitle="$t('Compare')"/>
      <!-- breadcrumb end -->

      <!-- compare area start -->
      <compare-area/>
      <!-- compare area end -->
  </div>
</template>

<script setup lang="ts">
import {useCompareStore} from "@/pinia/useCompareStore";

const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Compare"))});

onMounted(() => {
	useCompareStore().fetchComparelist();
});
</script>
