import { ref, onMounted } from "vue";
import { type IProduct } from "@/types/product-d-t";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import swal from "sweetalert";
import toolsService from "@/services/toolsService";

export const useCompareStore = defineStore("compare_product", () => {
  let compare_items = ref<IProduct[]>([]);
  const {t}=useI18n();

  // add_compare_product
  const add_compare_product = (payload: IProduct) => {
    const isAdded = compare_items.value.findIndex((p) => p.id === payload.id);
    if (isAdded !== -1) {
      compare_items.value = compare_items.value.filter(
        (p) => p.id !== payload.id
      );
      toast.error(`${payload.name} remove to compare`);
    } else {
      compare_items.value.push(payload);
      toast.success(`${payload.name} added to compare`);
    }
    localStorage.setItem(
      "compare_products",
      JSON.stringify(compare_items.value)
    );
  };
  // removeCompare
  const removeCompareProduct = (payload: IProduct) => {
    compare_items.value = compare_items.value.filter(
      (p) => p.id !== payload.id
    );
    toast.error(`${payload.name} remove to compare`);
    localStorage.setItem(
      "compare_products",
      JSON.stringify(compare_items.value)
    );
  };

  const removeCompare = (payload: IProduct) => {
    swal({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      dangerMode: true,
      buttons: [t("Cancel"), t("Remove")],
    })
        .then((result?: boolean) => {
          if (result) {
            return removeCompareProduct(payload);
          }
        })
  };

  const clearCompare = (payload: IProduct) => {
    swal({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      dangerMode: true,
      buttons: [t("Cancel"), t("Remove all")],
    })
        .then((result?: boolean) => {
          if (result) {
            compare_items.value = [];
            localStorage.setItem("compare_products", JSON.stringify([]));
          }
        })
  };

  // cart product initialize
  const initializeCompareProducts = () => {
    const compareData = localStorage.getItem("compare_products");
    if (compareData) {
      compare_items.value = JSON.parse(compareData);
    }
  };

  // mounted to update cart products
  onMounted(() => {
    initializeCompareProducts();
  });
  return {
    add_compare_product,
    removeCompareProduct,
    removeCompare,
    clearCompare,
    compare_items,
  };
});
