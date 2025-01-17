import {computed, onMounted, ref, watch} from "vue";
import {type IProduct} from "@/types/product-d-t";
import {defineStore} from "pinia";
import {toast} from "vue3-toastify";
import type {ICartItem} from "@/types/cart-item-d-t";
import toolsService from "@/services/toolsService";
import swal from 'sweetalert';
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";
import formDataService from "@/services/formDataService";
import type {ICartResponse} from "@/types/cart-response-d-t";
import {convertCartResponse} from "@/plugins/data/cart-data";
import type {IUser} from "@/types/user-d-t";
import {useUserStore} from "@/pinia/useUserStore";

export const useCartStore = defineStore("cart_product", () => {
    const nuxt_app = useNuxtApp();
    const {t} = nuxt_app?.$i18n;
    const cookies = useCookie<IUser>('user', {
        // parseJSON: true,
        persist: true,
        watch: true
    });

    const isLoggedIn = () => !!cookies.value?.token;
    const isUserInitialized = () => !!useUserStore().initialized;

    // const {$axios} = nuxt_app;
    const route = useRoute();
    let cart_products = ref<ICartItem[]>([]);
    let cart_product = ref<IProduct>({} as IProduct);
    let cart_title = ref<string | null>("");
    let orderQuantity = ref<number>(1);
    let cartOffcanvas = ref<boolean>(false);
    let cart_modal_status = ref<boolean>(false);
    let cart_modal_qty = ref<number>(1);
    const fetch_status = ref<boolean>(false);

    const incrementCartQty = () => {
        cart_modal_qty.value = cart_modal_qty.value + 1;
    }
    const decrementCartQty = () => {
        if (cart_modal_qty.value > 1) {
            cart_modal_qty.value = cart_modal_qty.value - 1;
        }
    }
    const openCart = () => {
        cart_modal_status.value = true;
    }
    const closeCart = () => {
        cart_modal_status.value = false;
    }

    const openCartProduct = (payload: IProduct, title?: string = null) => {
        if (payload.quantity === 0) {
            toast.error(t(':product Out of stock', {product: payload.name}));
            return;
        }

        cart_product.value = {
            ...payload,
            quantity: orderQuantity.value || 1,
        };
        title && (cart_title.value = title);

        openCart();
    };

    const addToCart = (cart: ICartItem) => {
        console.log(76, cart)
        if (cart_modal_status.value) {
            closeCart();
        }
        const searchForItem = (i, $index): boolean | number => (
            (i?.differents?.id === cart?.differents?.id) &&
            (i?.accessories && cart?.accessories && i.accessories.length === cart.accessories.length) &&
            i?.accessories.every((a: ISelectedAccessories, index) => {
                return (
                        (a.group === cart?.accessories[index]?.group) ||
                        (a.group?.id === cart?.accessories[index]?.group?.id)
                    ) &&
                    (
                        (a.accessory === cart?.accessories[index]?.accessory) ||
                        (a.accessory?.id === cart?.accessories[index]?.accessory?.id)
                    )
            })
        );

        if (isLoggedIn()) {
            $axios.post('cart/add', formDataService({
                product_id: cart.differents.id,
                price: cart.differents.price,
                quantity: cart.quantity,
                accessories: cart.accessories.map(x => x.accessory.id),
            }))
                .then((response) => {
                    // cart_products.value.push(cart);
                    fetchCart();
                    toast.success(response?.data?.message || `Product added to cart`);
                })
        } else if (isUserInitialized()) {
            const isExist = cart_products.value.some(searchForItem);
            if (!isExist) {
                cart_products.value.push(cart);
            } else {
                cart_products.value.map((item) => {
                    if (searchForItem(item)) {
                        item.quantity = item.quantity + cart.quantity;
                    }
                    return {...item};
                });
            }
            localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
            // debugger;
            toast.success(`Product added to cart`);
        }
    }

    // quantity increment
    const increment = () => {
        return orderQuantity.value = orderQuantity.value + 1;
    }

    // quantity decrement
    const decrement = () => {
        return orderQuantity.value =
            orderQuantity.value > 1
                ? orderQuantity.value - 1
                : (orderQuantity.value = 1);
    }

    const cartProductByPayload = (payload: ICartItem, cb: Function) => {
        return (p: ICartItem, index: number) => {
            if (p?.differents?.id === payload?.differents?.id) {
                let accessories = [];
                for (const _accessory: ISelectedAccessories of payload?.accessories) {
                    accessories.push(
                        p?.accessories?.find((a: ISelectedAccessories) => a?.group?.id === _accessory?.group?.id && a?.accessory?.id === _accessory?.accessory?.id)
                    )
                }

                accessories = accessories.filter(x => x);
                if ((accessories.length === p?.accessories?.length) && (accessories.length === payload?.accessories?.length)) {
                    if (cb) {
                        return cb(p, index) || true;
                    }

                    return true
                }

                return false
            }

            return false;
        };
    };

    const quantityDecrement = (payload: IProduct) => {
        // payload.quantity = payload.quantity - 1;
        quantitySet(payload, payload.quantity-1)
        // cart_products.value.forEach(cartProductByPayload(payload, (item: ICartItem) => {
        //     if (typeof item.quantity !== "undefined") {
        //         if (item.quantity > 1) {
        //             quantitySet(payload, (item.quantity || 1) - 1);
        //         } else {
        //             removeCartProduct(item);
        //         }
        //     }
        // }))
    };

    const quantityIncrement = (payload: IProduct) => {
        quantitySet(payload, payload.quantity + 1)
        // console.log(171, payload)
        // payload.quantity = payload.quantity + 1;
        // quantitySet(payload, (item: ICartItem) => (item.quantity || 1) + 1);
    };

    const quantitySet = (payload: IProduct, quantity: number | Function) => {
        if ($axios.hasToken()) {
            $axios.post(`cart/${payload.id}`, formDataService({
                quantity,
            }))
                .then((response) => {
                    let cartData = convertCartResponse(response?.data?.data || {});
                    cart_products.value = cartData.cartItems;

                    toast.success(response?.data?.message || `Quantity For ${toolsService.parseProductName(payload, true)} updated to ${quantity} `);
                })
                .catch((error) => {
                    console.error('Error updating cart product:', error);
                });
        } else {
            payload.quantity = quantity;
            localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
            toast.info(`Quantity For ${toolsService.parseProductName(payload, true)} updated to ${quantity} `);
        }
        // quantity = (typeof quantity !== "function") && isNaN(quantity) ? 1 : quantity;
        // cart_products.value.forEach((cartProductByPayload(payload, (item: ICartItem) => {
        //     if (typeof quantity === "function") {
        //         item.quantity = Number(quantity(item));
        //     } else {
        //         item.quantity = Number(quantity);
        //     }
        //
        //     return item;
        // })))
        // localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
        // toast.info(`Quantity For ${toolsService.parseProductName(payload, true)} updated to ${quantity} `);
    };

    const filterCartProductByPayload = (payload: ICartItem) => {
        return (p: ICartItem) => {
            if (p?.differents?.id !== payload?.differents?.id) {
                return true;
            }

            let accessories = [];
            for (const _accessory: ISelectedAccessories of payload?.accessories) {
                accessories.push(
                    p?.accessories?.find((a: ISelectedAccessories) => a?.group?.id === _accessory?.group?.id && a?.accessory?.id === _accessory?.accessory?.id)
                )
            }

            accessories = accessories.filter(x => x);
            return !((accessories.length === p?.accessories?.length) && (accessories.length === payload?.accessories?.length));
        };
    };

    // remover_cart_products
    const removeCartProduct = (payload: IProduct | ICartItem) => {
        let _status_modal = cart_modal_status.value;
        let _status_offcanvas = cartOffcanvas.value;

        closeCart();
        cartOffcanvas.value = false;

        swal({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            dangerMode: true,
            buttons: [t("Cancel"), t("Remove")],
        })
            .then((result?: boolean) => {
                if (result) {
                    if (isLoggedIn()) {
                        $axios.post('cart/remove', formDataService({
                            product_id: (payload?.id || payload?.differents?.id),
                            id: payload?.id
                        }))
                            .then((response) => {
                                // cart_products.value = cart_products.value.filter(filterCartProductByPayload(payload));
                                fetchCart();
                                toast.success(response?.data?.message || `${payload.name} removed from cart`);
                            })
                    } else if (isUserInitialized()) {
                        cart_products.value = cart_products.value.filter(filterCartProductByPayload(payload));
                        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
                        toast.error(`${toolsService.parseProductName(payload, true)} removed from cart`);
                    }
                }
            })
            .then(() => {
                if (_status_modal) {
                    openCart()
                }

                if (_status_offcanvas) {
                    handleCartOffcanvas();
                }
            });
    };

    const clear_cart = () => {
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
                        $axios.post('cart/clear')
                            .then((response) => {
                                fetchCart();
                                toast.success(response?.data?.message || `Cart cleared`);
                            })
                    } else if (isUserInitialized()) {
                        cart_products.value = [];
                        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
                    }
                }
            })
    };

    const initialOrderQuantity = () => {
        return orderQuantity.value = 1;
    };

    const calcAccessoriesPrice = (accessories: ISelectedAccessories[]) => {
        let itemTotal = 0;
        accessories.forEach((accessory: ISelectedAccessories) => {
            if (accessory?.group?.net) {
                itemTotal += accessory?.group?.net;
            }
            if (accessory?.accessory?.net) {
                itemTotal += accessory?.accessory?.net * Number(accessory?.accessory?.qty || 1);
            }
        });

        return itemTotal;
    }

    const calcCartItem = (item: ICartItem): number => {
        return (item?.differents?.net || Number(item?.price || 0)) + calcAccessoriesPrice(item?.accessories);
    }

    // totalPriceQuantity
    const totalPriceQuantity = computed(() => {
        return cart_products.value?.reduce(
            (cartTotal, cartItem: ICartItem) => {
                if (!cartItem?.differents) {
                    return cartTotal;
                }

                const {net} = cartItem?.differents;
                const orderQuantity = cartItem.quantity;
                if (typeof orderQuantity !== "undefined") {
                    let itemTotal = Number(net || 0);
                    itemTotal += calcAccessoriesPrice(cartItem.accessories);

                    cartTotal.total += itemTotal * orderQuantity;
                    cartTotal.quantity += orderQuantity;
                }

                return cartTotal;
            },
            {
                total: 0,
                quantity: 0,
            }
        );
    });

    //handle cartOffcanvas
    const handleCartOffcanvas = () => cartOffcanvas.value = !cartOffcanvas.value;

    const fetchCart = async () => {
        if (!!fetch_status.value) {
            return;
        }

        fetch_status.value = true;
        if ($axios.hasToken()) {
            const response: { data: { data: ICartResponse } } = await $axios.get('cart'/*, {
                baseURL: "http://127.0.0.1:3000/api"
            }*/);
            let cartData = convertCartResponse(response?.data?.data || {});
            // debugger
            // cartData.cartItems = cartData.cartItems.map(x=>{
            //     let differents = x?.differents?.data || x?.differents || {};
            //     let accessories = x?.accessories?.data || x?.accessories || [];
            //     return {
            //         id: x?.id || undefined,
            //         quantity: x?.quantity || 0,
            //         accessories: accessories,
            //         differents: convertProductResponse(differents),
            //     }
            // });
            cart_products.value = cartData.cartItems;
        } else {
            const cartData = localStorage.getItem("cart_products");
            if (cartData) {
                cart_products.value = JSON.parse(cartData);
            }
        }

        fetch_status.value = false;
    }

    const products_count = computed(() => cart_products.value?.length);

    // set local storage product when project is mounted
    onMounted(() => {
        // fetchCart();
    });

    // when the router changes, the order quantity will be set to 1
    watch(() => route.path, () => {
        orderQuantity.value = 1;
    });

    return {
        openCartProduct,
        cart_products,
        products_count,
        quantityDecrement,
        quantityIncrement,
        quantitySet,
        removeCartProduct,
        clear_cart,
        initialOrderQuantity,
        totalPriceQuantity,
        handleCartOffcanvas,
        cartOffcanvas,
        orderQuantity,
        increment,
        decrement,
        cart_modal_status,
        cart_modal_qty,
        cart_product,
        cart_title,
        incrementCartQty,
        decrementCartQty,
        openCart,
        closeCart,
        addToCart,
        calcAccessoriesPrice,
        calcCartItem,
        fetchCart,
    };
});
