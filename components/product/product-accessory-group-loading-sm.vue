<template>
	<div class="col-12 pb-3" v-for="i in count" :key="i">
	  <div class="tp-product-accessories-item-5 d-flex align-items-center">
	    <div class="tp-product-accessories-thumb-5 mx-3 fix col-1"></div>
	    <h4 class="tp-product-accessories-name-5 mx-3 col-2">
				<div class="skeleton-block title"></div>
	    </h4>
	    <div class="tp-product-accessories-content-5 mx-3 offset-1 col-8">
				<div class="skeleton-block button"></div>
	    </div>
	  </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ count?: number }>(), {count: 2})
</script>

<style scoped lang="scss">
.tp-product-accessories-item-5 {
	height: 64px;
}
</style>