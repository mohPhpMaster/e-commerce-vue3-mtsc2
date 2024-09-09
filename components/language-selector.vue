<template>
  <div class="offcanvas__select language d-sm-block d-none my-3">
    <div class="offcanvas__lang d-flex align-items-center justify-content-as-locale">
      <div class="offcanvas__lang-img mr-15">
        <img :src="localeServices.selectedLanguageFlag" alt="language-flag" class="language-flag" />
      </div>
      <div class="offcanvas__lang-wrapper">
        <span
		        id="tp-offcanvas-lang-toggle"
		        :class="{
					    'opened': isToggleActive === 'lang',
		        }"
		        class="offcanvas__lang-selected-lang tp-lang-toggle"
		        @click="toggleDropdown()"
        >
          {{ localeServices.selectedLanguageName() }}
        </span>
        <ul
		        :class="`border offcanvas__lang-list tp-lang-list ${isToggleActive === 'lang' ? 'tp-lang-list-open' : ''}`"
        >
          <li
		          v-for="(language) in localeServices.locales()"
		          :key="language.code"
		          :class="{
						'border-0 disabled': language.code === localeServices.selectedLanguage()
          }"
		          class="btn "
		          @click="changeLocale(language.code, $event)"
          >
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

const changeLocale = (language: string, event) => {
	if (language === localeServices.selectedLanguage()) {
		if (event) {
			event.preventDefault();
			return false;
		}
	}
	localeServices.changeLanguage(language);
	toggleDropdown();
};
</script>

<style lang="scss">
@use "sass:selector";

@mixin rtl {
	[dir=rtl] & {
		@content;
	}
}

.language-flag {
	width: 24px;
}

.offcanvas__select.language {
	direction: ltr;
}

.justify-content-as-locale {
	justify-content: start;

	@include rtl {
		justify-content: end !important;
	}
}

</style>