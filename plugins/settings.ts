import { ref } from 'vue';
import { convertSiteSettingsResponse } from "@/plugins/data/site-settings-data";
import toolsService from "@/services/toolsService";
import {$axios} from "@/plugins/axiosInstance";

export default defineNuxtPlugin(async (nuxtApp) => {
    const settings = ref<ISiteSettings | null>(null);

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
        settings.value.noImageUrl = toolsService.getDefaultNoImageUrl()
        settings.value.apiURL = toolsService.getApiUrl()
        settings.value.perPage = Number(useRuntimeConfig()?.public?.perPage || 9)

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
