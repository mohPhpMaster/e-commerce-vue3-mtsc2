import { type IBrand } from '@/types/brand-d-t';
import {api} from "@/plugins/api";

const brands_data:IBrand[] = await api.brandData();

export default brands_data;