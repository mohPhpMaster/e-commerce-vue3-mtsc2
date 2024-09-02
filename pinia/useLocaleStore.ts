import {defineStore} from 'pinia';

export const useLocaleStore = defineStore('locale', () => {
    const $i18n = ref();

    const selectedLanguage = (): string => {
        return useNuxtApp()?.$i18n?.getLocaleCookie() || useNuxtApp()?.$i18n.defaultLocale || 'en';
    };

    const i18n = (): ReturnType<typeof useI18n> => {
        $i18n.value = $i18n.value || useI18n({
            locale: selectedLanguage(),
        });
        return $i18n;
    };

    const locales = (): [] => {
        return i18n().value.locales;
    };

    const locale = (): string => {
        return i18n().value.locale;
    };

    const selectedLanguageName = (): string => {
        return locales().find((l) => l.code === locale())?.name;
    };

    const selectedLanguageIso = (): string => {
        return locales().find((l) => l.code === locale())?.iso;
    };

    const selectedLocale = () => {
        return locales().find((l) => l.code === locale());
    };

    const changeLanguage = async (language: string) => {
        i18n().value.setLocale(language);
        i18n().value.setLocaleCookie(language);

        return locale();
    };

    const checkLanguage = async () => {
        const lang = selectedLanguage();
        if (lang && lang !== locale()) {
            await changeLanguage(lang);
        }

        return lang;
    };

    return {
        locales,
        locale,
        selectedLanguageName,
        selectedLanguageIso,
        selectedLanguage,
        selectedLocale,
        changeLanguage,
        checkLanguage,
        i18n,
        selectedLanguageFlag: computed(()=> {
            return `/images/icon/${selectedLanguage()}.svg`;
        }),
    };
});
