<template>
	<div v-if="product">
		<p
				class="show-more-less-text-element mb-0"
				v-html="toolsService.parseProductDescription(product, () => !showMoreLess)"
		/>
		<span
				class="show-more-less"
				@click.prevent.self="toggleShowMoreLess($event)"
		>
			{{ showMoreLess ? $t('See less') : $t('See more') }}
		</span>
	</div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";

const props = defineProps<{ product?: IProduct }>();
const showMoreLess = ref<boolean>(false);

const toggleShowMoreLess = (event?: Event | string = '.show-more-less-text-element') => {
	showMoreLess.value = !showMoreLess.value;

	if (!event) {
		return;
	}

	let element: HTMLElement | null = typeof event === 'string'
			? document?.querySelector(event)
			: (event?.target?.parentElement || event?.target || null);

	if (!!element) {
		nextTick(() => setTimeout(() => element?.scrollIntoViewIfNeeded({behavior: "smooth", alignToTop: true}), 100))
	}
}
</script>