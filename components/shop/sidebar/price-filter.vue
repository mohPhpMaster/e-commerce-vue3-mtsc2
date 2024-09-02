<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-filter price__slider">
      <div id="slider-range" class="mb-10">
        <Slider
		        :direction="localeStore.selectedLocale()?.dir"
		        :max="store.maxProductPrice"
		        showTooltip="drag"
		        v-model="priceValues"
        />
      </div>
      <div class="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
        <span class="input-range">
         {{ currency(priceValues?.[0]) }} - {{ currency(priceValues?.[1]) }}
        </span>

        <button
		        :disabled="store.priceValues[0] === priceValues?.[0] && store.priceValues[1] === priceValues?.[1]"
		        class="tp-shop-widget-filter-btn"
		        type="button"
		        @click="store.handlePriceChangeAndFilter(priceValues)"
        >
          {{ $t('Apply') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import {useProductFilterStore} from "@/pinia/useProductFilterStore";
import {useLocaleStore} from "@/pinia/useLocaleStore";
import currency from "@/services/currencyService";

const localeStore = useLocaleStore();
const store = useProductFilterStore();
const router = useRouter();
const route = useRoute();

const priceValues = ref([...store.priceValues]);

const fetchRouterPriceValues = () => {
	store.fetchRouterPriceValues()
	priceValues.value = [...store.priceValues];
};

onMounted(() => {
	fetchRouterPriceValues();
})

watch(
		() => route.query,
		(n) => {
			fetchRouterPriceValues();
		}
);
</script>
