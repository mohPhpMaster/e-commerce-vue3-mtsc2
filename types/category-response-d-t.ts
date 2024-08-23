import type {ISubCategory} from "@/types/sub-category-d-t";
import type {IProductResponse} from "@/types/product-response-d-t";

export interface ICategoryResponse {
    textClr: string | undefined;
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    products: {
        data: IProductResponse[];
    } | undefined;
    sub_categories: {
        data: ICategoryResponse[];
    };
}
