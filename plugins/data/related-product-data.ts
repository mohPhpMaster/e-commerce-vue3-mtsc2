import type {IProduct} from "@/types/product-d-t";
import type {IProductResponse} from "@/types/product-response-d-t";
import {$axios} from "@/plugins/axiosInstance";
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";
import type {IBrand} from "@/types/brand-d-t";
import {convertProductResponse} from "@/plugins/data/product-data";

export async function relatedProductsData({
                                      page = 1,
                                      slug = '',
                                      product = undefined,
                                      category = undefined,
                                      brand = undefined,
                                      search = undefined,
                                  }: {
    page?: number,
    slug?: string,
    product?: IProduct,
    category?: ICategory,
    brand?: IBrand,
    search?: string,
} = {}): Promise<IProduct[]> {
    try {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        slug = slug || '';
        search = search || '';
        let url = `products`;
        let url_suffix = `?page=${page}&search=${search}`;
        let converter: Function = (o: []) => o.map(x=>convertProductResponse(x));

        if (slug) {
            slug = toolsService.getSlug(slug, {prefix: '/',suffix: '/related'});
            url = `products${slug}`;
        }
        else if (product) {
            url = toolsService.getRelatedProductUrl(product);
        }

        url = `${url}${url_suffix}`;
        // console.log(42, {url})
        const response: { data: { data: IProductResponse[] } } = await $axios.get(url);
        const products = response?.data?.data || [];
        return await Promise.all(converter(products));
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

export default relatedProductsData;