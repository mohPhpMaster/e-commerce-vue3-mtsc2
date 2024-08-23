<template>
  <div class="tp-header-category tp-category-menu tp-header-category-toggle">
    <!-- <Transition> -->
      <nav v-if="isActive" class="tp-category-menu-content">
        <ul>
          <li v-for="(item, i) in category_data" :class="{
						'has-dropdown': item.children?.length
          }" :key="i">
            <a class="pointer" @click="toolsService.gotoCategory(item)">
              <span v-if="item.img">
                <img
		                :src="item.img"
		                :title="toolsService.parseCategoryName(item)"
		                style="width: 35px; height: 35px; object-fit: cover; border-radius: 50%;"
                />
              </span>
              {{ toolsService.parseCategoryName(item) }}
            </a>

            <ul v-if="item.children" class="tp-submenu">
              <li v-for="(child, i) in item.children" :key="i">
                <a class="pointer" @click="toolsService.gotoCategory(child as ICategory)">{{ toolsService.parseCategoryName(child) }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
	  <!-- </Transition> -->
  </div>
</template>

<script setup lang="ts">
import toolsService from "@/services/toolsService";
import {onMounted} from "vue";
import {api} from "@/plugins/api";
import type {ICategory} from "@/types/category-d-t";

defineProps<{ isActive: boolean }>();

const category_data = ref<ICategory[]>([]);

api.categoryData()
		.then((data: ICategory[]) => {
			category_data.value = data;
			return data;
		})

onMounted(() => {
})

</script>

<style scoped>
/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */
</style>
