import type {IProduct} from "@/types/product-d-t";
import {$axios} from "@/plugins/axiosInstance";
import toolsService from "@/services/toolsService";
import {convertCategoryResponse} from "@/plugins/data/category-data";
import type {ICategory} from "@/types/category-d-t";
import type {IBrand} from "@/types/brand-d-t";
import type {IProductDifferentsResponse} from "@/types/product-differents-response-d-t";

export async function productDifferentsData({
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
} = {}): Promise<IProduct[]> {
    try {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        slug = slug || '';
        query = query || '';
        search = search || '';
        let url = `products`;
        let url_suffix = `?page=${page}&query=${query}&search=${search}`;
        let converter: Function = (o: []) => o.map(convertProductDifferentsResponse);

        if (category) {
            url = `categories/${toolsService.id(category)}/products`;
        } else if (brand) {
            url = `brands/${toolsService.id(brand)}/products`;
            // converter = (o: []) => o.flatMap(convertBrandProductsResponse);
        } else if (slug || product) {
            slug = product ? toolsService.id(product) : slug;
            // console.log(47,{slug, product})
            slug = toolsService.getSlug(slug, {prefix: '/'});
            url = `products${slug}/differents`;
        }

        url = `${url}${url_suffix}`;

        const response: { data: { data: IProductDifferentsResponse[] } } = await $axios.get(url);
        const products = response?.data?.data || [];
        const transformedProducts: Awaited<IProduct>[] = await Promise.all(converter(products));
        return [...prepend, ...transformedProducts, ...append];
    } catch (error) {
        console.error('Error fetching product differents data:', error);
        return [];
    }
}

export function convertProductDifferentsResponse(product: IProductDifferentsResponse): IProduct {
    let images: string[] = [
        product?.imageUrl || "",
        ...(product?.images?.data || [])
    ].filter(x => x);
    images = images.length ? images : [toolsService.getDefaultNoImageUrl()];

    let discount = Number(product?.discount || product?.price_after_discount) || 0;
    let price = Number(product.price) || 0;
    return {
        ITYPE: 'product-differents',
        sku: product.slug,
        id: String(product.id).trim(),
        name: product.name,
        images,
        parentCategory: (product?.categories?.data || []).map(convertCategoryResponse)?.[0] as ICategory,
        children: '',
        price,
        discount,
        net: price - discount,
        quantity: String(product?.quantity || 1).trim(),
        rating: product?.rating || 0,
        description: toolsService.normalizeLineEndings(String(product.description)),
        additionalInfo: [
            {
                key: 'different',
                value: String(product.different).trim()
            }
        ],
        reviews: undefined,
        tags: undefined,
        orderQuantity: undefined,
        brand: product?.brand?.trim() || "",
        top_rated: undefined,
        sell_count: undefined,
        offerDate: undefined
    };
}

export default productDifferentsData;