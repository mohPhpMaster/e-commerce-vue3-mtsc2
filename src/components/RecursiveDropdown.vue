<template>
  <li class="dropdown-submenu">
    <a class="dropdown-item dropdown-toggle" href="#" role="button" @mouseenter.stop="openSubmenu" @mouseleave="closeSubmenu(item)"
       @click="clicked(item)">{{ item.name }}</a>
    <ul class="dropdown-menu" :class="{ show: isOpen }">
      <li v-for="(subItem, index) in item.sub_categories.data" :key="index">
        <RecursiveDropdown v-if="!objectHasEmptyData(subItem.sub_categories)" :item="subItem" @close-siblings="closeSubmenu(item)" :opened="opened"
                           @clicked="clicked(subItem,index)"/>
        <a v-else class="dropdown-item" href="#" @click="clicked(subItem,index)">{{ subItem.name }}</a>
      </li>
    </ul>
  </li>
</template>

<script>
import objectHasEmptyData from "@/utils/objectHasEmptyData";

export default {
	name: 'RecursiveDropdown',
	props: {
		item: {
			type: Object,
			required: true
		},
		opened: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	data() {
		return {
			isOpen: false
		};
	},
	methods: {
		objectHasEmptyData,
		clicked(item,n=0) {
			this.$emit('clicked',item,n);
		},
		openSubmenu() {
			this.isOpen = true;
			this.$emit('close-siblings');
		},
		toggleSubmenu() {
			this.isOpen = !this.isOpen;
			this.$emit('close-siblings');
		},
		closeSubmenu(item) {
			if (item.id === this.item.id)
			{
				return;
			}
			this.isOpen = false;
		}
	},
	watch: {
		opened(newValue) {
			this.isOpen = newValue
		}
	}
};
</script>

<style scoped>
.dropdown-menu {
	display: none;
}

.dropdown-menu.show {
	display: block;
}

.dropdown-submenu {
	position: relative;
}

.dropdown-submenu a::after {
	transform: rotate(-90deg);
	position: absolute;
	right: 6px;
	top: .8em;
}

.dropdown-submenu .dropdown-menu {
	top: 0;
	left: 100%;
	margin-left: .1rem;
	margin-right: .1rem;
}
</style>
