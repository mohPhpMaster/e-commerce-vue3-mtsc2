import {defineStore} from 'pinia';

export const useLocaleStore = defineStore('locale', () => {
    const $i18n = ref();
    const {$i18n: _i18n, $translations: _translations, $locales: _locales, $locale: _locale} = useNuxtApp();
    Object.keys(_translations.value).forEach((key) => {
        _translations.value.hasOwnProperty(key) && _i18n.mergeLocaleMessage(key, _translations.value[key])
    });

    const selectedLanguage = (): string => {
        return useNuxtApp()?.$i18n?.getLocaleCookie() || useNuxtApp()?.$i18n.defaultLocale || _locale || 'en';
    };

    const i18n = (): ReturnType<typeof useI18n> => {
        const _selectedLanguage = selectedLanguage();

        $i18n.value = $i18n.value || useI18n({
            locale: _selectedLanguage,
        });

        (_selectedLanguage in _translations.value) && $i18n.value.mergeLocaleMessage(_selectedLanguage, _translations.value[_selectedLanguage]);

        return $i18n;
    };

    const locales = (): [] => {
        let $_locales = [];

        return [
            ..._locales,
            ...i18n().value.locales,
        ].filter((l) => {
            if ($_locales.includes(l?.iso || l.name))
            {
                return false;
            }

            $_locales.push(l?.iso || l.name);
            return true;
        });
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
        _i18n,
        _translations,
        _locales,
        _locale,
        selectedLanguageFlag: computed(()=> {
            return `/images/icon/${selectedLanguage()}.svg`;
        }),
    };
});
