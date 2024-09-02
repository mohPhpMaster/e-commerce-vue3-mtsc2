import type {ISiteSettings} from "@/types/site-settings-d-t";
import {convertSiteSettingsResponse} from "@/plugins/data/site-settings-data";

export function useSiteSettings() {
    // Ensure useNuxtApp and useRuntimeConfig are called at the top level
    const nuxtApp = useNuxtApp();
    const {$settings, $i18n} = nuxtApp;
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

    // Use these variables directly without wrapping them in lifecycle hooks
    const getDefaultNoImageUrl = () => $settings?.noImageUrl || "";

    const title = (title: string = '', page: number = undefined, separator: string = ' - ') => {
        if (title && page) {
            title = `${title}${separator}` + $i18n.t("Page :number", {number: page});
        }
        return title;
    };

    // If you need to fetch and set site settings, do it directly here, or better yet,
    // if you need server-side fetching, consider using useAsyncData or useFetch in a setup function where applicable

    return {
        settings: $settings,
        getDefaultNoImageUrl,
        title,
    };
}
