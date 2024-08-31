import type {ISiteSettings} from "@/types/site-settings-d-t";
import {convertSiteSettingsResponse} from "@/plugins/data/site-settings-data";

export function useSiteSettings() {
    // const $settings = ref<ISiteSettings>({} as ISiteSettings);
    const nuxtApp = useNuxtApp();
    const config = useRuntimeConfig();
    //
    // onServerPrefetch(async () => {
    //     // const {data, error, execute} = useAsyncData('site-settings', fetchData);
    //     //
    //     // if (error.value) {
    //     //     console.error('Failed to load default settings:', error.value);
    //     //     return;
    //     // }
    //
    //     $settings.value = await nuxtApp.$axios.get('site-settings').then(res => {
    //         return (res?.data?.data || []).map(convertSiteSettingsResponse)[0];
    //     });
    //     $settings.value.noImageUrl = $settings.value?.noImageUrl || config?.public?.noImageUrl
    //     $settings.value.apiURL = $settings.value?.apiURL || config?.public?.apiURL
    //     $settings.value.perPage = Number($settings.value?.perPage || config?.public?.perPage || 9)
    //     $settings.value.siteTitle = $settings.value?.siteTitle || config?.public?.siteTitle
    // })
    const {$settings} = nuxtApp;

    return {
        settings: $settings,
        getDefaultNoImageUrl: () => $settings?.noImageUrl || "",
        title: (title: string = '', page?: number = undefined, separator: string = ' - ') => {
            if (title && page) {
                title = `${title}${separator}` + useI18n().t("Page :number", {number: page})
            }

            return title;
        },
    };
}
