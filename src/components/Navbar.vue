<template>
	<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link :to="{name : 'Home'}" class="navbar-brand">
      <img id="logo" alt="logo" src="../assets/icon.png" />
    </router-link>

      <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-target="#navbarSupportedContent" data-toggle="collapse" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
	    <form ref="searchForm" class="form-inline ml-auto mr-auto" @submit="searchSite($event)">
        <div class="input-group">
          <input
		          v-model="searchText"
		          aria-describedby="search-button-navbar"
		          aria-label="ابحث عن منتجات"
		          autofocus
		          class="form-control"
		          placeholder="ابحث عن منتجات"
		          size="100"
		          type="text"
          >
          <div class="input-group-prepend pointer">
            <button id="search-button-navbar" class="input-group-text" role="button" @click="$refs.searchForm.submit()">
							<i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>

	    <!--      <li class="nav-item dropdown">-->
	    <!--        <a id="navbarDropdownX" aria-expanded="false" aria-haspopup="true" class="nav-link text-light dropdown-toggle" data-toggle="dropdown" href="#" role="button">-->
	    <!--            Test-->
	    <!--        </a>-->
	    <!--        <div aria-labelledby="navbarDropdownX" class="dropdown-menu">-->
	    <!--            <router-link :to="{name : 'test'}" class="dropdown-item">TEST</router-link>-->
	    <!--        </div>-->
	    <!--      </li>-->

			<li class="nav-item dropdown">
	      <a
			      id="navbarDropdown"
			      aria-expanded="false"
			      aria-haspopup="true"
			      class="nav-link text-light dropdown-toggle"
			      data-toggle="dropdown"
			      href="#"
			      role="button"
	      >
	          Accounts
	      </a>
	      <div aria-labelledby="navbarDropdown" class="dropdown-menu">
	          <router-link v-if="!token" :to="{name: 'WishList'}" class="dropdown-item">WishList</router-link>
	          <router-link v-else :to="{name : 'WishList'}" class="dropdown-item">WishList</router-link>

	          <router-link v-if="token" :to="{name : 'Home'}" class="dropdown-item">Wallet</router-link>
	          <router-link v-if="token" :to="{name : 'OrderHistory'}" class="dropdown-item">Order History</router-link>
	          <router-link v-if="!token" :to="{name: 'Signin'}" class="dropdown-item">Log In</router-link>
	          <router-link v-if="!token" :to="{name: 'Signup'}" class="dropdown-item">Sign Up</router-link>

	          <a v-if="token" class="dropdown-item" href="#" @click="signout">Sign Out</a>
	      </div>
	    </li>

	    <li class="nav-item">
	      <router-link
			      :to="{name : 'Cart'}"
			      class="text-light "
	      ><i class="fa fa-shopping-cart btn-cart-icon"></i></router-link>
	    </li>
    </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<NavbarMenu :menu-items="menus" />
    </nav>
	</div>
</template>

<script>
// import VMenuMultiLevel from 'v-menu-multi-level'
// import 'v-menu-multi-level/dist/v-menu-multi-level.css'
import swal from 'sweetalert';
import NavbarMenu from "@/components/NavbarMenu.vue";
import {mapGetters} from "vuex";
import {triggerSiteSearch} from "@/plugins/axios";

export default {
	name: "Navbar",
	components: {
		NavbarMenu
		// VMenuMultiLevel
	},
	data() {
		return {
			token: null,
			menuItems: null,
			searchText: "",
		};
	},
	methods: {
		searchSite($event) {
			$event.preventDefault();
			// $event.stopPropagation();
			// $event.stopImmediatePropagation();

			if (this.searchText) {
				triggerSiteSearch(this.searchText);
			}
		},
		// logout
		logout() {
			localStorage.removeItem('token');
			this.token = null;
			this.$router.push({name: 'Home'});
			swal({
				text: "Logged you out. Visit Again",
				icon: "success",
				closeOnClickOutside: false,
			});
		},
		signout() {
			localStorage.removeItem('token');
			this.token = null;
			this.$router.push({name: 'Home'});
			swal({
				text: "Logged you out. Visit Again",
				icon: "success",
				closeOnClickOutside: false,
			});
		},
		clicked($event) {

		}
	},
	mounted() {
		this.token = localStorage.getItem('token');
	},
	computed: {
		...mapGetters(['menus']),
	},
	created() {
		// get menu items
		// this.menuItems = this.$store.getters.menus;
	}
}
</script>

<style scoped>
	.btn-cart-icon {
		font-size: 36px;
	}

	#logo {
		width: 150px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.nav-link {
		color: rgba(255, 255, 255);
	}

	#search-button-navbar {
		background-color: #febd69;
		border-color: #febd69;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}
</style>
