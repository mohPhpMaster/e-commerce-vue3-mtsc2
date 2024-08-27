import {$axios} from "@/plugins/axiosInstance";
import type {ISiteSettings} from "@/types/site-settings-d-t";
import type {ISiteSettingsResponse} from "@/types/site-settings-response-d-t";

export async function siteSettingsData(): Promise<ISiteSettings> {
    try {
        const response: { data: { data: ISiteSettingsResponse[] } } = await $axios.get('site-settings');
        const settings = response?.data?.data || [];
        return settings.map(convertSiteSettingsResponse)?.[0];
    } catch (error) {
        console.error('Error fetching Site Settings data:', error);
        return {} as ISiteSettings;
    }
}

export function convertSiteSettingsResponse(settings: ISiteSettingsResponse): ISiteSettings {
    return settings;
}

export default siteSettingsData;