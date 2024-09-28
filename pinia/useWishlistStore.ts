import { ref, onMounted } from "vue";
import { type IProduct } from "@/types/product-d-t";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import swal from "sweetalert";
import {$axios} from "@/plugins/00.axiosInstance";
import type {IProductResponse} from "@/types/product-response-d-t";
import {convertProductResponse} from "@/plugins/data/product-data";
import formDataService from "@/services/formDataService";

export const useWishlistStore = defineStore("wishlist_product", () => {
  const {t} = useI18n();
  let wishlists = ref<IProduct[]>([]);

  const add_wishlist_product = (payload: IProduct) => {
    const isAdded = wishlists.value.findIndex((p) => p.id === payload.id);
    if (isAdded !== -1) {
      removeWishlist(payload);
    } else {
      $axios.post('wishlist/add', formDataService({product_id: payload.id}))
          .then((response) => {
            wishlists.value.push(payload);
            toast.success(response?.data?.message || `${payload.name} added to wishlist`);
          })
    }
  };
  // removeWishlist
  const removeWishlist = (payload: IProduct) => {
    $axios.post('wishlist/remove', formDataService({product_id: payload.id}))
        .then((response) => {
          wishlists.value = wishlists.value.filter((p) => p.id !== payload.id);
          toast.success(response?.data?.message || `${payload.name} removed from wishlist`);
        })
  };

  // remover_cart_products
  const removeWishlistProduct = (payload: IProduct) => {
    swal({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      dangerMode: true,
      buttons: [t("Cancel"), t("Remove")],
    })
        .then((result?: boolean) => {
          if (result) {
            removeWishlist(payload)
          }
        })
  };

  const fetchWishlist = async () => {
    if ($axios.hasToken()) {
      const response: { data: { data: IProductResponse[] } } = await $axios.get('wishlist', {
        baseURL: "http://127.0.0.1:3000/api"
      });
      wishlists.value = (response?.data?.data || []).map(convertProductResponse);
    }
  }

  // mounted to update cart products
  onMounted(() => {
    fetchWishlist();
  });

  const clearWishlist = (payload: IProduct) => {
    swal({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      dangerMode: true,
      buttons: [t("Cancel"), t("Remove all")],
    })
        .then((result?: boolean) => {
          if (result) {
            $axios.post('wishlist/clear')
                .then((response) => {
                  wishlists.value = [];
                  toast.success(response?.data?.message || `Wishlist cleared`);
                })
          }
        })
  };

  return {
    add_wishlist_product,
    removeWishlistProduct,
    removeWishlist,
    clearWishlist,
    wishlists,
  };
});
