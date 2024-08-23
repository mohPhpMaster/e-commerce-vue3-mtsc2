<template>
  <div class="offcanvas__category pb-40">
    <button class="tp-offcanvas-category-toggle" @click="toggleCategoryActive">
      <i class="fa-solid fa-bars"></i>
      {{ $t('All Categories') }}
    </button>
    <div class="tp-category-mobile-menu">
      <nav :class="`tp-category-menu-content ${isCategoryActive ? 'active' : ''}`">
        <ul :class="isCategoryActive ? 'active' : ''">
          <li
		          v-for="(item, i) in category_data"
		          :key="i"
		          class="has-dropdown"
          >
            <a class="pointer" @click="handleOpenSubMenu(item)">
              <span v-if="item.img">
                <img :src="item.img" alt="category image" style="width: 50px; height: 50px; object-fit: contain"/>
              </span>
              <span>{{ toolsService.parseCategoryName(item) }}</span>
              <button v-if="item.children" class="dropdown-toggle-btn">
                <i class="fa-regular fa-angle-right"></i>
              </button>
            </a>

            <ul v-if="item.children" :class="`tp-submenu ${openCategory === item.parentName ? 'active' : ''}`">
              <li v-for="(child, i) in item.children" :key="i">
                <a class="pointer">{{ toolsService.parseCategoryName(child) }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";
import {useCategoryStore} from '@/pinia/useCategoryStore';

const {category_data, loadCategories} = useCategoryStore();
const router = useRouter();
let isCategoryActive = ref<boolean>(false);
let openCategory = ref<string>("");

onMounted(() => {
	loadCategories()
})

const handleOpenSubMenu = (item: ICategory) => {
	let title: string = item.parentName;
	if (title === openCategory.value) {
		openCategory.value = "";
	} else {
		openCategory.value = title;
	}
	if (item?.children?.length === 0 && item?.url) {
		router.push(item.url);
	}
};

const toggleCategoryActive = () => {
	isCategoryActive.value = !isCategoryActive.value;
};
</script>

