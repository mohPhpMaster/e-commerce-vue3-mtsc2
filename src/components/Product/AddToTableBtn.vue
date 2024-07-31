<template>
	<button class="btn btn-primary" @click="$emit('clicked', $event)">اضف <span class="fa fa-plus"></span></button>
</template>

<script>
export default {
	name: 'AddToTableBtn',
	props: {}
}
</script>
<style scoped>
</style>