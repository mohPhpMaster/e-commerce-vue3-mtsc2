export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.$axios.defaults.headers.language = nuxtApp?.$i18n.locale.value || nuxtApp.$axios.defaults.headers.language || 'en';

    nuxtApp.hook('i18n:beforeLocaleSwitch', ({oldLocale, newLocale, initialSetup, context}) => {
        console.log(4, 'i18n:beforeLocaleSwitch', oldLocale, newLocale, initialSetup)
    })

    nuxtApp.hook('i18n:localeSwitched', ({oldLocale, newLocale}) => {
        nuxtApp.$axios.defaults.headers.language = newLocale || 'en';

        reloadNuxtApp({force: true});

        console.log(9, 'i18n:localeSwitched', oldLocale, newLocale, nuxtApp?.$axios.defaults.headers.language)
    })
})
