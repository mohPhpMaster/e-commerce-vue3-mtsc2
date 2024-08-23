<template>
	<button class="btn btn-primary" @click="$emit('clicked', $event)">{{ $t("Add") }} <span class="fa fa-plus"></span></button>
</template>

<script>
export default {
	name: 'cart-add-to-table-btn',
	props: {}
}
</script>
<style scoped>
</style>