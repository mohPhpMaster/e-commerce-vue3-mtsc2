export default defineNuxtPlugin(async (nuxtApp) => {
    const getDefaultLocale = () => nuxtApp?.$i18n?.getLocaleCookie() || nuxtApp?.$i18n?.locale?.value || nuxtApp?.$settings?.locale || nuxtApp?.$i18n.defaultLocale || nuxtApp.$axios.headerLanguage.value;

    const localTranslations = ref({
        [getDefaultLocale()]: (await import(`@/locales/${getDefaultLocale()}.json`)).default
    });
    try {
        const {
            data: translationData,
            error: translationError
        } = await useLazyAsyncData('site-translations-' + getDefaultLocale(), () =>
            nuxtApp
                .$axios
                .get('translations', {
                    // baseURL: "http://localhost:3000/api",
                    headers: {
                        'Accept-Language': getDefaultLocale(),
                        'language': getDefaultLocale(),
                    }
                })
                .then(res => {
                    return {
                        [getDefaultLocale()]: ({
                            ...localTranslations.value[getDefaultLocale()],
                            ...(res?.data?.data || {})
                        })
                    };
                })
        );

        if (translationError.value) {
            throw translationError.value;
        }
        localTranslations.value = {
            ...localTranslations.value,
            ...translationData.value
        };
        // nuxtApp.provide('translations', localTranslations);
    } catch (error) {
    }

    nuxtApp.provide('translations', localTranslations);
});