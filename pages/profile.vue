<template>
  <div>
      <!-- profile area start -->
      <profile-area/>
      <!-- profile area end -->
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/useUserStore";

const {t} = useI18n();
const {title} = useSiteSettings();
useSeoMeta({title: t("Profile Page")});

useUserStore().needUser();

</script>