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
import {useWishlistStore} from "@/pinia/useWishlistStore";

const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Wishlist"))});

onMounted(() => {
	useWishlistStore().fetchWishlist();
});
</script>
