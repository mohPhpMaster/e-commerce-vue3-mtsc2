import type {IProductResponse} from "@/types/product-response-d-t";

export interface IBrandResponse {
  id: number;
  name: string;
  slug: string;
  url?: string;
  imageUrl: string;
  products?: {
    data: IProductResponse[];
  } | undefined;
}