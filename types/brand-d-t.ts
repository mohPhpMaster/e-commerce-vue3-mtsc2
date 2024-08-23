import type {IProduct} from "@/types/product-d-t";

export interface IBrand {
  ITYPE: 'brand';
  id: number;
  name: string;
  slug: string;
  url: string;
  imageUrl: string;
  products?: IProduct[] | undefined;
}