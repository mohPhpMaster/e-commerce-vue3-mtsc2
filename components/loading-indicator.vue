<template>
  <div v-if="loadingStatus()" class="loading-overlay" :style="`background: var(--tp-navbar-bg-color) url(${$settings?.logo}) no-repeat bottom;`">
    <div class="spinner-sm d-block d-md-none" />
    <div class="spinner d-none d-md-block" />
  </div>
  <NuxtLoadingIndicator v-else :skip="['error']" />
</template>

<script setup lang="ts">
const loading = useLoading();

const props = withDefaults(defineProps<{
	disabled?: boolean
}>(), {disabled: false});

const loadingStatus = () => {
	return loading.status() === true
};

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
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
	flex-direction: column;
	background-color: var(--tp-navbar-bg-color);
	background-size: auto 72px !important;
	opacity: .8;
}

.spinner {
	border: solid 6px transparent;
	border-radius: 50%;
	box-sizing: border-box;
	border-top-color: #000;
	border-left-color: #000;
	border-bottom-color: #efefef;
	border-right-color: #efefef;
	width: 48px;
	height: 48px;
	animation: spin 400ms linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}


.spinner-sm {
	display: block;
	position: fixed;
	z-index: 1031;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 18px;
	height: 18px;
	box-sizing: border-box;
	border: solid 2px transparent;
	border-top-color: var(--tp-hover-color);
	border-left-color: var(--tp-hover-color);
	border-bottom-color: #efefef;
	border-right-color: #efefef;
	border-radius: 50%;
	-webkit-animation: loader 450ms linear infinite;
	animation: loader 450ms linear infinite;
}

@-webkit-keyframes loader {
	0% {
		-webkit-transform: translate(-50%, -50%) rotate(0deg);
	}

	100% {
		-webkit-transform: translate(-50%, -50%) rotate(360deg);
	}
}

@keyframes loader {
	0% {
		transform: translate(-50%, -50%) rotate(0deg);
	}

	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}
</style>
