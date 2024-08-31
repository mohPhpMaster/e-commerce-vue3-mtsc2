import type {IProduct} from "@/types/product-d-t";
import type {ICategory} from "@/types/category-d-t";
import type {IBrand} from "@/types/brand-d-t";

export type IFetchProductOptions = {
    name?: string;
    prepend?: IProduct[];
    append?: IProduct[];
    page?: number;
    slug?: string;
    category?: ICategory;
    brand?: IBrand;
    search?: string;
    plain?: boolean;
    pagination?: boolean;
    toURL?: boolean;
    product?: IProduct,
    query?: string,
};
