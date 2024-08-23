import {defineStore} from "pinia";
import {onMounted, ref, watch} from "vue";
import {api} from "@/plugins/api";
import type {IProduct} from "@/types/product-d-t";
import type {IFetchProductOptions} from "@/types/fetch-product-options-d-t";

export let product_data = ref<IProduct[]>([]);
const cache: { [url: string]: any } = ref<{ [url: string]: any }>([]);

export const useProductStore = defineStore("product", () => {
    let activeImg = ref<string>("");
    let openFilterDropdown = ref<boolean>(false);
    let openFilterOffcanvas = ref<boolean>(false);
    let currentPage = ref<number>(1); // page number value as ref
    let currentOptions = ref<IFetchProductOptions>({});

    const loadProducts = async (args?: IFetchProductOptions) => {
        const route = useRoute();
        let slug = route?.params?.product;
        currentOptions.value = args || {
            slug,
            page: currentPage.value
        };
        console.warn(22 + ':useProductStore', currentOptions.value)

        product_data.value = await api.productData(currentOptions.value, cache);
        activeImg.value = product_data.value[0]?.images?.[0] || "";
        return product_data.value;
    };

    // onMounted(()=> {
    //     loadProducts(currentOptions.value);
    // });

    // Watch for changes in the current page and reload products
    watch(currentPage, ()=>{
        loadProducts(currentOptions.value);
    });

    // Update current page
    const updateCurrentPage = (pageNumber: number) => {
        currentPage.value = pageNumber;
    };
    const updateProductOptions = (options: IFetchProductOptions) => {
        currentOptions.value = options;
    };

    return {
        product_data,
        activeImg,
        openFilterDropdown,
        openFilterOffcanvas,
        currentPage,
        updateCurrentPage,
        currentProductOptions: currentOptions,
        updateProductOptions,
        loadProducts,
        handleImageActive: (img: string) => (activeImg.value = img),
        handleOpenFilterDropdown: () => (openFilterDropdown.value = !openFilterDropdown.value),
        handleOpenFilterOffcanvas: () => (openFilterOffcanvas.value = !openFilterOffcanvas.value),
    };
});
