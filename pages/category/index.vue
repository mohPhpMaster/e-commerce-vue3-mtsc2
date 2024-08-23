<template>
  <div>
      <!-- breadcrumb start -->
      <category-details-breadcrumb :category="category" />
      <!-- breadcrumb end -->
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/pinia/useCategoryStore';

const categoryStore = useCategoryStore();
let category = computed(() => categoryStore.category_data?.[0]);
onMounted(() => {
	// categoryStore.loadCategories()
})
</script>
