import type {IProduct} from "@/types/product-d-t";
import type {IProductAddionals} from "@/types/product-addionals-d-t";
import type {IProductAddionalsResponse} from "@/types/product-addionals-response-d-t";

export async function productAddionalsData({page = 1, slug = '', product = undefined, plain=false, pagination = false}: {
    page?: number,
    slug?: string,
    product?: IProduct,
    plain?: boolean,
    pagination?: boolean,
} = {}): Promise<IProductAddionals[]|IProductAddionalsResponse[]> {
    try {
        // console.warn(8,{prepend, append, page, slug})
        if (page) {
            page = Number(page) || 1;
            page = page < 1 ? 1 : page;
        }

        slug = slug || useRoute()?.params?.product;
        if (slug) {
            // let id = String(slug.split('-').shift());
            // slug = id ? `/${id}/products` : '';
            slug = slug ? `/${slug}` : '';
        }

        const url = `products${slug || ''}/addional?` + (page ? `page=${page}` : '');
        const response: { data: { data: IProductAddionalsResponse[] } } = await $axios.get(url);
        if (plain) {
            if (pagination) {
                return response?.data || [];
            }

            return (response?.data?.data || []);
        }
        return convertProductAddionalResponse((response?.data?.data || []));
    } catch (error) {
        console.error('Error fetching product addionals data:', error);
        return [];
    }
}

export function convertProductAddionalResponse(data: IProductAddionalsResponse[]): IProductAddionals[] {
    let output = {}

    data?.forEach(($data) => {
        output[$data.key] = $data.value;
    })

    return output;
}

export default productAddionalsData;