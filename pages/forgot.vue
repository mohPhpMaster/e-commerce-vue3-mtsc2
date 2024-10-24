<template>
  <div>
<!--      <breadcrumb title="Forgot Password" subtitle="Reset Password" :center="true" />-->

      <forgot-area class="pt-100 pb-50" />
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/useUserStore";

const {title} = useSiteSettings();
const {t} = useI18n();

useSeoMeta({title: title(t("Reset Password"))});

useUserStore().guestUser();
</script>
