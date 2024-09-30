<template>
  <ul>
    <li v-for="(item,i) in data" :key="item?.id || i" :class="`${item.drop_down?'has-dropdown':item.mega_menu?'has-dropdown has-mega-menu':''}`">
      <nuxt-link :href="item.link">{{ item.title }}</nuxt-link>


      <ul v-if="item.drop_down" class="tp-submenu">
        <li v-for="(drop_m,i) in item.dropdown_menus?.data" :key="drop_m?.id || i" >
          <nuxt-link :href="drop_m.link">{{ drop_m.title }}</nuxt-link>
        </li>
      </ul>
      
    </li>
  </ul>
</template>

<script setup lang="ts">
// import menu_data from '@/data/menu-data';
// const menu_data = ref<IMenuItem[]>([] as IMenuItem[]);

// onMounted(() => {
	// api.menuData({
	// 	slug: ""
	// })
	// 		.then((d) => console.log(51,menu_data.value = d))
// });

import {$axios} from "@/plugins/00.axiosInstance";
import toolsService from "@/services/toolsService";

const router = useRouter();
const {t} = useI18n();
const loading = useLoading();

const currentPath = computed(() => router.currentRoute.value.path);
const {
	data,
	error,
	pending
} = useLazyAsyncData(
		`site-menu`,
		() => $axios.get(`menu`)
				.then(res => res?.data?.data || {}),
		{
			watch: [currentPath],
			immediate: true
		}
);

if (error.value) {
	console.error('Failed to load menus data:', error.value);
}

const loadingStatus = () => {
	return pending.value || loading.status() === true
};
</script>
