import type {ICategory} from "@/types/category-d-t";
import type {ICategoryResponse} from "@/types/category-response-d-t";
import {$axios} from "@/plugins/00.axiosInstance";
import {convertCategoryResponse} from "@/plugins/data/category-data";

export async function categorySingleData(id: number|string): Promise<ICategory|undefined> {
    try {
        const response: { data: { data: ICategoryResponse[] } } = await $axios.get(`categories/${id}`);
        const categories = response?.data?.data || [];
        return convertCategoryResponse(categories?.[0]);
    } catch (error) {
        console.error('Error fetching category single data:', error);
        return undefined;
    }
}

export default categorySingleData;