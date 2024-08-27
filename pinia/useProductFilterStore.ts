import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import {useProductStore} from "@/pinia/useProductStore";
import type {IFetchProductOptions} from "@/types/fetch-product-options-d-t";
import type {IProduct} from "@/types/product-d-t";

const _LOG = false;

export const useProductFilterStore = defineStore("product_filter", () => {
    const route = useRoute();
    const router = useRouter();
    let selectVal = ref<string>("");

    const productStore = useProductStore();
    const product_data = ref<IProduct[]>(productStore?.product_data || []);

    const maxProductPrice = computed(()=> {
        _LOG && console.warn(15 + ':useProductFilterStore:maxProductPrice')
            return product_data.value?.reduce((max, product) => {
                return Number(product?.net || 0) > max
                    ? Number(product?.net || 0)
                    : max;
            }, 0);
        }
    );

    let priceValues = ref([0, maxProductPrice.value]);

    const handlePageChange = (value: number) => {
        _LOG && console.warn(27 + ':useProductFilterStore:handlePageChange', value)
        productStore.updateCurrentPage(Math.ceil((value + 9) / 9));
    };

    const handlePriceChange = (value: number[]) => {
        _LOG && console.warn(32 + ':useProductFilterStore:handlePriceChange', value)
        priceValues.value = value;
    };

    const handleResetFilter = () => {
        _LOG && console.warn(37 + ':useProductFilterStore:handleResetFilter')
        priceValues.value = [0, maxProductPrice.value];
    };

    const loadProducts = (args?: IFetchProductOptions): Promise<IProduct[]> => {
        _LOG && console.warn(42 + ':useProductFilterStore:loadProducts', args || {})
        return productStore.loadProducts(args).then((data) => {
            product_data.value = data.value;
            return data;
        })
    }

    const filterProducts = (filtered: IProduct[]) => {
        _LOG && console.warn(50 + ':useProductFilterStore:filterProducts', {filtered, product_data})
        // Apply route-based filters (price, status, etc.)
        if (route.query.minPrice && route.query.maxPrice) {
            filtered = filtered.filter(
                (p) =>
                    Number(p?.price) >= Number(route.query.minPrice) &&
                    Number(p?.price) <= Number(route.query.maxPrice)
            );
        } else if (route.query.status) {
            if (route.query.status === "on-sale") {
                filtered = filtered.filter((p) => Number(p?.discount) > 0);
            } else if (route.query.status === "in-stock") {
                filtered = filtered.filter((p) => Number(p?.quantity) > 0);
            }
        } else if (route.query.category) {
            filtered = filtered.filter(
                (p) => String(p?.parentCategory?.parentName).trim() === String(route.query.category).trim() || !(p?.parentCategory)
            );
        } else if (route.query.subCategory) {
            filtered = filtered.filter(
                (p) => p.children.split(' ').join('-').toLowerCase() === route.query.subCategory
            );
        } else if (route.query.brand) {
            filtered = filtered.filter(
                (p) => p.brand.toLowerCase().replace("&", "").split(" ").join("-") === route.query.brand
            );
        }

        // Apply select filter (sorting)
        switch (selectVal.value) {
            case "low-to-high":
                filtered.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "high-to-low":
                filtered.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "new-added":
                filtered = filtered.slice(-8);
                break;
            case "on-sale":
                filtered = filtered.filter((p) => Number(p?.discount) > 0);
                break;
        }

        return filtered;
    };
    const filteredProducts = computed(() => {
        let filtered = [...(product_data.value || [])];
        _LOG && console.warn(48 + ':useProductFilterStore:filteredProducts', {filtered, product_data})

        return filterProducts(filtered);
    });

    watch(
        () => route.query,
        () => {
            loadProducts(productStore.currentProductOptions);
        }
    );

    return {
        // productStore,
        // product_data: productStore.product_data,
        loadProducts,
        maxProductPrice,
        priceValues,
        handleSelectFilter: (e: { value: string; text: string }) => (selectVal.value = e.value),
        filteredProducts,
        filterProducts,
        handlePriceChange,
        handleResetFilter,
        selectVal,
        handlePageChange,
        updateCurrentPage: productStore.updateCurrentPage,
        currentProductOptions: productStore.currentProductOptions,
        updateProductOptions: (options: IFetchProductOptions) => {
            productStore.updateProductOptions(options);
            return options;
        },
        setData: (data: IProduct[]) => {
            productStore?.setData(data);
            try {
                product_data.value = data
            } catch (e) {
                console.error(e)
            }

            return data;
        },
    };
});
