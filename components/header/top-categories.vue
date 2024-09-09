<template>
  <div class="tp-header-category tp-category-menu tp-header-category-toggle">
    <!-- <Transition> -->
      <nav v-if="isActive" class="tp-category-menu-content">
        <ul>
          <li
		          v-for="(item, i) in categories" :key="i" :class="{
						'has-dropdown': item.children?.length
          }"
          >
            <nuxt-link :to="toolsService.getCategoryUrl(item)" class="pointer" @click="toolsService.gotoCategory(item)">
              <span v-if="item.img">
                <img
		                :src="item.img"
		                :title="toolsService.parseCategoryName(item)"
		                style="width: 35px; height: 35px; object-fit: cover; border-radius: 50%;"
                    alt="Category Image"
                />
              </span>
              {{ toolsService.parseCategoryName(item) }}
            </nuxt-link>

            <ul v-if="item.children" class="tp-submenu">
              <li v-for="(child, i) in item.children" :key="i">
                <nuxt-link
		                class="pointer"
		                :to="toolsService.getCategoryUrl(child as ICategory)"
		                @click="toolsService.gotoCategory(child as ICategory)"
                >{{ toolsService.parseCategoryName(child) }}</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
	  <!-- </Transition> -->
  </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";

defineProps<{ isActive: boolean, categories: ICategory[] }>();
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
