<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb :title="$t('Register Now')" :subtitle="$t('Register')" :center="true" />
      <!-- breadcrumb end -->

      <!-- register area start -->
      <register-area/>
      <!-- register area end -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Register Page" });
</script>
