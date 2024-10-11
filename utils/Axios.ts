import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import type {IAxios} from "@/types/axios-d-t";

const headerLanguage = ref('en');
const optionsBag: AxiosRequestConfig = {
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

export const instance: AxiosInstance = axios.create(optionsBag);

export const $axios: IAxios = {
    ...instance,
    instance,
    optionsBag,
    headerLanguage,
    removeToken() {
        delete this.instance.defaults.headers.common['Authorization'];
        delete this.optionsBag.headers['Authorization'];
    },
    setToken(token?: string) {
        if (!token) {
            this.removeToken();
            return;
        }
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.optionsBag.headers['Authorization'] = `Bearer ${token}`;
    },
    hasToken() {
        const bearer = (this.instance.defaults.headers.common?.['Authorization'] || this.optionsBag.headers?.['Authorization'] || '').split(' ');
        return bearer.length > 1 && String(bearer?.[1]).trim();
    },
    get(url: string, ...args: any[]) {
        url = encodeURI(url);
        return this.instance.get(url, ...args);
    }
};

// $axios.instance = axiosInstance;
// $axios.optionsBag = optionsBag;
// $axios.headerLanguage = headerLanguage;
//
// $axios.removeToken = () => {
//     delete axiosInstance.defaults.headers.common['Authorization'];
//     delete optionsBag.headers['Authorization'];
// };
// $axios.setToken = (token?: string) => {
//     if (!token) {
//         $axios.removeToken();
//         return;
//     }
//     // console.log(37, {token})
//     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     optionsBag.headers['Authorization'] = `Bearer ${token}`;
// }
// $axios.hasToken = () => {
//     const bearer = (axiosInstance.defaults.headers.common?.['Authorization'] || optionsBag.headers?.['Authorization'] || '').split(' ');
//     return bearer.length > 1 && String(bearer?.[1]).trim();
// }
//
// $axios.get = (url: string, ...args: any[]) => {
//     url = encodeURI(url);
//     return $axios.instance.get(url, ...args);
// };

export default $axios;
