import type {IBrand} from "@/types/brand-d-t";
import {api} from "@/plugins/api";

const brand_featured_data: Promise<IBrand[]> = api.brandFeaturedData();

export default brand_featured_data;