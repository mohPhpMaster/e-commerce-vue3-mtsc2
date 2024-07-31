import {createStore} from 'vuex';
import {getProducts} from "@/plugins/axios";
import response from "../../api/products.json";
// import axios from '@/plugins/axios';

const store = createStore({
    state: {
        categories: null,
        category: null,
        featured_categories: null,
        brands: null,
        products: [],
        product: null,
        product_accessories: null,
        product_accessories_groups: null,
        product_differents: null,
        cart: {
            items: [],
            total: 0,
        },
        cart_modal_status: false,
        cart_modal_qty: 1,
        menus: [],
        wishlist: null,
        slides: [],
        siteCurrency: '$', // Default value for site currency
    },
    mutations: {
        SET_FEATURED_CATEGORIES(state, data) {
            state.featured_categories = data;
        },
        SET_CATEGORIES(state, data) {
            state.categories = data;
        },
        SET_CATEGORY(state, data) {
            state.category = data;
        },
        SET_BRANDS(state, data) {
            state.brands = data;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_PRODUCT(state, data) {
            state.product = data;
        },
        SET_PRODUCT_ACCESSORIES(state, data) {
            state.product_accessories = data;
        },
        SET_PRODUCT_ACCESSORIES_GROUPS(state, data) {
            state.product_accessories_groups = data;
        },
        SET_PRODUCT_DIFFERENTS(state, data) {
            state.product_differents = data;
        },
        SET_CART_MODAL_STATUS(state, data) {
            state.cart_modal_status = data;
        },
        SET_CART_MODAL_QTY(state, data) {
            state.cart_modal_qty = data;
        },
        SET_CART(state, data) {
            state.cart = {
                items: data?.items || [],
                total: data?.total || 0
            };
        },
        ADD_TO_CART(state, product) {
            state.cart.items.push(product);
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart.items = state.cart.items.filter(item => item.slug !== productId);
        },
        SET_SITE_CURRENCY(state, siteCurrency) {
            state.siteCurrency = siteCurrency;
        },
        SET_MENUS(state, menus) {
            state.menus = menus;
        },
        SET_WISHLIST(state, data) {
            state.wishlist = data;
        },
        SET_SLIDES(state, slides) {
            state.slides = slides;
        },
    },
    actions: {
        async fetchFeaturedCategories({commit}) {
            try {
                // await axios.get("categories/featured")
                //     .then(res => {
                //         let data = res?.data?.data || [];
                //         // commit('SET_CATEGORIES', data);
                //         commit('SET_FEATURED_CATEGORIES', data);
                //     })
                //     .catch(err => console.error(err))

                const response = require("/api/featured_categories.json")?.data;
                // const response = (await axios.get('categories'))?.data;
                // console.log(response);
                commit('SET_FEATURED_CATEGORIES', response || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        async fetchCategories({commit}) {
            try {
                // await axios.get("categories")
                //     .then(res => {
                //         commit('SET_CATEGORIES', res?.data?.data || []);
                //     })
                //     .catch(err => console.error(err))

                const response = require("/api/categories.json")?.data;
                // console.log(response);
                commit('SET_CATEGORIES', response || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        async fetchCategory({commit, state}, id) {
            id = String(id).trim();
            // region: dev
            let category = null;

            try {
                let response = require("/api/categories.json")?.data;
                category = response?.find(cat => String(cat.slug).trim() === id);

                commit('SET_CATEGORY', category);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            return category;
            // endregion: dev

            // try {
            //     return axios.get('categories/' + id)
            //         .then(res => {
            //             let category = res?.data?.data || [];
            //             // let products = category?.products?.data;
            //
            //             // commit('SET_PRODUCTS',products);
            //             commit('SET_CATEGORY', category);
            //
            //             return category;
            //         });
            // } catch(error) {
            //     console.error('Error fetching category:', error);
            // }
        },
        async fetchCategoryProducts({commit, state, dispatch}, id) {
            // dispatch('fetchCategory', id);
            id = String(id).trim();
            try {
                let category = await dispatch('fetchCategory', id);
                let products = category?.products?.data;

                // commit('SET_CATEGORY', category);
                commit('SET_PRODUCTS', products);
                return {
                    category,
                    products
                };
            } catch (error) {
                console.error('Error fetching category:', error);
            }

            return {

            };
        },
        async fetchProducts({commit}, data = {}) {
         /*   try {
                const response = require("/api/products.json")?.data;
                // const response = await fetch('/api/products');
                // if (!response.ok) {
                //     throw new Error('Failed to fetch products');
                // }
                // const products = await response.json().data;
                commit('SET_PRODUCTS', response || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle the error appropriately in your application
            }
*/
            try {
                // const products = await axios.get('products')?.data;
                const products = getProducts(data);
                // commit('SET_CATEGORY', category);
                commit('SET_PRODUCTS', products);

                return products;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async fetchProduct({commit, state}, productId) {
            productId = String(productId).trim();
            // region: dev
            // let product = state?.products?.find(product => String(product.slug).trim() === productId);
            // if (product) {
            //     return product;
            // }

            try {
                let response = require("/api/products.json");
                let product = response?.data?.find(product => String(product.slug).trim() === productId);

                commit('SET_PRODUCT', product);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            // endregion: dev

            // try {
            //     const response = await axios.get('/api/product/' + productId);
            //     const product = await response?.data;
            //     commit('SET_PRODUCT', product);
            // } catch(error) {
            //     console.error('Error fetching products:', error);
            // }
        },
        async fetchProductAccessories({commit, state}, productId) {
            try {
                const response = require("/api/product_accessories.json");
                // let response = require("/api/products.json").data.find(product => String(product.slug).trim() === String(productId).trim())?.accessories;
                // response = {data: response};
                commit('SET_PRODUCT_ACCESSORIES', response?.data || []);
            } catch (error) {
                console.error('Error fetching product accessories:', error);
                // Handle the error appropriately in your application
            }

            // try {
            //     const response = await axios.get(`/api/products/${productId}/accessories`);
            //     const data = await response?.data;
            //     commit('SET_PRODUCT_ACCESSORIES', data);
            // } catch(error) {
            //     console.error('Error fetching product accessories:', error);
            // }
        },
        async fetchProductAccessoriesGroups({commit, state}, productId) {
            try {
                let response = require("/api/product_accessories_groups.json")?.data || [];

                commit('SET_PRODUCT_ACCESSORIES_GROUPS', response);
            } catch (error) {
                console.error('Error fetching product accessories groups:', error);
            }

            // try {
            //     const response = await axios.get(`/api/products/${productId}/accessories_groups`);
            //     const data = await response?.data;
            //     commit('SET_PRODUCT_ACCESSORIES_GROUPS', data);
            // } catch(error) {
            //     console.error('Error fetching product accessories groups:', error);
            // }
        },
        async fetchProductDifferents({commit, state}, productId = null) {
            if (!productId) {
                commit('SET_PRODUCT_DIFFERENTS', null);
                return;
            }

            let differents = undefined;
            try {
                // let response = require("/api/products.json").data.find(product => String(product.slug).trim() === String(productId).trim());
                let response = require("/api/product_differents.json")?.data;
                differents = Array.from(response);
                // differents?.unshift(response);
                // differents = Array.from(differents);
                // response = {data: differents};
                commit('SET_PRODUCT_DIFFERENTS', differents || []);
            } catch (error) {
                console.error('Error fetching product differents:', error);
                // Handle the error appropriately in your application
            }

            return differents || [];
            // try {
            //     const response = await axios.get(`/api/products/${productId}/differents`);
            //     const data = await response?.data;
            //     commit('SET_PRODUCT_DIFFERENTS', data);
            // } catch(error) {
            //     console.error('Error fetching product differents:', error);
            // }
        },
        async fetchBrands({commit}) {
            try {
                const response = require("/api/brands.json");
                // console.log(response);
                // const response = await axios.get('/api/brands/{id}/products');
                commit('SET_BRANDS', response?.data || []);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },
        async fetchSlides({commit}) {
            try {
                const response = require("/api/slides.json");
                // console.log(response);
                // const response = await axios.get('/api/slides');
                commit('SET_SLIDES', response?.data || []);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        },
        async fetchWishlist({commit}) {
            try {
                const response = require("/api/wishlist.json");
                // console.log(response);
                // const response = await axios.get('/api/wishlist');
                commit('SET_WISHLIST', response?.data || []);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        },
        async fetchCart({commit}) {
            try {
                const response = require("/api/cart.json");
                // console.log(response);
                // const response = await axios.get('/api/cart');
                let cart = response?.data || {};
                cart.items = cart?.items || [];
                cart.total = cart?.total || 0;
                commit('SET_CART', cart);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        },
        async fetchMenus({commit}) {
            try {
                const response = require("/api/menu.json");
                // const response = await axios.get('/api/categories');

                commit('SET_MENUS', response?.data || []);
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        },
        async fetchSiteSettings({commit}) {
            try {
                const response = require("/api/site-settings.json").data;

                // const response = await axios.get('/api/site-settings');
                const siteCurrency = response?.currency || "$";
                commit('SET_SITE_CURRENCY', siteCurrency);
            } catch (error) {
                console.error('Error fetching site settings:', error);
            }
        },
        async openCart({commit, state}, {product = undefined, qty = 1}) {
            try {
                commit('SET_CART_MODAL_STATUS', true);
                if(product)
                {
                    commit('SET_PRODUCT', product);
                }

                commit('SET_CART_MODAL_QTY', qty);
            } catch (error) {
                console.error('Error opening cart:', error);
            }
        },
        async closeCart({commit, state}) {
            try {
                commit('SET_CART_MODAL_STATUS', false);
            } catch (error) {
                console.error('Error closing cart:', error);
            }
        },
        async incrementCartQty({commit, state}) {
            try {
                commit('SET_CART_MODAL_QTY', state.cart_modal_qty + 1);
            } catch (error) {
                console.error('Error incrementing cart:', error);
            }
        },
        async decrementCartQty({commit, state}) {
            try {
                if (state.cart_modal_qty > 1) {
                    commit('SET_CART_MODAL_QTY', state.cart_modal_qty - 1);
                }
            } catch (error) {
                console.error('Error decrementing cart:', error);
            }
        },
    },
    getters: {
        featured_categories: (state) => state.featured_categories,
        categories: (state) => state.categories,
        category: (state) => state.category,
        products: (state) => state.products,
        product: (state) => state.product,
        product_accessories: (state) => state.product_accessories,
        product_accessories_groups: (state) => state.product_accessories_groups,
        product_differents: (state) => state.product_differents,
        brands: (state) => state.brands,
        cart: (state) => state.cart?.items || [],
        cart_total: (state) => state.cart?.total || 0,
        cart_modal_status: (state) => state.cart_modal_status,
        cart_modal_qty: (state) => state.cart_modal_qty,
        siteCurrency: (state) => state.siteCurrency,
        menus: (state) => state.menus,
        slides: (state) => state.slides,
        wishlist: (state) => state.wishlist,
    },
});

export default store;
