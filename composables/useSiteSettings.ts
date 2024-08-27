import type { ISiteSettings } from "@/types/site-settings-d-t";

export function useSiteSettings() {
    const { $settings } = useNuxtApp();

    const currency = (value: number | string | undefined = 0) => {
        value = Number(value || 0) || 0;
        return $settings?.currency + " " + parseFloat(value).toFixed(2);
    };

    return {
        currency,
        siteSettings: $settings as ISiteSettings,
        getDefaultNoImageUrl: () => $settings?.noImageUrl || "",
    };
}
