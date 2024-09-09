<template>
  <div class="tp-header-category tp-category-menu tp-header-category-toggle">
    <!-- <Transition> -->
      <nav v-if="isActive" class="tp-category-menu-content">
        <ul>
          <li
		          v-for="(item, i) in categories" :key="item?.id" :class="{
						'has-dropdown': item.children?.length
          }"
          >
            <nuxt-link :href="toolsService.getCategoryUrl(item)" class="pointer" @click="handleCategoryClick(item, $event)">
              <span v-if="item.img">
                <img :src="item.img" :title="toolsService.parseCategoryName(item)" style="width: 35px; height: 35px; object-fit: cover; border-radius: 50%;" alt="Category Image"/>
              </span>
              {{ toolsService.parseCategoryName(item) }}
            </nuxt-link>

            <ul v-if="item.children" class="tp-submenu">
              <li v-for="(child, i) in item.children" :key="child?.id">
                <nuxt-link
		                class="pointer"
		                :href="toolsService.getCategoryUrl(child as ICategory)"
		                @click="handleCategoryClick(child as ICategory, $event)"
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
// todo: tp-submenu when rtl reposition it to be visible on the view
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";

const props = defineProps<{ isActive: boolean, categories: ICategory[] }>();
const emit = defineEmits(['toggle']);

const handleCategoryClick = (item: ICategory, e: Event) => {
	e?.preventDefault();
	emit('toggle');

	if (!item.children?.length) {

		// toolsService.gotoCategory(item)
		return true;
	}

	return false;
}
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
