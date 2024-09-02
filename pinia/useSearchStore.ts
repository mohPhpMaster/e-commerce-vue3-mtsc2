import {defineStore} from "pinia";
import {ref} from "vue";
import type {IProduct} from "@/types/product-d-t";
import {useProductFilterStore} from "@/pinia/useProductFilterStore";

export const useSearchStore = defineStore("search", () => {
    // const route = useRoute();
    const router = useRouter();
    const loading = ref<boolean>(false);
    const product_data = ref<IProduct[]>([]);

    const store = useProductFilterStore();
    const filteredProducts = computed(() => store.filterProducts(product_data?.value))

    const triggerSearch = () => {
        loading.value = true;
        let searchText = router.currentRoute.value?.query?.searchText || ''

        return (
            searchText ?
                store.loadProducts({search: searchText,}) :
                Promise.resolve([])
        )
            .then(data => {
                scrollToTop();
                product_data.value = data?.value;
                loading.value = false

                store.setData(data?.value)
            })
    };

    return {
        loading,
        product_data,
        triggerSearch,
        filteredProducts
    }
});
