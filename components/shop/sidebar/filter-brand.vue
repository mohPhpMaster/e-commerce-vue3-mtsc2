<template>
  <div class="tp-shop-widget-content">
    <div
      class="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap"
    >
      <div
        v-for="item in brand_items"
        :key="item.id"
        class="tp-shop-widget-brand-item"
      >
        <a
          @click.prevent="handleBrandRoute(item.name)"
          v-if="item.imageUrl"
          class="pointer"
        >
          <img :src="item.imageUrl" :alt="item.name" class="w-100" />
        </a>
        <a
          @click.prevent="handleBrandRoute(item.name)"
          v-else
          class="pointer"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBrandStore} from "@/pinia/useBrandStore";
import type {IBrand} from "@/types/brand-d-t";

const {loadBrands} = useBrandStore();
const router = useRouter();
const route = useRoute();
const brand_items: Ref<IBrand[]> = ref([]);

onMounted(() => {
	loadBrands({
		page: route?.params?.page || 1,
		slug: route?.params?.brand || ""
	})
			.then((data) => {
				brand_items.value = data
			})
})

// handle Brand route
const handleBrandRoute = (value: string) => {
  const newBrand = value.toLowerCase().replace("&", "").split(" ").join("-");
    router.push(`/shop?brand=${newBrand}`);
};
</script>
