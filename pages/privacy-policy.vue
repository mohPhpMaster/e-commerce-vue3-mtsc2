<template>
  <div>
    <privacy-policy-area />
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Privacy Policy"))});
</script>
