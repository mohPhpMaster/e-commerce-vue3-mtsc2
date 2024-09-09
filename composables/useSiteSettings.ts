export function useSiteSettings() {
    const nuxtApp = useNuxtApp();
    const {$settings, $i18n} = nuxtApp;

    const getDefaultNoImageUrl = () => $settings?.noImageUrl || "";
    const title = (title: string = '', page: number = undefined, separator: string = ' - ') => {
        if (title && page) {
            title = `${title}${separator}` + $i18n.t("Page :number", {number: page});
        }
        return title;
    };


    return {
        settings: $settings,
        locales: $settings?.locales || [],
        locale: $settings?.locale || '',

        getDefaultNoImageUrl,
        title,
    };
}
