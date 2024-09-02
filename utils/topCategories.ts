import {api} from "@/plugins/api";

export const loadTopCategories = () => {
    return api.categoryData()
};