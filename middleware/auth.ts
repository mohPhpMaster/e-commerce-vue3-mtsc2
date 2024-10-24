import {useUserStore} from "@/pinia/useUserStore";

export default defineNuxtRouteMiddleware((to, from) => {
    // useUserStore().isUserNeeded;
    // console.warn('auth.ts', {
    //     to,
    //     from,
    //     isUserNeeded: useUserStore().isUserNeeded()
    // });
    useUserStore().needUser();
    // const error = useError()
    // const {errors} = useNuxtApp()
    // if (error?.value?.data === 'EMPTY') {
    //     return navigateTo('/?error=empty')
        // return abortNavigation()
    // }
    // if (to.path !== '/') {
    //     return navigateTo('/')
    // }
    //     console.log(10, {
    //         to,
    //         from,
    //         error: error?.value?.data
    //     })
    // if (error.value) {
    //     showError(error.value)
    //     clearError({
    //         redirect: from.href
    //     })
    // }
})
