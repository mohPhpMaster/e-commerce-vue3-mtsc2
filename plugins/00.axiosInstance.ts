import axios from 'axios';
import toolsService from '@/services/toolsService';
import {useUserStore} from "@/pinia/useUserStore";

const headerLanguage = ref('en');

const options = {
    // baseURL: toolsService.getApiUrl(),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'language': headerLanguage,
        'Accept-Language': headerLanguage,
        // 'language': 'en',
    },
};

export const axiosInstance = axios.create(options);

const removeToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
    delete options.headers['Authorization'];
};

export const $axios = {
    ...axiosInstance,
    instance: axiosInstance,
    options,
    headerLanguage,

    setToken: (token?: string) => {
        if (!token) {
            removeToken();
            return;
        }
        // console.log(37, {token})
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        options.headers['Authorization'] = `Bearer ${token}`;
    },

    hasToken: () => {
        const bearer = (axiosInstance.defaults.headers.common?.['Authorization'] || '').split(' ');
        return bearer.length > 1 && String(bearer?.[1]).trim();
    },

    removeToken,

    get(url: string, ...args: any[]) {
        url = encodeURI(url);
        // console.clear();
        // console.log(44, {url, ...args})
        return $axios.instance.get(url, ...args);
    },
};

export default defineNuxtPlugin(() => {
    const {start, stop} = useLoading();
    const config = useRuntimeConfig()
    const userStore = useUserStore();

    $axios.defaults.baseURL = $axios.instance.defaults.baseURL = $axios.options.baseURL = toolsService.getApiUrl();
    $axios.options.headers['Access-Control-Allow-Origin'] = $axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    // Request interceptor
    $axios.instance.interceptors.request.use(config => {
        start();
        return config
    }, error => {
        stop();
        return Promise.reject(error)
    })

    // Response interceptor
    $axios.instance.interceptors.response.use(response => {
        stop();
        return response
    }, (error) => {
        if (error?.response?.status === 401) {
            return navigateTo('/login')
        }
        stop();
        return Promise.reject(error)
    })

    const $f = $fetch.create({
        baseURL: config.public.apiURL || '',
        onRequest({request, options, error}) {
            start();

            let h = {
                ...$axios.options.headers,
                language: headerLanguage.value,
                'Accept-Language': headerLanguage.value,
            };

            options.headers = {
                ...h,
                ...(options.headers || {}),
            }

            if (!options.headers?.Authorization && userStore.token()) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${userStore.token()}`
            }
        },
        onResponse({response}) {
            stop();
            // response._data = new myBusinessResponse(response._data)
        },
        onResponseError({response}) {
            if (response?.status === 401) {
                return navigateTo('/login')
            }
            stop();
        }
    })

    return {
        provide: {
            axios: $axios,
            f: $f
        },
    };
});
