import type {ICategory} from "@/types/category-d-t";
import type {ICategoryResponse} from "@/types/category-response-d-t";
import {$axios} from "@/plugins/axiosInstance";
import {convertProductResponse} from "@/plugins/data/product-data";

export async function categoryData({
                                       prepend = [],
                                       append = [],
                                       page = 1,
                                       slug = "",
                                    plain = false,
                                   }: {
    prepend?: ICategory[];
    append?: ICategory[];
    page?: number;
    slug?: string;
    plain?: boolean;
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

        const url = `categories${slug}?${page ? `page=${page}` : ""}`;
        const response: { data: { data: ICategoryResponse[] } } = await $axios.get(url);
        if (plain) {
            return (response?.data?.data || []).map(convertCategoryResponse);
        }
        const categories = response?.data?.data || [];
        const transformedCategories: Awaited<ICategory>[] = await Promise.all(categories.map(convertCategoryResponse));
        return [...prepend, ...transformedCategories, ...append];
    } catch (error) {
        console.error("Error fetching category data:", error);
        return [];
    }
}

export function convertCategoryResponse(
    category: ICategoryResponse
): ICategory {
    return {
        ITYPE: "category",
        id: category.id,
        slug: category.slug,
        url: `/category/${category.slug}`,
        img: category.imageUrl,
        parentName: category?.name,
        products: (category?.products?.data || []).map(convertProductResponse),
        children: (category?.sub_categories?.data || []).map(
            convertCategoryResponse
        ),
        textClr: category.textClr || undefined,
    };
}

export default categoryData;
