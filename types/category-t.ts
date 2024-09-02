import type {ICategoryResponse} from "@/types/category-response-d-t";
import type {ICategory} from "@/types/category-d-t";
import type {ICategoryFilter} from "@/types/category-filter-d-t";
import type {ISubCategory} from "@/types/sub-category-d-t";
import type {ICategoryFilterResponse} from "@/types/category-filter-response-d-t";

export type TCategoryResponse = ICategoryFilterResponse | ICategoryResponse;
export type TCategory = ICategory | ICategoryFilter | ISubCategory;
export type TCategoryFilter = ICategoryFilter | ICategoryFilterResponse;
