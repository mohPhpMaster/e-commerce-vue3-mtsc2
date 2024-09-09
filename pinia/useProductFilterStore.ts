import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useProductStore} from "@/pinia/useProductStore";
import type {IFetchProductOptions} from "@/types/fetch-product-options-d-t";
import type {IProduct} from "@/types/product-d-t";

export const useProductFilterStore = defineStore("product_filter", () => {
    const {t} = useI18n();
    const route = useRoute();
    const router = useRouter();
    const productStore = useProductStore();

    const product_data = ref<IProduct[]>(productStore?.product_data || []);
    // todo: what max value should be?
    const maxProductPrice = computed(() => 50000);

    const defaultSortingOption = ref<string>("");
    const sortingOption = ref<string>(defaultSortingOption.value);
    const getSortingOptions = () => {
        return [
            {value: '', text: t('Default Sorting')},
            {value: 'low-to-high', text: t('Low to High')},
            {value: 'high-to-low', text: t('High to Low')},
            {value: 'new-added', text: t('New Added')},
            {value: 'on-sale', text: t('On Sale')},
        ]
    };
    const findSortingOptionIndex = (v: string, sortingOptions: [] = undefined) => {
        sortingOptions = sortingOptions || getSortingOptions();
        return sortingOptions.findIndex(option => option.value === v);
    };
    const getSelectedSortingOptionIndex = ($sortingOption: string = undefined, $sortingOptions: [] = undefined) => {
        $sortingOptions = $sortingOptions || getSortingOptions();
        $sortingOption = $sortingOption || sortingOption.value;
        return $sortingOptions.findIndex(option => option.value === $sortingOption) || 0;
    };
    const getSelectedSortingOption = () => getSortingOptions()[getSelectedSortingOptionIndex()];
    const fetchRouterSelectedSortingOption = () => {
        let q = router.currentRoute.value?.query;

        sortingOption.value = q.hasOwnProperty('sorting') ? q.sorting : defaultSortingOption.value;

        return sortingOption.value;
    };
    const handleSortingOptionFilter = () => {
        let query = {
            ...router.currentRoute.value?.query,
            sorting: sortingOption.value,
        }

        if (query.sorting === defaultSortingOption.value) {
            delete query.sorting;
        }

        router.push({query})
    };
    const handleSortingOptionChange = (e: { value: string; text: string }) => {
        sortingOption.value = e.value;

        return sortingOption.value;
    };
    const handleSortingOptionChangeAndFilter = (e: { value: string; text: string }) => {
        handleSortingOptionChange(e);
        handleSortingOptionFilter();
    };

    const defaultProductStatusOption = ref<number | null>(null);
    const productStatus = ref<number | null>(defaultProductStatusOption.value);
    const getProductStatusOptions = () => {
        return [
            t("On Sale"),
            t("In Stock")
        ]
    };
    const fetchRouterProductStatus = () => {
        let q = router.currentRoute.value?.query;

        if (q.hasOwnProperty('status')) {
            productStatus.value = Number(q.status);
        }

        return productStatus.value;
    };
    const handleProductStatusFilter = () => {
        router.push({
            query: {
                ...router.currentRoute.value?.query,
                status: productStatus.value,
            }
        })
    };
    const handleProductStatusChange = (e: number | null) => {
        productStatus.value = e;

        return productStatus.value;
    };
    const handleProductStatusChangeAndFilter = (e: number | null) => {
        handleProductStatusChange(e);
        handleProductStatusFilter();
    };

    const defaultProductCategory = ref<number | null>(null);
    const productCategory = ref<number | null>(defaultProductCategory.value);
    const fetchRouterProductCategory = () => {
        let q = router.currentRoute.value?.query;

        if (q.hasOwnProperty('category')) {
            productCategory.value = Number(q.category);
        }

        return productCategory.value;
    };
    const handleProductCategoryFilter = () => {
        router.push({
            query: {
                ...router.currentRoute.value?.query,
                category: productCategory.value,
            }
        })
    };
    const handleProductCategoryChange = (e: number | null) => {
        productCategory.value = e;

        return productCategory.value;
    };
    const handleProductCategoryChangeAndFilter = (e: number | null) => {
        handleProductCategoryChange(e);
        handleProductCategoryFilter();
    };

    const defaultProductBrand = ref<number | null>(null);
    const productBrand = ref<number | null>(defaultProductBrand.value);
    const fetchRouterProductBrand = () => {
        let q = router.currentRoute.value?.query;

        if (q.hasOwnProperty('brand')) {
            productBrand.value = Number(q.brand);
        }

        return productBrand.value;
    };
    const handleProductBrandFilter = () => {
        router.push({
            query: {
                ...router.currentRoute.value?.query,
                brand: productBrand.value,
            }
        })
    };
    const handleProductBrandChange = (e: number | null) => {
        productBrand.value = e;

        return productBrand.value;
    };
    const handleProductBrandChangeAndFilter = (e: number | null) => {
        handleProductBrandChange(e);
        handleProductBrandFilter();
    };

    const priceValues = ref([0, maxProductPrice.value]);
    const handlePriceChange = (value: number[]) => priceValues.value = value;
    const handlePriceChangeAndFilter = (value: number[]) => {
        handlePriceChange(value);
        handlePriceFilter();
    };
    const handlePriceFilter = () => {
        router.push({
            query: {
                ...router.currentRoute.value?.query,
                minPrice: priceValues.value?.[0],
                maxPrice: priceValues.value?.[1],
            }
        })
    };
    const fetchRouterPriceValues = () => {
        let q = router.currentRoute.value?.query;
        let v: [number, number] = [...priceValues.value];

        if (q.hasOwnProperty('minPrice')) {
            v[0] = Number(q.minPrice);
        }

        if (q.hasOwnProperty('maxPrice')) {
            v[1] = Number(q.maxPrice);
        }

        priceValues.value = v;

        return priceValues.value;
    };

    const handleResetFilter = () => {
        productBrand.value = defaultProductBrand.value;
        productCategory.value = defaultProductCategory.value;
        productStatus.value = defaultProductStatusOption.value;
        priceValues.value = [0, maxProductPrice.value];
        sortingOption.value = defaultSortingOption.value;
    };
    const handlePageChange = (value: number) => productStore.updateCurrentPage(Math.ceil((value + 9) / 9));
    const loadProducts = (args?: IFetchProductOptions): Promise<IProduct[]> =>
        productStore.loadProducts(args).then((data) => {
                product_data.value = args?.pagination ? data.value.data : data.value;
                return data;
            }
        )

    const filterProducts = (filtered: IProduct[]) => {
        filtered = filtered || [];

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
        switch (sortingOption.value) {
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

    const filteredProducts = computed(() => filterProducts([...(product_data.value || [])]));

    return {
        product_data,
        maxProductPrice,

        sortingOption,
        defaultSortingOption,
        handleSortingOptionFilter,
        handleSortingOptionChange,
        handleSortingOptionChangeAndFilter,
        getSortingOptions,
        findSortingOptionIndex,
        getSelectedSortingOption,
        getSelectedSortingOptionIndex,
        fetchRouterSelectedSortingOption,

        productStatus,
        defaultProductStatusOption,
        getProductStatusOptions,
        handleProductStatusFilter,
        handleProductStatusChange,
        handleProductStatusChangeAndFilter,
        fetchRouterProductStatus,

        productCategory,
        defaultProductCategory,
        handleProductCategoryFilter,
        handleProductCategoryChange,
        handleProductCategoryChangeAndFilter,
        fetchRouterProductCategory,

        productBrand,
        defaultProductBrand,
        handleProductBrandFilter,
        handleProductBrandChange,
        handleProductBrandChangeAndFilter,
        fetchRouterProductBrand,

        priceValues,
        fetchRouterPriceValues,
        handlePriceFilter,
        handlePriceChange,
        handlePriceChangeAndFilter,

        handleResetFilter,
        handlePageChange,
        loadProducts,
        filteredProducts,
        filterProducts,

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
