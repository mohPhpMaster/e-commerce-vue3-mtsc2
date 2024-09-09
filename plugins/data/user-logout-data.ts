import {$axios} from "@/plugins/00.axiosInstance";
import type {IResponse} from "@/types/response-d-t";

export async function userLogoutData(): Promise<string> {
    try {
        return $axios
            .post('logout')
            .then((response: {data: IResponse}) => {
                return response?.data?.message || "";
            });
    } catch (error) {
        console.error(error);
        // Handle logout error
    }

    return Promise.reject("");
}

export default userLogoutData;