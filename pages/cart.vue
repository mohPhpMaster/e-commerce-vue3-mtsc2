<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb :title="$t('Shopping Cart')" :subtitle="$t('Shopping Cart')"/>
      <!-- breadcrumb end -->

      <!-- cart area start -->
      <cart-area></cart-area>
      <!-- cart area end -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Cart Page" });
</script>
