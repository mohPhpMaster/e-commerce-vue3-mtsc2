<template>
  <div class="offcanvas__category pb-40">
    <button class="tp-offcanvas-category-toggle" @click="toggleCategoryActive" :class="isCategoryActive ? 'active' : ''">
      <i class="fa-solid fa-bars"></i>
			<span>{{ $t('All Categories') }}</span>
    </button>

    <div class="tp-category-mobile-menu">
      <nav :class="`tp-category-menu-content ${isCategoryActive ? 'active' : ''}`">
        <ul :class="isCategoryActive ? 'active' : ''">
          <li v-for="(item, i) in categories" :key="item?.id || i" class="has-dropdown">
            <a class="pointer"
               :class="openCategory === item.parentName ? 'expanded' : ''" @click.prevent="handleOpenSubMenu(item)" @dblclick.prevent.stop="router.push(item.url)">
              <span v-if="item.img">
                <img :src="item.img" alt="category image" style="width: 50px; height: 50px; object-fit: contain"/>
              </span>
              <span>{{ toolsService.parseCategoryName(item) }}</span>
              <button v-if="item?.children?.length > 0" class="dropdown-toggle-btn" :class="openCategory === item.parentName ? 'dropdown-opened' : ''">
                <i class="fa-regular fa-angle-right"></i>
              </button>
            </a>

            <ul v-if="item?.children?.length > 0" :class="`tp-submenu pe-3 ${openCategory === item.parentName ? 'active' : ''}`">
              <li v-for="(child, i) in item.children" :key="child?.id || i">
                <a class="pointer" @dblclick.prevent="router.push(child.url)" @click.prevent="handleOpenSubMenu(child)">{{ toolsService.parseCategoryName(child) }}</a>
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

const router = useRouter();
let isCategoryActive = ref<boolean>(false);
let openCategory = ref<string>("");

const props = defineProps<{
	categories?: ICategory[],
}>();

const handleOpenSubMenu = (item: ICategory) => {
	if (item?.children?.length === 0 && item?.url) {
		router.push(item.url);
		return;
	}

	let title: string = item.parentName;
	if (title === openCategory.value) {
		openCategory.value = "";
	} else {
		openCategory.value = title;
	}
};

const toggleCategoryActive = () => {
	isCategoryActive.value = !isCategoryActive.value;
};
</script>

