// import {setLocale} from 'yup';
import {useI18n} from 'vue-i18n';

const $i18n = ref();

const selectedLanguage = (): string => {
    return useNuxtApp()?.$i18n?.getLocaleCookie() || useNuxtApp()?.$i18n.defaultLocale || 'en'
};

const i18n = (): ReturnType<typeof useI18n> => {
    $i18n.value = $i18n.value || useI18n({
        locale: selectedLanguage()
    })
    return $i18n;
};

const locales = (): [] => {
    return i18n().value.locales
};

const locale = (): string => {
    return i18n().value.locale;
};

const selectedLanguageName = (): string => {
    return locales().find((l) => l.code === locale())?.name;
};

const localeService = {
    locales,
    locale,
    selectedLanguageName,
    selectedLanguage,

    get $i18n() {
        return i18n();
    },
    get i18n() {
        return i18n().value;
    },
    get selectedLanguageFlag() {
        return `/images/icon/${selectedLanguage()}.svg`;
    },

    async changeLanguage(language: string) {
        i18n().value.setLocale(language);
        i18n().value.setLocaleCookie(language);
        // console.log(48, $i18n.value.t('validation.required'))
        // setLocale({
        //     mixed: {
        //         required: $i18n.value.t('validation.required'),
        //     },
        //     string: {
        //         email: $i18n.value.t('validation.email'),
        //         min: ({min}) => $i18n.value.t('validation.min', {min}),
        //         max: ({max}) => $i18n.value.t('validation.max', {max}),
        //     }
        // });

        return locale();
    },
    async checkLanguage() {
        let lang = selectedLanguage();
        if (lang && lang !== locale()) {
            this.changeLanguage(lang)
        }

        return lang
    },

}

export default localeService;