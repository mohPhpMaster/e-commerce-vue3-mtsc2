import type {IBrandFilter} from "@/types/brand-filter-d-t";
import toolsService from "@/services/toolsService";
import type {TBrandResponse} from "@/types/brand-t";

export function convertBrandFilterResponse(brand: TBrandResponse): IBrandFilter {
    return {
        ITYPE: 'brand-filter',
        id: Number(brand?.id),
        slug: brand?.slug || undefined,
        name: toolsService.parseBrandName(brand),
        imageUrl: brand?.imageUrl || '',
    };
}
