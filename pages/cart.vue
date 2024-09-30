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
import {useCartStore} from "@/pinia/useCartStore";

const {t} = useI18n();
const {title} = useSiteSettings();
useSeoMeta({title: t("Shopping Cart")});

onMounted(() => {
	useCartStore().fetchCart();
});
</script>
