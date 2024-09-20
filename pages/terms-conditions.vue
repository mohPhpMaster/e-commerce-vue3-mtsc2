<template>
  <div>
    <terms-conditions-area />
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Terms & Conditions"))});
</script>
