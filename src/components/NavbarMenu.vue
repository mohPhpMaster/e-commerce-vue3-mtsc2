<template>
    <ul class="navbar-nav" >
      <li v-for="(menuItem, index) in menuItems" :key="index" class="nav-item dropdown">
        <a class="nav-link text-white" :class='{"dropdown-toggle": !objectHasEmptyData(menuItem.sub_categories)}' href="#" role="button" @mouseenter="toggleDropdown(menuItem)" @click="clicked(menuItem,1)">
          {{ menuItem.name}}
        </a>
        <ul v-if="!objectHasEmptyData(menuItem.sub_categories)" class="dropdown-menu" :class="{ show: checkDropdownOpen(menuItem.id) }"
            @mouseleave="toggleDropdown(menuItem)">
          <li v-for="($item, $index) in menuItem.sub_categories.data" :key="$index">
            <RecursiveDropdown v-if="!objectHasEmptyData($item.sub_categories)" :item="$item" @close-siblings="handleCloseSiblings(menuItem)" :opened="!isDropdownOpen[menuItem.id]"
                               @mouseleave="toggleDropdown(menuItem)"
                               @clicked="clicked($event)"/>
            <a v-else class="dropdown-item" href="#" @click="clicked($item,index)">{{ $item.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
</template>

<script>
import RecursiveDropdown from './RecursiveDropdown.vue';
import NavbarMainMenu from "./NavbarMainMenu.vue";
import goTo from "@/utils/goTo";
import objectHasEmptyData from "@/utils/objectHasEmptyData";

export default {
	name: 'MainComponent',
	components: {
		NavbarMainMenu,
		RecursiveDropdown
	},
	props: {
		menuItems: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			isDropdownOpen: [],
		};
	},
	methods: {
		objectHasEmptyData,
		clicked(item,n=0) {
			goTo("ShowCategory", {id: item.slug});
		},
		toggleDropdown(item) {
			this.isDropdownOpen[item.id] = !(this.isDropdownOpen[item.id] || false);
			this.handleCloseSiblings(item);
		},
		handleCloseSiblings(item) {
			this.isDropdownOpen.map((value, key) => {
				if (String(key).trim() !== String(item.id).trim()) {
					this.isDropdownOpen[String(key).trim()] = false
				}
			});
			this.$emit('close-siblings');
		},
		checkDropdownOpen(id) {
			return this.isDropdownOpen[id] || false;
		}
	},
	mounted() {

	}
};
</script>

<style scoped>
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
