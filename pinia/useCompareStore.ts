import { ref, onMounted } from "vue";
import { type IProduct } from "@/types/product-d-t";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import swal from "sweetalert";
import {$axios} from "@/plugins/00.axiosInstance";
import formDataService from "@/services/formDataService";
import type {IProductResponse} from "@/types/product-response-d-t";
import {convertProductResponse} from "@/plugins/data/product-data";

export const useCompareStore = defineStore("compare_product", () => {
  let compare_items = ref<IProduct[]>([]);
  const {t}=useI18n();

  // add_compare_product
  const add_compare_product = (payload: IProduct) => {
    const isAdded = compare_items.value.findIndex((p) => p.id === payload.id);
    if (isAdded !== -1) {
      removeCompare(payload);
    } else {
      $axios.post('comparelist/add', formDataService({product_id: payload.id}))
          .then((response) => {
            compare_items.value.push(payload);
            toast.success(response?.data?.message || `${payload.name} added to compare`);
          })
    }
  };

  // removeCompare
  const removeCompare = (payload: IProduct) => {
    $axios.post('comparelist/remove', formDataService({product_id: payload.id}))
        .then((response) => {
          compare_items.value = compare_items.value.filter((p) => p.id !== payload.id);
          toast.success(response?.data?.message || `${payload.name} removed from compare`);
        })
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
            $axios.post('comparelist/clear')
                .then((response) => {
                  compare_items.value = [];
                  toast.success(response?.data?.message || `Compare cleared`);
                })
          }
        })
  };

  return {
    add_compare_product,
    removeCompareProduct,
    removeCompare,
    clearCompare,
    compare_items,
  };
});
