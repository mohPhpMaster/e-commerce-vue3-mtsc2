import {useCartStore} from './useCartStore';
import {computed, ref, watch} from "vue";
import {defineStore} from "pinia";
import {type IProduct} from '@/types/product-d-t';
// import { useProductStore } from './useProductStore';
import {useProductStore} from "@/pinia/useProductStore";
import type {ISiteSettings} from "@/types/site-settings-d-t";
import {api} from "@/plugins/api";
import type {ICartFee} from "@/types/cart-fee-d-t";

export const useUtilityStore = defineStore("utility", () => {
    const route = useRoute();
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const product_data = computed(() => productStore.product_data);
    let siteSettings = ref<ISiteSettings>({} as ISiteSettings);
    let openSearchBar = ref<boolean>(false);
    let openMobileMenus = ref<boolean>(false);
    // product modal
    let modalId = ref<string | null>('product-modal-641e887d05f9ee1717e1348a');
    let product = ref<IProduct | null>(product_data.value?.[0]);
    // let product = useState<IProduct | null>('product', {value: product_data.value?.[0]});

    // video modal
    const videoUrl = ref<string>('https://www.youtube.com/embed/EW4ZYb3mCZk')
    const isVideoOpen: Ref<boolean> = ref(false);
    
    const shipCost = ref<number>(0);
    const fees = ref<ICartFee[]>([] as ICartFee[]);

    let iframeElement: HTMLIFrameElement | null = null;

    // handle image active
    const handleOpenSearchBar = () => {
        openSearchBar.value = !openSearchBar.value;
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
        // const modalBackdrop = document.querySelector('.modal-backdrop');
        // if (modalBackdrop) {
        //     modalBackdrop.remove();
        //     document.body.classList.remove('modal-open');
        //     document.body.removeAttribute('style');
        // }
    };

    // handle Open Modal
    const handleOpenModal = (id: string | null, item: IProduct | null) => {
        if (!id || !item) {
            debugger
            window.$(`#${modalId.value}`).modal('hide');
        }

        modalId.value = id;
        product.value = item;
        productStore.handleImageActive(item ? item?.images?.[0] : "");
        cartStore.initialOrderQuantity()
    };

    const currency = (value: number | string | undefined = 0) => {
        value = Number(value || 0) || 0;
        return siteSettings.value?.currency + " " + parseFloat(value).toFixed(2);
    };

    const handleShippingCost = (value: number | string) => {
        if (value === 'free' || value === 0) {
            shipCost.value = 0;
        } else {
            shipCost.value = value as number;
        }
    }

    watch(() => route.href, () => {
        openSearchBar.value = false;
        openMobileMenus.value = false;
    })

    onMounted(() => {
        api.siteSettingsData()
            .then((res: ISiteSettings) => siteSettings.value = res);
    });

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
        siteSettings,
        currency,
        handleShippingCost,
        shipCost,
        fees
    };
});
