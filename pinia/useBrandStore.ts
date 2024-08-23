import { defineStore } from "pinia";
import {onMounted, ref, watch} from "vue";
import type {IBrand} from "@/types/brand-d-t";
import {api} from "@/plugins/api";

export let brands_data = ref<IBrand[]>([]);

export const useBrandStore = defineStore("brand", () => {
  let activeImg = ref<string>("");
  let openFilterDropdown = ref<boolean>(false);
  let openFilterOffcanvas = ref<boolean>(false);
  let currentPage = ref<number>(1); // page number value as ref

  const loadBrands = async () => {
    const route = useRoute();
    let slug = route?.params?.brand;
    brands_data.value = await api.brandData({
      slug,
      page: currentPage.value
    });
    activeImg.value = brands_data.value[0]?.imageUrl || "";
    return brands_data.value;
  };

  // onMounted(loadBrands);

  // Watch for changes in the current page and reload brands
  watch(currentPage, loadBrands);

  // Update current page
  const updateCurrentPage = (pageNumber: number) => {
    currentPage.value = pageNumber;
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
    brand_data: brands_data,
    activeImg,
    handleImageActive,
    handleOpenFilterDropdown,
    openFilterDropdown,
    openFilterOffcanvas,
    handleOpenFilterOffcanvas,
    currentPage,
    loadBrands,
    updateCurrentPage,
  };
});
