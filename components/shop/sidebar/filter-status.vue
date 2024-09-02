<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-checkbox">
      <ul class="filter-items filter-checkbox">
        <li v-for="(s, i) in store.getProductStatusOptions()" :key="i" class="filter-item checkbox">
          <input
            id="on-sale"
            type="checkbox"
            name="on-sale"
          />
          <label @click="store.handleProductStatusChangeAndFilter(i)" :for="s" :class="{
              'active': activeQuery === i
            }"> {{ s }} </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useProductFilterStore} from "@/pinia/useProductFilterStore";

const store = useProductFilterStore();
const router = useRouter();
const route = useRoute();

const activeQuery = ref<number|null>(store.productStatus);

const fetchRouterProductStatus = () => {
	store.fetchRouterProductStatus()
	activeQuery.value = store.productStatus;
};

onMounted(() => {
	fetchRouterProductStatus();
})

watch(
		() => route.query,
		(n) => {
			fetchRouterProductStatus();
		}
);
</script>
