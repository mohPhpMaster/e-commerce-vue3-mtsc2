<template>
  <div>
    <about-area/>

<!--    <counter-area/>-->
<!--    <history-area/>-->
<!--    <work-area/>-->
<!--    <author-area/>-->
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("About Us"))});
</script>
