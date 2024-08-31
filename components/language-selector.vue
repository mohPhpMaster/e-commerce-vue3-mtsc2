<template>
  <div class="offcanvas__select language">
    <div class="offcanvas__lang d-flex align-items-center justify-content-md-end">
      <div class="offcanvas__lang-img mr-15">
        <img alt="language-flag" :src="localeServices.selectedLanguageFlag" class="language-flag"/>
      </div>
      <div class="offcanvas__lang-wrapper">
        <span
		        id="tp-offcanvas-lang-toggle"
		        class="offcanvas__lang-selected-lang tp-lang-toggle"
		        @click="toggleDropdown()"
        >
          {{ localeServices.selectedLanguageName() }}
        </span>
        <ul
		        :class="`offcanvas__lang-list tp-lang-list ${isToggleActive === 'lang' ? 'tp-lang-list-open' : ''}`"
        >
          <li v-for="(language) in localeServices.locales()" :key="language.code" @click="changeLocale(language.code)">
            {{ language.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useLocaleStore} from "@/pinia/useLocaleStore";

const localeServices = useLocaleStore();
const isToggleActive = ref<string>('');

const toggleDropdown = () => {
	isToggleActive.value = 'lang' === isToggleActive.value ? '' : 'lang';
};

const changeLocale = (language: string) => {
	localeServices.changeLanguage(language);
	toggleDropdown();
};

</script>

<style lang="scss">
.language-flag {
	width: 24px;
}
</style>