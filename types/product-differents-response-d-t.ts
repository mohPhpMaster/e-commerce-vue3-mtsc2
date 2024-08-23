import type {ICategoryResponse} from "@/types/category-response-d-t";

export interface IProductDifferentsResponse {
    id: string|number;
    name: string;
    description: string;
    slug: string;
    brand?: string;
    brand_id?: string;
    price: string;
    price_after_discount?: string;
    discount: number|string;
    rating?: string | number;
    imageUrl: string;
    quantity?: string | undefined;
    categories?: {
        data: ICategoryResponse[];
    } | undefined;
    different: string;
    images?: {
        data: string[];
    };
}