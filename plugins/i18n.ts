export default defineNuxtPlugin(nuxtApp => {
    const setLanguageHeader = (locale: string) => {
        nuxtApp.$axios.defaults.headers.language = locale || 'en';
    };

    setLanguageHeader(nuxtApp?.$i18n.locale.value || 'en');

    nuxtApp.hook('i18n:beforeLocaleSwitch', ({oldLocale, newLocale, initialSetup, context}) => {
        // console.log(4, 'i18n:beforeLocaleSwitch', oldLocale, newLocale, initialSetup)
        // clearNuxtState();
        useLoading().start();
        scrollToTop()
            .then(() => {
                setLanguageHeader(newLocale);
                reloadNuxtApp({force: true});
            })
        // refreshNuxtData();
    })

    // nuxtApp.hook('i18n:localeSwitched', ({oldLocale, newLocale}) => {
    //     setLanguageHeader(newLocale);
    //     reloadNuxtApp({force: true});
    // refreshNuxtData();
    // console.log(9, 'i18n:localeSwitched', oldLocale, newLocale, nuxtApp?.$axios.defaults.headers.language)
    // })
})
