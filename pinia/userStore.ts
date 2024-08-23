import {defineStore} from 'pinia'
import {type IUser} from "@/types/user-d-t";
import {api} from "@/plugins/api";
import {$axios} from "@/plugins/axiosInstance";
import type {IUserLoginFormValues} from "@/types/user-login-form-values-d-t";

export const useUserStore = defineStore('user', () => {
    const initialized = ref(false);
    const user = ref<IUser>({} as IUser);

    const isLoggedIn = computed(() => !!user.value?.token);
    const token = computed(() => user.value?.token);

    const login = async (user_data: IUserLoginFormValues): Promise<Ref<IUser>> => {
        return api.userLoginData(user_data)
            .then((loggedUser: IUser) => {
                setUser(loggedUser);

                return user;
            })
    }

    const logout = async () => {
        return ($axios.hasToken() ? api.userLogoutData() : Promise.resolve(''))
            .then((message: string) => {
                clearUser();
                return message;
            });
    }

    const refresh = (): Ref<IUser> => {
        return $axios.hasToken() ?
            $axios
            .get('profile')
            .then((response: { data: { data: IUser } }) => {
                const userData = response?.data?.data || [];
                setUser({
                    ...userData,
                    token: userData?.token || token.value
                });

                return user;
            }) : Promise.resolve(user);
    }

    const setUser = ($user: IUser) => {
        localStorage.setItem('user', JSON.stringify($user));
        initializeUser();

        if (!isLoggedIn.value) {
            logout();
        }

        return user;
    };

    const clearUser = () => {
        localStorage.removeItem('user');
        initializeUser();
    };

    const initializeUser = (refresh_user: boolean = false): Ref<IUser> => {
        const storedUser = localStorage.getItem('user');
        user.value = storedUser ? JSON.parse(storedUser) : ({} as IUser);
        initialized.value = true;
        $axios.setToken(user.value?.token);

        return refresh_user ? refresh() : user;
    };

    const guestUser = (): boolean => {
        if (!initialized.value) {
            onMounted(() => guestUser());
            return false;
        }

        if (initialized.value && isLoggedIn.value) {
            useRouter().push('/');
            return false;
        }

        return true;
    };

    const needUser = (): boolean => {
        if (!initialized.value) {
            onMounted(() => needUser());
            return false;
        }

        if (initialized.value && !isLoggedIn.value) {
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
        needUser,
        guestUser,
        refresh
    }
})