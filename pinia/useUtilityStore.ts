import {useCartStore} from './useCartStore';
import {ref, watch} from "vue";
import {defineStore} from "pinia";
import {type IProduct} from '@/types/product-d-t';
// import { useProductStore } from './useProductStore';
import {useProductStore} from "@/pinia/useProductStore";
import {api} from "@/plugins/api";

export const useUtilityStore = defineStore("utility", () => {
    const route = useRoute();
    const productStore = useProductStore();
    const cartStore = useCartStore();
    // const product_data = computed(() => productStore.product_data);
    let openSearchBar = ref<boolean>(false);
    let openMobileMenus = ref<boolean>(false);
    // product modal
    let modalId = ref<string | null>('product-modal-641e887d05f9ee1717e1348a');
    let product = ref<IProduct | null>(productStore?.product_data?.value?.[0]);
    // let product = useState<IProduct | null>('product', {value: product_data.value?.[0]});

    // video modal
    const videoUrl = ref<string>('https://www.youtube.com/embed/EW4ZYb3mCZk')
    const isVideoOpen: Ref<boolean> = ref(false);

    let iframeElement: HTMLIFrameElement | null = null;

    // handle image active
    const handleOpenSearchBar = () => {
        openSearchBar.value = !openSearchBar.value;

        if (openSearchBar.value) {
            setTimeout(() => {
                const userInput = document.querySelector('.search-bar-input-search');
                userInput?.focus();
                userInput?.select();
            }, 500);
        }
    };

    // handle image active
    const handleOpenMobileMenu = () => {
        openMobileMenus.value = !openMobileMenus.value;
    };

    // modal video play
    const playVideo = (videoId: string) => {
        const videoOverlay = document.querySelector("#video-overlay");
        videoUrl.value = `https://www.youtube.com/embed/${videoId}`
        if (!iframeElement) {
            iframeElement = document.createElement("iframe");
            iframeElement.setAttribute("src", videoUrl.value);
            iframeElement.style.width = "60%";
            iframeElement.style.height = "80%";
        }

        isVideoOpen.value = true;
        videoOverlay?.classList.add("open");
        videoOverlay?.appendChild(iframeElement);
    };
    // close modal video
    const closeVideo = () => {
        const videoOverlay = document.querySelector("#video-overlay.open");

        if (iframeElement) {
            iframeElement.remove();
            iframeElement = null;
        }

        isVideoOpen.value = false;
        videoOverlay?.classList.remove("open");
    };

    const removeBackdrop = () => {
        try {
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
                document.body.classList.remove('modal-open');
                document.body.removeAttribute('style');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // handle Open Modal
    const handleOpenModal = (id: string | null, item: IProduct | null, fetchProduct: boolean = false) => {
        if (!id || !item) {
            console.warn(83, 'handleOpenModal', id, item);
            window.$(`#${modalId.value}`).modal('hide');
        }

        modalId.value = id;
        product.value = item;
        productStore.handleImageActive(item ? item?.images?.[0] : "");
        cartStore.initialOrderQuantity()

        if (fetchProduct) {
            const loading = useLoading();
            loading.disable();
            api.productData({product: item})
                .then((products: IProduct[]) => products?.[0])
                .then((p?: IProduct) => {
                    if (p && p.id) {
                        product.value = p;
                        productStore.handleImageActive(p ? p?.images?.[0] : "");
                    }
                })
                .then(() => loading.enable())
        }
    };

    // const handleShippingCost = (value: number | string) => {
    //     if (value === 'free' || value === 0) {
    //         shipCost.value = 0;
    //     } else {
    //         shipCost.value = value as number;
    //     }
    // }

    watch(() => route.href, () => {
        openSearchBar.value = false;
        openMobileMenus.value = false;
    })


    return {
        handleOpenSearchBar,
        openSearchBar,
        handleOpenModal,
        modalId,
        product,
        openMobileMenus,
        handleOpenMobileMenu,
        playVideo,
        isVideoOpen,
        iframeElement,
        closeVideo,
        removeBackdrop,
        // handleShippingCost,
        // shipCost,
        // fees
    };
});
