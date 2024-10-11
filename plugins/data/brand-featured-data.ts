import type {IBrand} from "@/types/brand-d-t";
import type {IBrandResponse} from "@/types/brand-response-d-t";
import {convertBrandResponse} from "@/plugins/data/brand-data";

export async function brandFeaturedData({prepend = [], append = [], page = 1, slug = ''}: {
    prepend?: IBrand[],
    append?: IBrand[],
    page?: number,
    slug?: string
} = {}): Promise<IBrand[]> {
    try {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        slug = slug || '';
        if (slug) {
            // let id = Number(slug.split('-').shift());
            slug = slug ? `/${slug}` : '';
        }

        const response: { data: { data: IBrandResponse[] } } = await $axios.get(`brands/featured${slug || ''}?page=${page}`);
        const brands = response?.data?.data || [];
        const transformedCategories: Awaited<IBrand>[] = await Promise.all(brands.map(convertBrandResponse));
        return [...prepend, ...transformedCategories, ...append];
    } catch (error) {
        console.error('Error fetching brand featured data:', error);
        return [];
    }
}

export default brandFeaturedData;