import menuData from "@/plugins/data/menu-data";
import categoryData from "@/plugins/data/category-data";
import productData from "@/plugins/data/product-data";
import relatedProductsData from "@/plugins/data/related-product-data";
import categorySingleData from "@/plugins/data/category-single-data";
import categoryFeaturedData from "@/plugins/data/category-featured-data";
import brandData from "@/plugins/data/brand-data";
import brandFeaturedData from "@/plugins/data/brand-featured-data";
import userLoginData from "@/plugins/data/user-login-data";
import productReviewsData from "@/plugins/data/product-reviews-data";
import userLogoutData from "@/plugins/data/user-logout-data";
import productDifferentsData from "@/plugins/data/product-differents-data";
import productAccessoriesGroupsData from "@/plugins/data/product-accessories-groups-data";
import siteSettingsData from "@/plugins/data/site-settings-data";
import cartFeesData from "@/plugins/data/cart-fees-data";
import userAddressesData from "@/plugins/data/user-addresses-data";

export const api = {
    menuData,
    categoryData,
    productData,
    relatedProductsData,
    categorySingleData,
    categoryFeaturedData,
    brandData,
    brandFeaturedData,
    userLoginData,
    userLogoutData,
    productReviewsData,
    productDifferentsData,
    productAccessoriesGroupsData,
    siteSettingsData,
    cartFeesData,
    userAddressesData,
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            api
        },
    }
})