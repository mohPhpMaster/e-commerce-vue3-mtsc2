import type {IProductResponse} from "@/types/product-response-d-t";

export interface IBrandResponse {
  id: number;
  name: string;
  seo_description?: string;
  seo_keywords?: string;
  slug: string;
  url?: string;
  imageUrl: string;
  products?: {
    data: IProductResponse[];
  } | undefined;
}