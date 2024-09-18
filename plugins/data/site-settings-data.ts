import {$axios} from "@/plugins/00.axiosInstance";
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
    // todo:
    // console.log(17, settings)
    return {
        currency: settings?.currency || '',
        noImageUrl: settings?.noImageUrl || '',
        perPage: settings?.perPage || 9,
        siteTitle: settings?.siteTitle || '',
        siteKeywords: settings?.keywords || '',
        siteDescription: settings?.description || '',
        siteCopyRight: settings?.copy_right || '',
        logo: settings?.logo || '',
        logoSmall: settings?.logo_sm || '',
        favicon: settings?.favicon || '',
        sliderShow: settings?.slider_show || true,
        phone: settings?.phone || '',
        email: settings?.email || '',
        facebook: settings?.facebook || '',
        twitter: settings?.twitter || '',
        instagram: settings?.instagram || '',
        locales: (settings?.locales || []).map((l: ILocale) => {
            return {
                ...l,
                language: l?.iso || l?.language
            };
        }),
        locale: settings?.locale || '',
        address: settings?.address || '',
        address_url: settings?.google_map_url || '',
        footerBackground: settings?.footer_color || '',
        footerColor: settings?.footer_text_color || '',
        hoverColor: settings?.hover_color || '',
        primaryColor: settings?.website_color || '',
        navbarBackground: settings?.navbar_color || '',
        navbarColor: settings?.navbar_text_color || '',
        priceColor: settings?.prices_color || '',
        priceBackground: settings?.prices_background_color || '',
        categoryColor: settings?.category_text_color || '',
        categoryTitleColor: settings?.category_text_color_title || '',
        categoryTitleBackground: settings?.category_background_color_title || '',
    };
}

export default siteSettingsData;