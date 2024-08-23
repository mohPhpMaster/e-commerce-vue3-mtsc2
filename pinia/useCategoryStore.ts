import {defineStore} from "pinia";
import {ref, watch} from "vue";
import type {ICategory} from "@/types/category-d-t";
import {api} from "@/plugins/api";

export let _data = ref<{ [key: string]: ICategory[] }>({});
export let categories_data = ref<ICategory[]>([]);

export const useCategoryStore = defineStore("category", () => {
    let activeImg = ref<string>("");
    let openFilterDropdown = ref<boolean>(false);
    let openFilterOffcanvas = ref<boolean>(false);
    let currentPage = ref<number>(1); // page number value as ref

    const loadCategories = async function ({name= 'default' }={}) {
        return api.categoryData({
            page: currentPage.value
        })
            .then(data => {
                categories_data.value = data;

                handleImageActive(categories_data.value[0]?.img || "");
                _data.value = {
                    ..._data.value,
                    [name || 'default']: data
                };

                return data;
            })
    };

    // onMounted(loadCategories);

    // Watch for changes in the current page and reload categorys
    watch(currentPage, loadCategories);

    // Update current page
    const updateCurrentPage = (page: number = 0) => {
        page = Number(page) || 1;
        page = page < 1 ? 1 : page;
        currentPage.value = page;
    };

    // handle image active
    const handleImageActive = (img: string) => {
        activeImg.value = img;
    };

    // handle image active
    const handleOpenFilterDropdown = () => {
        openFilterDropdown.value = !openFilterDropdown.value
    };

    // handle image active
    const handleOpenFilterOffcanvas = () => {
        openFilterOffcanvas.value = !openFilterOffcanvas.value
    };

    return {
        category_data: categories_data,
        activeImg,
        handleImageActive,
        handleOpenFilterDropdown,
        openFilterDropdown,
        openFilterOffcanvas,
        handleOpenFilterOffcanvas,
        currentPage,
        loadCategories,
        updateCurrentPage,
    };
});
