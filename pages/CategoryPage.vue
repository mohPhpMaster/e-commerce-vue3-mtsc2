<template>
  <div>
    <h1>{{ categoryTitle }}</h1>
	  <!-- category content here -->
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;
const categoryTitle = ref('');

onMounted(() => {
	// Fetch category data based on the slug
	// Example: fetchCategoryData(slug).then(data => categoryTitle.value = data.title);
	categoryTitle.value = slug; // Or transform slug to title if needed
});
</script>
