import type {IUser} from "@/types/user-d-t";
import {$axios} from "@/plugins/00.axiosInstance";
import formDataService from "@/services/formDataService";
import type {IUserLoginFormValues} from "@/types/user-login-form-values-d-t";

export async function userLoginData(user_data: IUserLoginFormValues): Promise<IUser> {
    try {
        let converter: Function = function (o: []): IUser|IUser[] {
            const transformed = (Array.isArray(o) ? o : [o]).map(convertUserLoginResponse);

            return Array.isArray(o) ? transformed : transformed?.[0];
        };

        return $axios.post('login', formDataService(user_data))
            .then((response: {data: { data: IUser }}) => {
                const userData = response?.data?.data || [];

                return Promise.resolve(converter(userData));
            });
    } catch (error) {
        console.error(error);
        // Handle login error
    }

    return Promise.reject({} as IUser);
}

export function convertUserLoginResponse(data: IUser): IUser {
    return {
        id: Number(data?.id),
        username: data?.username,
        name: data?.name,
        email: data?.email,
        // image: toolsService.parseImageUrl(data?.image),
        image: data?.image,
        mobile: data?.mobile,
        points: data?.points,
        notifications: data?.notifications || [],
        ...(("token" in data) ? {
            token: data?.token,
        } : {})
    };
}

export default userLoginData;