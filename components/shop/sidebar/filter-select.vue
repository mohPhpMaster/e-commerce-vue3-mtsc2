<template>
    <div class="tp-shop-top-select text-md-end">
      <ui-nice-select
		      ref="niceSelectRef"
		      :default-current="store.getSelectedSortingOptionIndex()"
		      :options="store.getSortingOptions()"
		      name="Select Category"
		      @onChange="handleSelect"
      />
    </div>
</template>

<script lang="ts" setup>
import {useProductFilterStore} from "@/pinia/useProductFilterStore";

const emit = defineEmits(['handleSelectFilter'])

const {t} = useI18n();
const router = useRouter();
const route = useRoute();
const store = useProductFilterStore();
const niceSelectRef = ref<HTMLElement | null>(null);

const handleSelect = (e: { value: string; text: string }) => {
	store.handleSortingOptionChangeAndFilter(e)
	emit('handleSelectFilter', e, store.getSelectedSortingOptionIndex());
};

onMounted(() => {
	store.fetchRouterSelectedSortingOption();
})

watch(
		() => [store.sortingOption, route.query],
		() => {
			return niceSelectRef.value.current = store.getSelectedSortingOption();
		}
);
</script>
