<template>
  <nav>
    <ul class="navbar-nav">
      <li class="nav-item dropdown" @click="toggleDropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" role="button">
          {{menuItem.name}}
        </a>
        <ul v-if="menuItem.subItems" class="dropdown-menu" :class="{ show: isDropdownOpen }">
          <li v-for="($item, $index) in menuItem.subItems" :key="$index">
            <RecursiveDropdown v-if="$item.subItems" :item="$item" @close-siblings="handleCloseSiblings($item)" />
            <a v-else class="dropdown-item" href="#">{{ $item.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import RecursiveDropdown from './RecursiveDropdown.vue';

export default {
	name: 'NavbarMainMenu',
	components: {
		RecursiveDropdown
	},
	mounted() {

	},
	data() {
		return {
			isDropdownOpen: false
		};
	},
	props: {
		menuItem: {
			type: Array,
			required: true
		}
	},
	methods: {
		toggleDropdown() {
			this.isDropdownOpen = !this.isDropdownOpen;
		},
		handleCloseSiblings(item) {
			this.isDropdownOpen = false;
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
</style>
