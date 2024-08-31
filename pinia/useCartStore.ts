import {computed, onMounted, ref, watch} from "vue";
import {type IProduct} from "@/types/product-d-t";
import {defineStore} from "pinia";
import {toast} from "vue3-toastify";
import type {ICartItem} from "@/types/cart-item-d-t";
import toolsService from "@/services/toolsService";
import swal from 'sweetalert';
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";

export const useCartStore = defineStore("cart_product", () => {
    const {t} = useI18n();
    const route = useRoute();
    let cart_products = ref<ICartItem[]>([]);
    let cart_product = ref<IProduct>({} as IProduct);
    let cart_title = ref<string | null>(t("Add To Cart"));
    let orderQuantity = ref<number>(1);
    let cartOffcanvas = ref<boolean>(false);
    let cart_modal_status = ref<boolean>(false);
    let cart_modal_qty = ref<number>(1);

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
            toast.error(`Out of stock ${payload.name}`);
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

        const isExist = cart_products.value.some(searchForItem);
        if (!isExist) {
            cart_products.value.push(cart);
            localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
            toast.success(`${toolsService.parseProductName(cart?.differents, true)} added to cart`);
        } else {
            cart_products.value.map((item) => {
                if (searchForItem(item)) {
                    item.quantity = item.quantity + cart.quantity;
                    toast.success(`${toolsService.parseProductName(item?.differents, true)} added to cart`);
                }
                return {...item};
            });
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
                if ((accessories.length === p?.accessories?.length) && (accessories.length === payload?.accessories?.length))
                {
                    if (cb)
                    {
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
        cart_products.value.forEach(cartProductByPayload(payload, (item: ICartItem) => {
            if (typeof item.quantity !== "undefined") {
                if (item.quantity > 1) {
                    quantitySet(payload, (item.quantity || 1) - 1);
                } else {
                    removeCartProduct(item);
                }
            }
        }))
    };

    const quantityIncrement = (payload: IProduct) => {
        quantitySet(payload, (item: ICartItem) => (item.quantity || 1) + 1);
    };

    const quantitySet = (payload: IProduct, quantity: number|Function) => {
        quantity = (typeof quantity !== "function") && isNaN(quantity) ? 1 : quantity;
        cart_products.value.forEach((cartProductByPayload(payload, (item: ICartItem) => {
            if (typeof quantity === "function") {
                item.quantity = Number(quantity(item));
            } else {
                item.quantity = Number(quantity);
            }

            return item;
        })))
        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
        toast.info(`Quantity For ${toolsService.parseProductName(payload, true)} updated to ${quantity} `);
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
        swal({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            dangerMode: true,
            buttons: [t("Cancel"), t("Remove")],
        })
            .then((result?: boolean) => {
                if (result) {
                    cart_products.value = cart_products.value.filter(filterCartProductByPayload(payload));
                    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
                    toast.error(`${toolsService.parseProductName(payload, true)} removed from cart`);
                }
            })
    };

    // cart product initialize
    const initializeCartProducts = () => {
        const cartData = localStorage.getItem("cart_products");
        if (cartData) {
            cart_products.value = JSON.parse(cartData);
        }
    };

    // clear cart
    const clear_cart = () => {
        const confirmMsg = window.confirm(
            "Are you sure you want to delete all cart items?"
        );
        if (confirmMsg) {
            cart_products.value = [];
        }
        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
    };

    // initialOrderQuantity
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
        return item?.differents?.net + calcAccessoriesPrice(item?.accessories);
    }

    // totalPriceQuantity
    const totalPriceQuantity = computed(() => {
        return cart_products.value.reduce(
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
    const handleCartOffcanvas = () => {
        cartOffcanvas.value = !cartOffcanvas.value;
    };

    // set local storage product when project is mounted
    onMounted(() => {
        initializeCartProducts();
    });

    // when the router changes, the order quantity will be set to 1
    watch(() => route.path, () => {
        orderQuantity.value = 1;
    });

    return {
        openCartProduct,
        cart_products,
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
        calcCartItem
    };
});
