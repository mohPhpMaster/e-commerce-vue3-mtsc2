import type {IBrand} from "@/types/brand-d-t";
import type {IBrandResponse} from "@/types/brand-response-d-t";
import {$axios} from "@/plugins/axiosInstance";
import {convertProductResponse} from "@/plugins/data/product-data";

export async function brandData({prepend = [], append = [], page = 1, slug = ''}: {
    prepend?: IBrand[],
    append?: IBrand[],
    page?: number,
    slug?: string
} = {}): Promise<IBrand[]> {
    try {
        if (page) {
            page = Number(page) || 1;
            page = page < 1 ? 1 : page;
        }

        slug = slug || "";
        if (slug) {
            // slug = String(slug.split('-').shift());
            slug = slug ? `/${slug}` : '';
        }

        const url = `brands${slug || ''}?page=${page}`;
        const response: { data: { data: IBrandResponse[] } } = await $axios.get(url);
        const brands = response?.data?.data || [];
        const transformedCategories: Awaited<IBrand>[] = await Promise.all((Array.isArray(brands) ? brands : [brands]).map(convertBrandResponse));
        return [...prepend, ...transformedCategories, ...append];
    } catch (error) {
        console.error('Error fetching brands data:', error);
        return [];
    }
}

export function convertBrandResponse(brand: IBrandResponse): IBrand {
    return {
        ITYPE: 'brand',
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        url: `/brand/${brand.slug}`,
        imageUrl: brand.imageUrl,
        products: (brand?.products?.data || []).map(x=>convertProductResponse(x)),
    };
}

export default brandData;