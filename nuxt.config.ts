// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            noImageUrl: process.env.NUXT_ENV_NO_IMAGE_URL || "/images/no-image.png",
            imagesUrl: process.env.NUXT_ENV_IMAGES_URL || "",
            apiURL: process.env.NUXT_ENV_API_URL || "",
            perPage: process.env.NUXT_ENV_PER_PAGE || 9,
            siteTitle: process.env.NUXT_ENV_SITE_TITLE || "Shop1",
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
        "vue3-carousel-nuxt",
        'nuxt-purgecss'
    ],

    // vite: {
    //     cacheDir: 'node_modules/.vite',
    //     // You can add Vite options here
    //     server: {
    //         hmr: true, // Enable Hot Module Replacement
    //     },
    //     optimizeDeps: {
    //         include: ['axios'], // List dependencies to optimize
    //     },
    //     resolve: {
    //         alias: {
    //             // '@': '/<path-to-your-src>', // Adjust the path as needed
    //         },
    //     },
    //     build: {
    //         // Customize build options here
    //         // outDir: 'dist', // Output directory for the build
    //         minify: 'esbuild', // Minification options
    //     },
    //     plugins: [
    //         // Add any Vite plugins you need
    //     ],
    // },

    purgecss: {
        enabled: false,
        safelist: [],
    },

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
            title: "",
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
        // {src: "~/plugins/loadingIndicator.ts", mode: "all", order: -1},
        {src: "~/plugins/axiosInstance.ts", mode: "all" },
        {src: "~/plugins/settings.ts", mode: "all"},
        {src: "~/plugins/api.ts", ssr: false},
        {src: "~/plugins/i18n.ts", ssr: false},
        {src: "~/plugins/yupLocale.ts", mode: "client"},
    ],

    devtools: {
        enable: false
    },
})