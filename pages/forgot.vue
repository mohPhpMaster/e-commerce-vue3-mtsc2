<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb title="Forgot Password" subtitle="Reset Password" :center="true" />
      <!-- breadcrumb end -->

      <!-- forgot area start -->
      <forgot-area/>
      <!-- forgot area end -->
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/userStore";

useSeoMeta({ title: "Forgot Page" });

useUserStore().guestUser();
</script>
