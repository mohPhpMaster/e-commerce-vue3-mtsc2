import {$axios} from "@/plugins/00.axiosInstance";
import formDataService from "@/services/formDataService";
import type {IContactUsFormValues} from "@/types/contact-us-form-values-d-t";
import type {IResponse} from "@/types/response-d-t";

export async function contactUsData(data: IContactUsFormValues): Promise<IResponse> {
    try {
        return $axios
            .post('contact-us', formDataService(data), {baseURL: "http://localhost:3000/api"})
    } catch (error) {
        console.error(error);
    }

    return Promise.reject({} as IResponse);
}

export default contactUsData;