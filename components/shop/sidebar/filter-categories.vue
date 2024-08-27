<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="category in category_data" :key="category.id">
          <a
            @click.prevent="toolsService.gotoCategory(category)"
            :class="`pointer ${isActiveQuery(category) ? 'active' : ''}`"
          >
            {{ toolsService.parseCategoryName(category) }}
            <span>{{ category?.products?.length }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore} from '@/pinia/useCategoryStore';
import {onMounted} from "vue";
import {api} from "@/plugins/api";
import toolsService from "@/services/toolsService";

const categoryStore = useCategoryStore();
// const category_data = ref<ICategory[]>([] as ICategory[]);
const router = useRouter();
const route = useRoute();
const activeQuery = computed(() => route.query.category);

// handle category route
const isActiveQuery = (category: ICategory) => activeQuery.value === category.parentName.toLowerCase().replace('&', '').split(' ').join('-');

const {data: category_data, pending, error, refresh} = useLazyAsyncData<string[]>('categories', () =>
		api.categoryData({
			page: categoryStore.currentPage,
			slug: ""
		})
				.then(data => {

					return data;
				})
);
</script>
