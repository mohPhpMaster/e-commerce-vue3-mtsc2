import type {IProduct} from "@/types/product-d-t";

export interface IBrand {
  ITYPE: 'brand';
  id: number;
  name: string;
  seo_description?: string;
  seo_keywords?: string;
  slug: string;
  url: string;
  imageUrl: string;
  products?: IProduct[] | undefined;
}