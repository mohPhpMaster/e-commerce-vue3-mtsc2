<template>
	<div class="col-12 col-xxl-6 pb-3" v-for="i in count" :key="i">
    <div class="tp-product-different-item-5 d-flex align-items-center">
	    <div class="tp-product-different-thumb-5 fix col-2 mx-2">
				<div class="skeleton-block image"></div>
	    </div>

	    <div class="tp-product-different-content-5 col mx-2">
	        <h4 class="tp-product-different-title-5">
						<div class="skeleton-block subtitle"></div>
	        </h4>
	        <div class="tp-product-different-price-wrapper-5">
	          <span class="tp-product-different-price-5">
							<div class="skeleton-block content"></div>
	          </span>
	        </div>
	    </div>
    </div>
	</div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ count?: number }>(), { count: 2 })
</script>
