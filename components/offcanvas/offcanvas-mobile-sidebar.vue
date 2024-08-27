<template>
  <div
		  :class="{
			'offcanvas-opened': utilsStore.openMobileMenus
	}"
		  class="offcanvas__area offcanvas__radius"
  >
    <div class="offcanvas__wrapper">
      <div class="offcanvas__close">
        <button class="offcanvas__close-btn offcanvas-close-btn" @click="utilsStore.handleOpenMobileMenu()">
          <svg-close-2 />
        </button>
      </div>
      <div class="offcanvas__content">
        <div
		        class="offcanvas__top mb-70 d-flex justify-content-between align-items-center"
        >
          <div class="offcanvas__logo logo">
            <nuxt-link href="/">
              <img alt="logo" src="/images/logo/logo.svg" />
            </nuxt-link>
          </div>
        </div>
	      <!-- mobile category start -->
        <category-mobile-categories :categories="categories"/>
	      <!-- mobile category end -->
        <div class="tp-main-menu-mobile fix d-lg-none mb-40">
        <!-- mobile menus start -->
        <header-mobile-menus></header-mobile-menus>
	        <!-- mobile menus end -->
        </div>

        <div class="offcanvas__contact align-items-center d-none">
          <div class="offcanvas__contact-icon mr-20">
            <span>
              <img alt="contact_img" src="/images/icon/contact.png" />
            </span>
          </div>
          <div class="offcanvas__contact-content">
            <h3 class="offcanvas__contact-title">
              <a href="tel:098-852-987">004524865</a>
            </h3>
          </div>
        </div>
      </div>
      <div class="offcanvas__bottom">
        <div
		        class="offcanvas__footer d-flex align-items-center justify-content-between"
        >
          <div class="offcanvas__currency-wrapper currency">
            <span
		            id="tp-offcanvas-currency-toggle"
		            class="offcanvas__currency-selected-currency tp-currency-toggle"
		            @click="handleToggleActive('currency')"
            >Currency : USD
            </span>
            <ul
		            :class="`offcanvas__currency-list tp-currency-list ${
                isToggleActive === 'currency' ? 'tp-currency-list-open' : ''
              }`"
            >
              <li>USD</li>
              <li>ERU</li>
              <li>BDT</li>
              <li>INR</li>
            </ul>
          </div>
	        <language-selector />
        </div>
      </div>
    </div>
  </div>

  <div
		  :class="`body-overlay ${utilsStore.openMobileMenus ? 'opened' : ''}`"
		  @click="utilsStore.handleOpenMobileMenu()"
  >
  </div>
</template>

<script lang="ts" setup>
import {useUtilityStore} from "@/pinia/useUtilityStore";

const utilsStore = useUtilityStore();
const props = defineProps<{
	categories: ICategory[],
}>();

let isToggleActive = ref<string>("");
// handle active
const handleToggleActive = (type: string) => {
	if (type === isToggleActive.value) {
		isToggleActive.value = "";
	} else {
		isToggleActive.value = type;
	}
};
</script>
