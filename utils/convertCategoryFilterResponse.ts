import type {ICategoryFilter} from "@/types/category-filter-d-t";
import toolsService from "@/services/toolsService";
import type {TCategoryResponse} from "@/types/category-t";

export function convertCategoryFilterResponse(category: TCategoryResponse): ICategoryFilter {
    const _products = category?.products;
    let products: number = 0;
    try {
        products = typeof _products === 'number' ?
            Number(_products || 0) :
            (Object.keys(_products)?.length || 0);
    } catch (e) {

    }

    return {
        ITYPE: 'category-filter',
        id: Number(category?.id),
        slug: category?.slug || undefined,
        name: toolsService.parseCategoryName(category),
        products,
    };
}
