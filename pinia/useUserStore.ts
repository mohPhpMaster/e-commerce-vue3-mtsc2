import {defineStore} from 'pinia'
import {type IUser} from "@/types/user-d-t";
import {api} from "@/plugins/api";
import type {IUserLoginFormValues} from "@/types/user-login-form-values-d-t";
import {useCartStore} from "@/pinia/useCartStore";
import {useWishlistStore} from "@/pinia/useWishlistStore";
import {useCompareStore} from "@/pinia/useCompareStore";

export const useUserStore = defineStore('user', () => {
    const initialized = ref(false);
    const user = ref<IUser>({} as IUser);
    const cookies = useCookie<IUser>('user',{
        // parseJSON: true,
        persist: true,
        watch: true
    });

    const isLoggedIn = () => !!user.value?.token;
    const token = () => user.value?.token;

    const login = async (user_data: IUserLoginFormValues): Promise<Ref<IUser>> => {
        return api.userLoginData(user_data)
            .then((loggedUser: IUser) => {
                setUser(loggedUser);

                useCartStore().fetchCart();
                useWishlistStore().fetchWishlist();
                useCompareStore().fetchComparelist();
                return user;
            });
    }

    const logout = async () => {
        return ($axios.hasToken() ? api.userLogoutData() : Promise.resolve(''))
            .then((message: string) => {
                clearUser();

                useCartStore().fetchCart();
                useWishlistStore().fetchWishlist();
                useCompareStore().fetchComparelist();
                return message;
            });
    }

    const refresh = async (): Promise<Ref<IUser>> => {
        if ($axios.hasToken()) {
            await fetchProfile();
        }
        return user;
    }

    const fetchProfile = async () => {
        if ($axios.hasToken()) {
            try {
                const response = await $axios.get('profile', {
                    // baseURL: "http://localhost:3000/api"
                });

                const userData = response?.data?.data || {};
                setUser({
                    ...userData,
                    token: userData?.token || token()
                });
            } catch (error) {
                logout();
            }
        }
    }

    const setUser = ($user: IUser) => {
        cookies.value = $user;
        initializeUser();

        if (!isLoggedIn()) {
            logout();
        }

        return user;
    };

    const clearUser = () => {
        cookies.value = {};
        initializeUser();
    };

    const initializeUser = async (): Promise<Ref<IUser>> => {
        const storedUser = cookies.value;
        user.value = storedUser ? storedUser : ({} as IUser);
        $axios.setToken(user.value?.token);

        if (!initialized.value) {
            initialized.value = true;
            await refresh();
        }
        return user;
    };

    const guestUser = (): boolean => {
        if (!initialized.value) {
            onMounted(() => guestUser());
            return false;
        }

        if (initialized.value && isLoggedIn()) {
            useRouter().push('/');
            return false;
        }

        return true;
    };

    const isUserNeeded = (): boolean => {
        return initialized.value && !isLoggedIn();
    };

    const needUser = (): boolean => {
        if (!initialized.value) {
            onMounted(() => needUser());
            return false;
        }

        if (initialized.value && !isLoggedIn()) {
            useRouter().push('/login');
            return false;
        }

        return true;
    };

    return {
        initialized,
        user,
        isLoggedIn,
        token,
        login,
        logout,
        setUser,
        clearUser,
        initializeUser,
        isUserNeeded,
        needUser,
        guestUser,
        refresh
    };
});
