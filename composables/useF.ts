import type {UseFetchOptions} from 'nuxt/app';

export function useF<T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {}
) {
    const nuxtApp = useNuxtApp();

    return useFetch(url, {
        method: 'GET',
        baseURL: nuxtApp.$settings.apiURL,
        responseType: 'json',
        parseResponse: (res) => JSON.parse(res),
        immediate: true,
        watch: false,

        ...options,
        $fetch: nuxtApp.$f,
    })
}