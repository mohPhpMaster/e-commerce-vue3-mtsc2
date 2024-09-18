<template>
  <ul>
    <li v-for="(item,i) in menu_data" :key="i" :class="`${item.drop_down?'has-dropdown':item.mega_menu?'has-dropdown has-mega-menu':''}`">
      <nuxt-link :href="item.link">{{ item.title }}</nuxt-link>


      <ul v-if="item.drop_down" class="tp-submenu">
        <li v-for="(drop_m,i) in item.dropdown_menus" :key="i" >
          <nuxt-link :href="drop_m.link">{{ drop_m.title }}</nuxt-link>
        </li>
      </ul>
      
    </li>
  </ul>
</template>

<script setup lang="ts">
import menu_data from '@/data/menu-data';
// const menu_data = ref<IMenuItem[]>([] as IMenuItem[]);

// onMounted(() => {
	// api.menuData({
	// 	slug: ""
	// })
	// 		.then((d) => console.log(51,menu_data.value = d))
// });
</script>
