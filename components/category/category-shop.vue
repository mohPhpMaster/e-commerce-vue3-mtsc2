<template>
  <section class="tp-category-area pb-120">
    <div class="container">
      <div class="row">
        <div v-for="item in categories_data" :key="item.id" class="col-lg-4 col-sm-6">
          <div
            class="tp-category-main-box mb-25 p-relative fix"
            style="background-color: #f3f5f7"
          >
            <div class="tp-category-main-content">
              <h3 class="tp-category-main-title pb-1">
                <a @click="toolsService.gotoCategory(item)" class="pointer">{{ toolsService.parseCategoryName(item) }}</a>
              </h3>
              <span class="tp-category-main-item">
                {{item?.products?.length}} Products
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @deprecated not used
 */
import {categories_data, useCategoryStore} from '@/pinia/useCategoryStore';
import toolsService from "@/services/toolsService";

const {loadCategories} = useCategoryStore();
const router = useRouter();

onMounted(() => {
	loadCategories({name: 'categories'})
})

const handleCategory = (slug: string) => {
  router.push(`/category/${encodeURIComponent(slug)}`);
};
</script>
