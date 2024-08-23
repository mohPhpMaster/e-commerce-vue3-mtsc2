<template>
  <div>
      <!-- profile area start -->
      <profile-area/>
      <!-- profile area end -->
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/userStore";

useSeoMeta({ title: "Profile Page" });

useUserStore().needUser();
</script>