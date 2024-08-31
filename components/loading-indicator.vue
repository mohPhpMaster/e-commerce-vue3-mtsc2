<template>
  <div v-if="loading.status() === true" class="loading-overlay">
    <div class="spinner"></div>
  </div>
  <LazyNuxtLoadingIndicator v-else :skip="['error']" />
</template>

<script setup lang="ts">
const loading = useLoading();

const props = withDefaults(defineProps<{
	disabled?: boolean
}>(), {disabled: false});

if (props.disabled) {
	loading.disable();
} else {
	loading.enable();
}
</script>

<style scoped>
.loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(103, 142, 97, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}

.spinner {
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: #fff;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
