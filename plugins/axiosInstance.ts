import axios from 'axios';
import toolsService from '@/services/toolsService';

const options = {
    // baseURL: toolsService.getApiUrl(),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'language': 'ar',
        // 'language': 'en',
    },
};

export const axiosInstance = axios.create(options);

const removeToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
};

export const $axios = {
    ...axiosInstance,
    instance: axiosInstance,
    options,

    setToken: (token?: string) => {
        if (!token) {
            removeToken();
            return;
        }
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    hasToken: () => {
        const bearer = (axiosInstance.defaults.headers.common?.['Authorization'] || '').split(' ');
        return bearer.length > 1 && String(bearer?.[1]).trim();
    },

    removeToken,

    get(url: string, ...args: any[]) {
        url = encodeURI(url);
        // console.log(44, {url, ...args})
        return $axios.instance.get(url, ...args);
    },
};

export default defineNuxtPlugin(() => {
    $axios.options.baseURL = toolsService.getApiUrl();
    $axios.defaults.baseURL = $axios.instance.defaults.baseURL = $axios.options.baseURL;

    return {
        provide: {
            axios: $axios,
        },
    };
});
