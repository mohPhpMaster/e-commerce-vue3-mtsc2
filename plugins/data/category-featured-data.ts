import type {ICategory} from "@/types/category-d-t";
import type {ICategoryResponse} from "@/types/category-response-d-t";
import {$axios} from "@/plugins/00.axiosInstance";
import {convertProductResponse} from "@/plugins/data/product-data";

export async function categoryFeaturedData(prepend: ICategory[] = [], append: ICategory[] = [], page: number = 1): Promise<ICategory[]> {
    try {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        const response: { data: { data: ICategoryResponse[] } } = await $axios.get(`categories/featured?page=${page}`);
        const categories = response?.data?.data || [];
        const transformedCategories: Awaited<ICategory>[] = await Promise.all(categories.map(convertCategoryFeaturedResponse));
        return [...prepend, ...transformedCategories, ...append];
    } catch (error) {
        console.error('Error fetching category featured data:', error);
        return [];
    }
}

export function convertCategoryFeaturedResponse(category: ICategoryResponse): ICategory {
    return {
        ITYPE: 'category',
        id: category.id,
        slug: category.slug,
        url: `/category/${category.slug}`,
        img: category.imageUrl,
        preName: category.prename,
        parentName: category.name,
        products: (category?.products?.data || []).map(x=>convertProductResponse(x)),
        children: category?.sub_categories?.data/*.map((subCategory) => subCategory.id)*/,
        textClr: category.textClr || undefined,
    };
}

export default categoryFeaturedData;