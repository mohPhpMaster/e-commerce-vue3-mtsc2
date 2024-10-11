import toolsService from '@/services/toolsService';
import type {IUser} from "@/types/user-d-t";

export default defineNuxtPlugin((nuxtApp) => {
    const {start, stop} = useLoading();
    const $config = useRuntimeConfig();
    const cookies = useCookie<IUser>('user', {
        // parseJSON: true,
        persist: true,
        watch: true
    });

    const apiUrl = $config?.public?.apiUrl || toolsService.getApiUrl() || "";
    $axios.defaults.baseURL = $axios.instance.defaults.baseURL = $axios.optionsBag.baseURL = apiUrl;
    $axios.optionsBag.headers['Access-Control-Allow-Origin'] = $axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    $axios.instance.interceptors.request.use(config => {
        start();
        return config;
    }, error => {
        stop();
        return Promise.reject(error);
    });

    $axios.instance.interceptors.response.use(response => {
        stop();
        return response;
    }, (error) => {
        stop();
        if (error?.response?.status === 401) {
            try {
                return nuxtApp.$router.push('/login'); // Ensure using `nuxtApp` instance
            } catch (e) {
                console.error(e);
            }
        }
        return Promise.reject(error);
    });

    const $f = $fetch.create({
        baseURL: apiUrl,
        onRequest({request, options, error}) {
            start();

            options.headers = {
                ...$axios.optionsBag.headers,
                language: $axios.headerLanguage.value,
                'Accept-Language': $axios.headerLanguage.value,
                ...(options.headers || {}),
            };

            if (!options.headers?.Authorization && cookies.value?.token) {
                options.headers.Authorization = `Bearer ${cookies.value?.token}`;
            }
        },
        onResponse({response}) {
            stop();
            // response._data = new myBusinessResponse(response._data)
        },
        onResponseError({response}) {
            stop();
            if (response?.status === 401) {
                try {
                    return nuxtApp.$router.push('/login'); // Ensure using `nuxtApp` instance
                } catch (e) {
                    console.error(e);
                }
            }
        }
    });

    return {
        provide: {
            axios: $axios,
            f: $f,
        },
    };
});
