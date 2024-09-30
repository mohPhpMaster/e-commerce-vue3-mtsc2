import {onMounted, ref} from "vue";
import {type IProduct} from "@/types/product-d-t";
import {defineStore} from "pinia";
import {toast} from "vue3-toastify";
import swal from "sweetalert";
import {$axios} from "@/plugins/00.axiosInstance";
import formDataService from "@/services/formDataService";
import type {IProductResponse} from "@/types/product-response-d-t";
import {convertProductResponse} from "@/plugins/data/product-data";
import type {IUser} from "@/types/user-d-t";

export const useCompareStore = defineStore("compare_product", () => {
    const {t} = useI18n();
    let compare_items = ref<IProduct[]>([]);
    const cookies = useCookie<IUser>('user', {
        // parseJSON: true,
        persist: true,
        watch: true
    });

    const isLoggedIn = () => !!cookies.value?.token;

    // add_compare_product
    const add_compare_product = (payload: IProduct) => {
        const isAdded = compare_items.value.findIndex((p) => p.id === payload.id);
        if (isAdded !== -1) {
            removeCompare(payload);
        } else {
            if (isLoggedIn()) {
                $axios.post('comparelist/add', formDataService({product_id: payload.id}))
                    .then((response) => {
                        compare_items.value.push(payload);
                        toast.success(response?.data?.message || `${payload.name} added to compare`);
                    })
            } else {
                compare_items.value.push(payload);
                toast.success(`${payload.name} added to compare`);
                localStorage.setItem("compare_products", JSON.stringify(compare_items.value));
            }
        }
    };

    // removeCompare
    const removeCompare = (payload: IProduct) => {
        if (isLoggedIn()) {
            $axios.post('comparelist/remove', formDataService({product_id: payload.id}))
                .then((response) => {
                    compare_items.value = compare_items.value.filter((p) => p.id !== payload.id);
                    toast.success(response?.data?.message || `${payload.name} removed from compare`);
                })
        } else {
            compare_items.value = compare_items.value.filter((p) => p.id !== payload.id);
            toast.error(`${payload.name} remove from compare`);
            localStorage.setItem("compare_products", JSON.stringify(compare_items.value));
        }
    };

    const removeCompareProduct = (payload: IProduct) => {
        swal({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            dangerMode: true,
            buttons: [t("Cancel"), t("Remove")],
        })
            .then((result?: boolean) => {
                if (result) {
                    return removeCompare(payload);
                }
            })
    };

    const fetchComparelist = async () => {
        if ($axios.hasToken()) {
            const response: { data: { data: IProductResponse[] } } = await $axios.get('comparelist', {
                baseURL: "http://127.0.0.1:3000/api"
            });
            compare_items.value = (response?.data?.data || []).map(convertProductResponse);
        } else {
            const compareData = localStorage.getItem("compare_products");
            if (compareData) {
                compare_items.value = JSON.parse(compareData);
            }
        }
    }

    // mounted to update cart products
    onMounted(() => {
        fetchComparelist();
    });

    const clearCompare = () => {
        swal({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            dangerMode: true,
            buttons: [t("Cancel"), t("Remove all")],
        })
            .then((result?: boolean) => {
                if (result) {
                    if (isLoggedIn()) {
                        $axios.post('comparelist/clear')
                        .then((response) => {
                            compare_items.value = [];
                            toast.success(response?.data?.message || `Compare cleared`);
                        })
                    } else {
                        compare_items.value = [];
                        localStorage.setItem("compare_products", JSON.stringify(compare_items.value));
                    }
                }
            })
    };

    return {
        add_compare_product,
        removeCompareProduct,
        removeCompare,
        clearCompare,
        compare_items,
        fetchComparelist,
    };
});
