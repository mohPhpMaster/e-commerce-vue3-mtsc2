<template>
  <div>
      <!-- breadcrumb start -->
<!--      <breadcrumb :title="$t('Login')" :subtitle="$t('Login')" :center="true" />-->
      <!-- breadcrumb end -->

      <!-- login area start -->
      <login-area class="pt-100 pb-50"/>
      <!-- login area end -->
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({ title: title(t("Login Page")) });
</script>
