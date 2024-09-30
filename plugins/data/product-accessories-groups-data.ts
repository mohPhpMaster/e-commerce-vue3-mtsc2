import type {IProduct} from "@/types/product-d-t";
import {$axios} from "@/plugins/00.axiosInstance";
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";
import type {IBrand} from "@/types/brand-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";
import type {IProductAccessoriesResponse} from "@/types/product-accessories-response-d-t";
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import type {IProductAccessoriesGroupsResponse} from "@/types/product-accessories-groups-response-d-t";

export async function productAccessoriesGroupsData({
                                                       prepend = [],
                                                       append = [],
                                                       page = 1,
                                                       slug = '',
                                                       product = undefined,
                                                       category = undefined,
                                                       brand = undefined,
                                                       query = undefined,
                                                       search = undefined,
                                                   }: {
    prepend?: IProduct[],
    append?: IProduct[],
    page?: number,
    slug?: string,
    product?: IProduct,
    category?: ICategory,
    brand?: IBrand,
    query?: string,
    search?: string,
} = {}): Promise<IProductAccessories[]> {
    try {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        slug = slug || '';
        query = query || '';
        search = search || '';
        let url = `products`;
        let url_suffix = `?page=${page}&query=${query}&search=${search}`;
        let converter: Function = (o: []) => o.map(convertProductAccessoriesResponse);

        if (category) {
            url = `categories/${toolsService.id(category)}/products`;
        } else if (brand) {
            url = `brands/${toolsService.id(brand)}/products`;
            // converter = (o: []) => o.flatMap(convertBrandProductsResponse);
        } else if (slug || product) {
            slug = product ? toolsService.id(product) : slug;
            slug = toolsService.getSlug(slug, {prefix: '/'});
            url = `products${slug}/accessories_groups`;
        }

        url = `${url}${url_suffix}`;

        const response: { data: { data: IProductAccessoriesResponse[] } } = await $axios.get(url);
        const products = response?.data?.data || [];
        const transformedProducts: Awaited<IProductAccessories>[] = await Promise.all(converter(products));
        return [...prepend, ...transformedProducts, ...append] as IProductAccessories[];
    } catch (error) {
        console.error('Error fetching product accessories groups data:', error);
        return [];
    }
}

export function convertProductAccessoriesResponse(product: IProductAccessoriesResponse): IProductAccessories {
    let discount = Number(product?.discount) || 0;
    let price = Number(product.price) || 0;

    return {
        ITYPE: 'product-accessories',
        id: String(product.id).trim(),
        name: product.name,
        is_required: Boolean(typeof product.is_required === 'string' ? JSON.parse(product.is_required) : product.is_required),
        price,
        discount,
        net: price - discount,
        accessories: (product?.accessories?.data || []).map(convertProductAccessoriesGroupsResponse) as IProductAccessoriesGroups[],
    };
}

export function convertProductAccessoriesGroupsResponse(product: IProductAccessoriesGroupsResponse): IProductAccessoriesGroups {
    let discount = Number(product?.discount) || 0;
    let price = Number(product.price) || 0;
    return {
        ITYPE: 'product-accessories-groups',
        id: String(product.id).trim(),
        name: product.name,
        is_required: Boolean(typeof product.is_required === 'string' && product.is_required ? JSON.parse(product.is_required) : product.is_required),
        group_id: product.group_id,
        group: product.group,
        qty: product.qty,
        price,
        discount,
        net: price - discount,
    };
}

export default productAccessoriesGroupsData;