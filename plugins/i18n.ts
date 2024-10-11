export default defineNuxtPlugin(async (nuxtApp) => {
    const setLanguageHeader = (locale: string) => {
        nuxtApp.$axios.headerLanguage.value = locale || 'en';

        nuxtApp.$axios.defaults.headers.language = locale || 'en';
        nuxtApp.$axios.defaults.headers['Accept-Language'] = locale || 'en';

        nuxtApp.$axios.optionsBag.headers.language = locale || 'en';
        nuxtApp.$axios.optionsBag.headers['Accept-Language'] = locale || 'en';
    };

    setLanguageHeader(nuxtApp?.$i18n.locale.value || 'en');

    // nuxtApp.hook('i18n:beforeLocaleSwitch', ({oldLocale, newLocale, initialSetup, context}) => {
    // console.log(4, 'i18n:beforeLocaleSwitch', oldLocale, newLocale, initialSetup)
    // clearNuxtState();
    //
    // lastRoute.setLastRoute();
    //
    // useLoading().start();
    // scrollToTop()
    //     .then(() => {
    //         setLanguageHeader(newLocale);
    //         reloadNuxtApp({force: true});
    //     })
    // refreshNuxtData();
    // })

    nuxtApp.hook('i18n:localeSwitched', ({oldLocale, newLocale}) => {
        useLoading().start();

        scrollToTop()
            .then(async () => {
                setLanguageHeader(newLocale);
                // refreshNuxtData('site-translations');

                const {category, brand, product} = useRouter().currentRoute.value?.params || {};
                const dataKey = category ? `categories_${category}` : (brand ? `brands_${brand}` : (product ? `product_${product}` : null));
                // debugger
                if (nuxtApp?.$settings?.updateSlugOnLocale === true && dataKey) {
                    await refreshNuxtData(dataKey);
                }
            })
            .then(() => {
                reloadNuxtApp({force: true});
            })
    })
})
