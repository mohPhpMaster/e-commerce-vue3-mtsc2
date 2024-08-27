import {defineStore} from "pinia";
import {onMounted, ref, watch} from "vue";
import {api} from "@/plugins/api";
import type {IBrand} from "@/types/brand-d-t";

export const useBrandFeaturedStore = defineStore("brand_featured", () => {
    const currentPage = ref<number>(1);
    const brand_featured_data = ref<IBrand[]>([]);

    const loadBrandsFeatured = async () => {
        brand_featured_data.value = await api.brandFeaturedData({
            page: currentPage.value
        });
        return brand_featured_data;
    };
    // onMounted(loadBrandsFeatured);

    watch(currentPage, loadBrandsFeatured);

    const updateCurrentPage = (pageNumber: number) => {
        currentPage.value = pageNumber;
    };

    return {
        brand_featured_data,
        currentPage,
        loadBrandsFeatured,
        updateCurrentPage,
    };
});
