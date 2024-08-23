// i18n.config.ts

export default defineI18nConfig(() => ({
    // We'll fill this in momentarily
    legacy: false,
    fallbackLocale: 'en',
    // translations
    messages: {
        "en": {
            app_title2: "test app",
        },
        "ar": {
            app_title2: "تحربة تطبيق",
        },
    },
}))