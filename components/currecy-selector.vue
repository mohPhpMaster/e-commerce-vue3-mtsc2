<template>
	<div class="offcanvas__currency-wrapper currency">
	  <span
			  id="tp-offcanvas-currency-toggle"
			  class="offcanvas__currency-selected-currency tp-currency-toggle"
			  @click="handleToggleActive('currency')"
	  >Currency : USD
	  </span>
	  <ul
			  :class="`offcanvas__currency-list tp-currency-list ${
	      isToggleActive === 'currency' ? 'tp-currency-list-open' : ''
	    }`"
	  >
	    <li>USD</li>
	    <li>ERU</li>
	    <li>BDT</li>
	    <li>INR</li>
	  </ul>
	</div>
</template>

<script lang="ts" setup>
let isToggleActive = ref<string>("");
// handle active
const handleToggleActive = (type: string) => {
	if (type === isToggleActive.value) {
		isToggleActive.value = "";
	} else {
		isToggleActive.value = type;
	}
};
</script>

<style lang="scss">
</style>