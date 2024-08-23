import axios from "axios";
import {ref} from "vue";

// const cache: { [url: string]: any } = ref<{ [url: string]: any }>([]);

const options = {
    baseURL: 'https://mobark.mtsc.tech/api',
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
            return
        }

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    hasToken: () => {
        let bearer = (axiosInstance.defaults.headers.common?.['Authorization'] || '').split(' ');
        return (bearer.length > 1 && String(bearer?.[1]).trim());
    },

    removeToken,

    get(url: string, ...args: any[]) {
        // if (cache[url]) {
        //     return cache[url];
        // }
        url = encodeURI(url);
        const data = $axios.instance.get(url, ...args);
        // cache[url] = data;

        return data;
    },
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            axios: $axios
        },
    }
});