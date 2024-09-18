<template>
  <div>
    <contact-area/>
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Contact Us"))});
</script>
