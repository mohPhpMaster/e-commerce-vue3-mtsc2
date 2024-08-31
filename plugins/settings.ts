import { ref } from 'vue';
import { convertSiteSettingsResponse } from "@/plugins/data/site-settings-data";
import toolsService from "@/services/toolsService";
import {$axios} from "@/plugins/axiosInstance";

export default defineNuxtPlugin(async (nuxtApp) => {
    const settings = ref<ISiteSettings | null>(null);
    const config = useRuntimeConfig();

    try {
        const { data, error } = await useLazyAsyncData('site-settings', () =>
            nuxtApp.$axios.get('site-settings').then(res => {
                return (res?.data?.data || []).map(convertSiteSettingsResponse)[0];
            })
        );

        if (error.value) {
            console.error('Failed to load default settings:', error.value);
            return;
        }

        settings.value = data.value;
        settings.value.noImageUrl = settings.value?.noImageUrl || config?.public?.noImageUrl
        settings.value.apiURL = settings.value?.apiURL || config?.public?.apiURL
        settings.value.perPage = Number(settings.value?.perPage || config?.public?.perPage || 9)
        settings.value.siteTitle = settings.value?.siteTitle || config?.public?.siteTitle

        nuxtApp.provide('settings', settings.value);
        // return {
        //     provide: {
        //         settings: settings.value,
        //     },
        // };
    } catch (error) {
        console.error('Failed to load default settings:', error);
    }
});
