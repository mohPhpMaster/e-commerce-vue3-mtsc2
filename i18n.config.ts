// i18n.config.ts

export default defineI18nConfig(async (nuxtApp) => {

    return {
        // We'll fill this in momentarily
        legacy: false,
        fallbackLocale: 'ar',

        // translations
        messages: {
            "en": {
                "Error Page": "Error"
            },
            "ar": {
                "Error Page": "خطأ"
            },
        },
    };
});
