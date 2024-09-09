export default defineNuxtPlugin(async (nuxtApp) => {
    const getDefaultLocale = () => nuxtApp?.$i18n?.getLocaleCookie() || nuxtApp?.$i18n?.locale?.value || nuxtApp?.$settings?.locale || nuxtApp?.$i18n.defaultLocale || nuxtApp.$axios.headerLanguage.value;

    try {
        const {
            data: translationData,
            error: translationError
        } = await useLazyAsyncData('site-translations-' + getDefaultLocale(), () =>
            nuxtApp
                .$axios
                .get('translations', {
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        'Accept-Language': getDefaultLocale(),
                        'language': getDefaultLocale(),
                    }
                })
                .then(res => {
                    return {
                        [getDefaultLocale()]: (res?.data?.data || {})
                    };
                })
        );

        if (translationError.value) {
            console.error('Failed to load translations:', translationError.value);
            return;
        }

        nuxtApp.provide('translations', translationData);
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
});
