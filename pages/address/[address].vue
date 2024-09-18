<template>
  <div class="profile__info">
      <h3 class="profile__info-title">{{ $t('Personal Details') }}</h3>
      <div class="profile__info-content">
        <!-- form start -->
        <forms-update-profile-form />
	      <!-- form end -->
      </div>
  </div>
</template>

<script setup lang="ts">
const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("About Us"))});
</script>

<style lang="scss" scoped>
</style>