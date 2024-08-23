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
import localeServices from "@/services/localeService";
// import LocaleService from "@/services/LocaleService";
// const {selectedLanguageFlag, selectedLanguageName, selectedLanguage, locale, changeLanguage, locales} = localeServices;
// const {locale, locales,setLocale} = useI18n();
// const selectedLanguage = computed(() => localeService.selectedLanguage )
// const selectedLanguage = computed(() => {
// 	return typeof window !== 'undefined' && window.localStorage.getItem('selectedLanguage') || 'en'
// });
// const locales = computed(() => LocaleService.getLocales());
// const selectedLanguageName = computed(() => LocaleService.getCurrentLocaleName());
// const selectedLanguageFlag = computed(() => `/images/icon/${LocaleService.getCurrentLocale()}.svg`);
const isToggleActive = ref<string>('');

const toggleDropdown = () => {
	isToggleActive.value = 'lang' === isToggleActive.value ? '' : 'lang';
};

const changeLocale = (language: string) => {
	// LocaleService.setLocaleTo(language);
	localeServices.changeLanguage(language);
	toggleDropdown();

  // const currentRoute = router.currentRoute.value;
  // router.push({ path: currentRoute.fullPath, query: { ...currentRoute.query, lang: language } });
	// location.reload();
};

</script>

<style lang="scss">
.language-flag {
	width: 24px;
}
</style>