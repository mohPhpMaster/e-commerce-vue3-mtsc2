import type {IReview} from "@/types/review-d-t";
import type {ICategory} from "@/types/category-d-t";

export interface IProduct {
    ITYPE: 'product';
    sku: string;
    id: number|string;
    name: string;
    images: string[];
    parentCategory: ICategory;
    children: string;
    price: number;
    discount: number;
    net: number;
    quantity: number | string;
    rating: number | string| undefined;
    description: string;
    additionalInfo: {
        key: string;
        value: string;
    }[];
    reviews: IReview[] | undefined;
    tags: string[] | undefined;
    orderQuantity?: number;
    brand: string;
    top_rated?: boolean;
    sell_count?: number;
    offerDate?: {
        startDate: string;
        endDate: string;
    }
}