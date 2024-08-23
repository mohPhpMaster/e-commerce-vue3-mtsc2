import { ref, onMounted } from "vue";
import { type IProduct } from "@/types/product-d-t";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import swal from "sweetalert";
import toolsService from "@/services/toolsService";

export const useWishlistStore = defineStore("wishlist_product", () => {
  const {t} = useI18n();
  let wishlists = ref<IProduct[]>([]);

  // add_wishlist_product
  const add_wishlist_product = (payload: IProduct) => {
    const isAdded = wishlists.value.findIndex((p) => p.id === payload.id);
    if (isAdded !== -1) {
      wishlists.value = wishlists.value.filter((p) => p.id !== payload.id);
      toast.error(`${payload.name} remove to wishlist`);
    } else {
      wishlists.value.push(payload);
      toast.success(`${payload.name} added to wishlist`);
    }
    localStorage.setItem("wishlist_products", JSON.stringify(wishlists.value));
  };
  // removeWishlist
  const removeWishlist = (payload: IProduct) => {
    wishlists.value = wishlists.value.filter((p) => p.id !== payload.id);
    toast.error(`${payload.name} remove to wishlist`);
    localStorage.setItem("wishlist_products", JSON.stringify(wishlists.value));
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

  // cart product initialize
  const initializeWishlistProducts = () => {
    const wishlistData = localStorage.getItem("wishlist_products");
    if (wishlistData) {
      wishlists.value = JSON.parse(wishlistData);
    }
  };

  // mounted to update cart products
  onMounted(() => {
    initializeWishlistProducts();
  });
  return {
    add_wishlist_product,
    removeWishlist,
    removeWishlistProduct,
    wishlists,
  };
});
