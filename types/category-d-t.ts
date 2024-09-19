import type {ISubCategory} from "@/types/sub-category-d-t";
import type {IProduct} from "@/types/product-d-t";

export interface ICategory {
    ITYPE: 'category';
    id: number;
    slug: string;
    url: string;
    img: string;
    preName?: string;
    parentName: string;
    seo_description?: string;
    seo_keywords?: string;
    products: IProduct[];
    children: ICategory[] | ISubCategory[] | undefined;
    textClr?: string;
}

