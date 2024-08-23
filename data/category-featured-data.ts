import type { ICategory } from "@/types/category-d-t";
import {api} from "@/plugins/api";
// import {menu_data} from "@/data/menu-data";

const category_featured_data: Promise<ICategory[]> = api.categoryFeaturedData();

export default category_featured_data;