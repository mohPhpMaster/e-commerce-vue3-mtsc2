// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            noImageUrl: process.env.NUXT_ENV_NO_IMAGE_URL || "/images/no-image.png",
            imagesUrl: process.env.NUXT_ENV_IMAGES_URL || "",
        }
    },
    modules: [[
        '@pinia/nuxt',
        {
            autoImports: [
                'defineStore',
                ['defineStore', 'definePiniaStore'],
            ],
        },
    ],
        '@nuxtjs/i18n',
        "vue3-carousel-nuxt"
    ],
    i18n: {
        strategy: "no_prefix",
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                dir: 'ltr',
                file: 'en.json'
            },
            {
                code: 'ar',
                iso: 'ar-SA',
                name: 'العربية',
                dir: 'rtl',
                file: 'ar.json'
            },
        ],
        defaultLocale: "ar",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected'
        },
        vueI18n: "./i18n.config.ts",
        lazy: true,
        langDir: 'locales',
    },
    app: {
        baseURL: '',
        head: {
            title: "Shofi Grocery - eCommerce Vue Nuxt 3 Template",
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            base: {href: '/'},
            script: [
                {
                    src: "/js/jquery-3.2.1.slim.min.js",
                },
                {
                    src: "/js/bootstrap.bundle.min.js",
                },
            ],
        }
    },

    css: [
        "bootstrap/scss/bootstrap.scss",
        "swiper/css/bundle",
        "@/assets/css/font-awesome-pro.css",
        "@/assets/css/flaticon_shofy.css",
        "@/assets/scss/main.scss",
    ],

    plugins: [
        {src: "~/plugins/axiosInstance.ts", ssr: false},
        {src: "~/plugins/api.ts", ssr: false},
        {src: "~/plugins/i18n.ts", ssr: false},
        {src: "~/plugins/yupLocale.ts", mode: "client"},
    ],
})