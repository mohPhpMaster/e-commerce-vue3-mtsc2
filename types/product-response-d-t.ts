import type {ICategory} from "@/types/category-d-t";
import type {IProduct} from "@/types/product-d-t";
import type {ICategoryResponse} from "@/types/category-response-d-t";

export interface IProductResponse {
    id: string;
    name: string;
    description: string;
    label: string;
    slug: string;
    brand: string;
    brand_id: string;
    price: string;
    price_after_discount?: string;
    discount: number|string;
    rating: string|number;
    imageUrl: string;
    quantity: string | undefined;
    categories?: {
        data: ICategoryResponse[];
    } | undefined;
    different: string;
    differents: {
        data: IProduct[];
    };
    images: {
        data: string[];
    };
}