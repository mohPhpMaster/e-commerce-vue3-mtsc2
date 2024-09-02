import type {IBrandResponse} from "@/types/brand-response-d-t";
import type {IBrand} from "@/types/brand-d-t";
import type {IBrandFilter} from "@/types/brand-filter-d-t";
import type {IBrandFilterResponse} from "@/types/brand-filter-response-d-t";

export type TBrandResponse = IBrandFilterResponse | IBrandResponse;
export type TBrand = IBrand | IBrandFilter;
export type TBrandFilter = IBrandFilter | IBrandFilterResponse;
