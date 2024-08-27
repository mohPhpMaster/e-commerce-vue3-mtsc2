import type {IProduct} from "@/types/product-d-t";
import type {IProductResponse} from "@/types/product-response-d-t";
import {$axios} from "@/plugins/axiosInstance";
import toolsService from "@/services/toolsService";
import {convertCategoryResponse} from "@/plugins/data/category-data";
import type {ICategory} from "@/types/category-d-t";
import type {IBrand} from "@/types/brand-d-t";
import type {IBrandResponse} from "@/types/brand-response-d-t";

export async function productData({
                                      prepend = [],
                                      append = [],
                                      page = 1,
                                      slug = '',
                                      category = undefined,
                                      product = undefined,
                                      brand = undefined,
                                      query = undefined,
                                      search = undefined,
                                      plain = false,
                                  }: {
    prepend?: IProduct[],
    append?: IProduct[],
    page?: number,
    slug?: string,
    category?: ICategory,
    product?: IProduct,
    brand?: IBrand,
    query?: string,
    search?: string,
    plain?: boolean;
} = {}): Promise<IProduct[]> {
    try {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        slug = slug || '';
        query = query || '';
        search = search || '';
        let url = `products`;
        let url_suffix = `?page=${page}&query=${query}&search=${search}`;
        let converter: Function = (o: []) => o.map(convertProductResponse);

        if (category) {
            url = `categories/${toolsService.id(category)}/products`;
            // url = `categories/${category.id}/products`;
            // url = `products/`;
        } else if (brand) {
            url = `brands/${toolsService.id(brand)}/products`;
            // converter = (o: []) => o.flatMap(convertBrandProductsResponse);
        } else if (slug || product) {
            slug = product ? toolsService.id(product) : slug;
            slug = toolsService.getSlug(slug, {prefix: '/'});
            url = `products${slug}`;
        }

        url = `${url}${url_suffix}`;
        const response: { data: { data: IProductResponse[] } } = await $axios.get(url);
        if (plain) {
            return converter(response?.data?.data || []);
        }
        const products = response?.data?.data || [];
        const transformedProducts: Awaited<IProduct>[] = await Promise.all(converter(products));
        // console.log(63, {url,transformedProducts})
        return [...prepend, ...transformedProducts, ...append];
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

export function convertProductResponse(product: IProductResponse): IProduct {
    let images: string[] = [
        product?.imageUrl || "",
        ...(product?.images?.data || [])
    ].filter(x => x);
    images = images.length ? images : [useNuxtApp().$settings.noImageUrl];

    let discount = Number(product?.discount || product?.price_after_discount) || 0;
    let price = Number(product.price) || 0;
    return {
        ITYPE: 'product',
        sku: product.slug,
        id: String(product.id).trim(),
        name: product.name,
        images,
        parentCategory: (product?.categories?.data || []).map(convertCategoryResponse)?.[0] as ICategory,
        children: '',
        price,
        discount,
        net: price - discount,
        quantity: String(product?.quantity || 2).trim(),
        rating: product?.rating || 0,
        description: toolsService.normalizeLineEndings(String(product?.description || '')),
        additionalInfo: [
            {
                key: 'different',
                value: String(product.different).trim()
            }
        ],
        reviews: undefined,
        tags: undefined,
        orderQuantity: undefined,
        brand: product?.brand?.trim(),
        top_rated: undefined,
        sell_count: undefined,
        offerDate: undefined
    };
}

export function convertBrandProductsResponse(brand: IBrandResponse): IProduct[] {
    return (brand?.products?.data || []).map(convertProductResponse);
}

export default productData;