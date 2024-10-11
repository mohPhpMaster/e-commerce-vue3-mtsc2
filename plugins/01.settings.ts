import {ref} from 'vue';
import {convertSiteSettingsResponse} from "@/plugins/data/site-settings-data";

export default defineNuxtPlugin(async (nuxtApp) => {
    const settings = ref<ISiteSettings | null>(null);
    const config = useRuntimeConfig();
    const getDefaultLocale = () => nuxtApp?.$i18n?.getLocaleCookie() || nuxtApp?.$i18n?.locale?.value || nuxtApp?.$settings?.locale || nuxtApp?.$i18n.defaultLocale || nuxtApp.$axios.headerLanguage.value;

    try {
        const {data, error} = await useLazyAsyncData('site-settings', () =>
            nuxtApp.$axios.get('site-settings', {
                headers: {
                    'Accept-Language': getDefaultLocale(),
                    'language': getDefaultLocale(),
                }
            }).then(res => convertSiteSettingsResponse(res?.data?.data || {}))
        );

        if (error.value) {
            console.error('Failed to load default settings:', error.value);
            return;
        }

        settings.value = data.value;
        settings.value.noImageUrl = settings.value?.noImageUrl || config?.public?.noImageUrl
        settings.value.apiUrl = config?.public?.apiUrl
        settings.value.baseUrl = config?.public?.baseUrl
        settings.value.perPage = Number(settings.value?.perPage || config?.public?.perPage || 9)
        settings.value.siteTitle = settings.value?.siteTitle || config?.public?.siteTitle
        settings.value.updateSlugOnLocale = Boolean(settings.value?.updateSlugOnLocale === undefined ? config?.public?.updateSlugOnLocale : settings.value.updateSlugOnLocale)

        nuxtApp.provide('settings', settings.value);
        nuxtApp.provide('locales', settings.value?.locales);
        nuxtApp.provide('locale', settings.value?.locale);
        nuxtApp.provide('baseUrl', settings.value?.baseUrl);

        // return {
        //     provide: {
        //         settings: settings.value,
        //     },
        // };
    } catch (error) {
        console.error('Failed to load default settings:', error);
    }
});
