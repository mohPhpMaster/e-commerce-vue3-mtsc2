import type { ICategory } from "@/types/category-d-t";
import {api} from "@/plugins/api";
// import {menu_data} from "@/data/menu-data";

const category_data: ICategory[] = await api.categoryData();

export default category_data;