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
useSeoMeta({ title: "Compare Page" });
</script>
