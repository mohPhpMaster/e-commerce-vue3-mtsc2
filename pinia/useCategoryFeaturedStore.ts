import {defineStore} from "pinia";
import {onMounted, ref, watch} from "vue";
import {api} from "@/plugins/api";
import type {ICategory} from "@/types/category-d-t";

export const useCategoryFeaturedStore = defineStore("category_featured", () => {
    const currentPage = ref<number>(1);
    const category_featured_data = ref<ICategory[]>([]);

    const loadCategoriesFeatured = async (): Promise<Ref<ICategory[]>> => {
        category_featured_data.value = await api.categoryFeaturedData([], [], currentPage.value);
        return category_featured_data;
    };

    // onMounted(loadCategoriesFeatured);

    // Watch for changes in the current page and reload category_featureds
    watch(currentPage, loadCategoriesFeatured);

    // Update current page
    const updateCurrentPage = (pageNumber: number) => {
        currentPage.value = pageNumber;
    };

    return {
        category_featured_data,
        currentPage,
        loadCategoriesFeatured,
        updateCurrentPage,
    };
});
