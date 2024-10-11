<template>
	<div :id="id" class="modal fade tp-product-modal" role="dialog" tabindex="-1" @close="close">
	  <div class="modal-dialog modal-dialog-centered" data-bs-backdrop="static" role="document">
	    <div class="modal-content">

	      <!-- CartModal Header -->
	      <div class="modal-header">
	        <h4 class="modal-title">{{ parsedTitle }}</h4>
	        <button class="close tp-product-modal-close-btn" data-bs-dismiss="modal" type="button">
            <i class="fa-regular fa-xmark"></i>
	        </button>
	      </div>

		    <!-- CartModal Body -->
	      <div class="modal-body">
		      <product-details-differents-accessories
				      :different="different"
				      :product="product"
				      @clicked="setDifferentProduct"
				      @updated="setAccessoryProduct"
				      @onLoading="loading = $event"
		      />
	      </div>

		    <!-- CartModal Footer -->
	      <div class="modal-footer">
			    <div class="tp-product-details-action-wrapper col">
			      <h3 class="tp-product-details-action-title">{{ $t("Quantity") }}</h3>
			      <div class="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
			          <div class="tp-product-details-quantity">
			            <div class="tp-product-quantity mb-15 mr-15">
			                <span class="tp-cart-minus" @click.stop.prevent="loading || store.decrement()">
			                  <svg-minus />
			                </span>
			                <input :value="store.orderQuantity" class="tp-cart-input" readonly type="text">
			                <span class="tp-cart-plus" @click.stop.prevent="loading || store.increment()">
			                  <svg-plus-sm />
			                </span>
			            </div>
			          </div>
			      </div>
			    </div>

          <div class="tp-product-details-add-to-cart mb-15 row">
            <button
		            :disabled="loading || Object.keys(different).length === 0"
		            class="tp-product-details-buy-now-btn my-1"
		            data-bs-dismiss="modal"
		            @click="commitProductToCart"
            >{{ $t("Add To Cart") }}</button>
            <button
		            class="tp-product-details-add-to-cart-btn my-1"
		            data-bs-dismiss="modal"
		            type="button"
            >{{ $t("Cancel") }}</button>
          </div>

	      </div>

	    </div>
	  </div>
	</div>
</template>

<script lang="ts" setup>
import {useCartStore} from "@/pinia/useCartStore";
import type {IProduct} from "@/types/product-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";
import type {ICartItem} from "@/types/cart-item-d-t";
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";

const props = defineProps<{
	title?: string;
	id?: string;
	cart_different_products_count?: number;
	cart_accessory_products_count?: number;
}>();
const emit = defineEmits(['selected', 'closed', 'opened']);

const router = useRouter();
const route = useRoute();
const {t} = useI18n();
const store = useCartStore();
const globalLoading = useLoading();

const cartModalStatus = computed(() => store.cart_modal_status);
const cartModalQty = computed(() => store.orderQuantity);
const product = computed(() => store.cart_product);
const parsedTitle = computed(() => store.cart_title || props.title);
const modalElement = computed(function () {
  return window.$.fn && window.$(`#${props.id}`) || window.querySelector(`#${props.id}`);
});

const loading = ref(false);
const modalStatus = ref(false);
const different = ref<IProduct>(product.value);
const accessories = ref<ISelectedAccessories[]>([] as ISelectedAccessories[]);

const setDifferentProduct = ($product: IProduct) => {
	different.value = $product;
}

const setAccessoryProduct = ($group: IProductAccessories, $accessory: IProductAccessoriesGroups, $productAccessories: IProductAccessoriesGroups[]) => {
	if ($accessory?.id) {
		accessories.value = [
			...accessories.value,
			{
				group: $group,
				accessory: $accessory
			}
		]
	}
}

const modal = (...args: any[]) => {
	return modalElement.value.modal(...args);
};

const close = () => {
	modalStatus.value = false;

	if (cartModalStatus.value) {
		store.closeCart();
	}

	modal('hide');
	store.cart_product = {} as IProduct;
	different.value = {} as IProduct;
	accessories.value = [] as IProductAccessoriesGroups[]
	globalLoading.enable();
};

const open = async () => {
	globalLoading.disable();
	different.value = Object.keys(different.value).length ? different.value : product.value;
	modalStatus.value = true;

	if (!cartModalStatus.value) {
		store.openCart();
	}

	modal('show');
};

const commitProductToCart = () => {
	if (!different.value) {
		return;
	}

	const cart: ICartItem = {
		differents: different.value,
		accessories: accessories.value,
		quantity: cartModalQty.value
	};

	emit('selected', cart);
	store.addToCart(cart)
	store.initialOrderQuantity();
};

const checkModal = async () => {
	await nextTick(async () => {
		if (cartModalStatus.value) {
			modalStatus.value || await open();
		} else {
			modalStatus.value && close();
		}
	});
};

onMounted(async () => {
	await checkModal();
	modalElement.value
			?.on('hidden.bs.modal', () => {
				if (cartModalStatus.value) {
					store.closeCart();
				}

				emit('closed');
			})
			?.on('shown.bs.modal', () => {
				if (!cartModalStatus.value) {
					store.openCart();
				}

				emit('opened');
			});
});

onUnmounted(() => {
	modalElement.value
			?.off('hidden.bs.modal')
			?.off('shown.bs.modal');
});

watch(cartModalStatus, async (newVal, oldVal) => {
	await checkModal();
});
</script>

<style lang="scss">
.modal-dialog {
	max-width: 99%;
}

.product-differents-block {
	/*max-height: 25vh;
	height: 25vh;*/
}

.product-accessories-block {
	/*max-height: 25vh;
	height: 25vh;*/
}

.error {
	color: red;
}
</style>
