import type {ICategory} from "@/types/category-d-t";
import type {ICategoryResponse} from "@/types/category-response-d-t";
import {convertCategoryResponse} from "@/plugins/data/category-data";

export async function topCategoryData({
                                       prepend = [],
                                       append = [],
                                       page = 1,
                                       slug = "",
                                       plain = false,
                                       url = false,
                                       baseUrl = undefined
                                   }: {
    prepend?: ICategory[];
    append?: ICategory[];
    page?: number;
    slug?: string;
    plain?: boolean;
    url?: boolean;
    baseUrl?: string;
} = {}): Promise<ICategory[]> {
    try {
        if (page) {
            page = Number(page) || 1;
            page = page < 1 ? 1 : page;
        }

        slug = slug || "";
        if (slug) {
            slug = slug ? `/${slug}` : "";
        }

        const $url = `top-categories${slug}?${page ? `page=${page}` : ""}`;
        if (url) {
            return $url;
        }

        let $options = {};
        if (baseUrl)
        {
            $options["baseURL"] = baseUrl;
        }

        const response: { data: { data: ICategoryResponse[] } } = await $axios.get($url, $options);
        if (plain) {
            return (response?.data?.data || []).map(convertCategoryResponse);
        }
        const categories = response?.data?.data || [];
        const transformedCategories: Awaited<ICategory>[] = await Promise.all(categories.map(convertCategoryResponse));
        return [...prepend, ...transformedCategories, ...append];
    } catch (error) {
        console.error("Error fetching top category data:", error);
        return [];
    }
}

export default topCategoryData;
