<template>
  <div>
    <!--      <breadcrumb :title="$t('Login')" :subtitle="$t('Login')" :center="true" />-->

      <login-area class="pt-100 pb-50" />
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Login Page"))});
</script>
