<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="category in category_data" :key="category.id">
          <a
            @click.prevent="handleCategoryRoute(category.slug)"
            :class="`pointer ${
              activeQuery ===
              category.parentName.toLowerCase().replace('&', '').split(' ').join('-')
                ? 'active'
                : ''
            }`"
          >
            {{ category.parentName }}
            <span>{{ category.products.length }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {_data, useCategoryStore} from '@/pinia/useCategoryStore';
import {onMounted} from "vue";

const categoryStore = useCategoryStore();
const category_data = computed(() => _data['filter-categories'] || []);
const router = useRouter();
const route = useRoute();
const activeQuery = computed(() => route.query.category);

// handle category route
const handleCategoryRoute = (slug: string) => {
	router.push(`/category/${encodeURIComponent(slug)}`);
};

onMounted(() => {
	categoryStore.loadCategories({name: 'filter-categories'});
})
</script>
