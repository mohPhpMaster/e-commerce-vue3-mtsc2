<template>
	<div :id="id" class="modal fade tp-product-modal" @close="close" role="dialog" tabindex="-1">
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
		      <div class="pb-2 product-differents-block">
            <cart-product-differents
		            :product="product"
		            :productsCount="cart_different_products_count"
		            :productDifferents="productDifferents"
		            :select="productDifferentsValue"
		            @updated="setProductDifferents"
            ></cart-product-differents>
		      </div>

		      <div class="pt-2 product-accessories-block">
				    <cart-product-accessories
						    :product="product"
						    :productsCount="cart_accessory_products_count"
						    :select="productAccessoriesValue"
						    :productAccessories="productAccessories"
						    @updated="setProductAccessories"
				    />
		      </div>
	      </div>

		    <!-- CartModal Footer -->
	      <div class="modal-footer">
			    <div class="tp-product-details-action-wrapper col">
			      <h3 class="tp-product-details-action-title">{{ $t("Quantity") }}</h3>
			      <div class="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
			          <div class="tp-product-details-quantity">
			            <div class="tp-product-quantity mb-15 mr-15">
			                <span class="tp-cart-minus" @click.stop.prevent="store.decrement">
			                  <svg-minus />
			                </span>
			                <input class="tp-cart-input" type="text" :value="store.orderQuantity" readonly>
			                <span class="tp-cart-plus" @click.stop.prevent="store.increment">
			                  <svg-plus-sm />
			                </span>
			            </div>
			          </div>
			      </div>
			    </div>

          <div class="tp-product-details-add-to-cart mb-15 row">
            <button @click="commitProductToCart" data-bs-dismiss="modal" class="tp-product-details-buy-now-btn my-1" :disabled="!productDifferents?.length">{{ $t("Add To Cart") }}</button>
            <button type="button" data-bs-dismiss="modal" class="tp-product-details-add-to-cart-btn my-1">{{ $t("Cancel") }}</button>
          </div>

	      </div>

	    </div>
	  </div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert';
import PAG from "@/data/product_accessories_groups.json";
import {useCartStore} from "@/pinia/useCartStore";
import toolsService from "@/services/toolsService";
import {api} from "@/plugins/api";
import type {IProduct} from "@/types/product-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";
import type {ICartItem} from "@/types/cart-item-d-t";

const props = defineProps<{
	title: string;
	id: string;
	cart_different_products_count: number;
	cart_accessory_products_count: number;
}>();
const emit = defineEmits(['selected', 'closed', 'opened']);

const router = useRouter();
const {t} = useI18n();
const store = useCartStore();

const modalStatus = ref(false);
const productDifferentsValue = ref<string|number>("");
const productAccessoriesValue = ref<ISelectedAccessories[]>([] as ISelectedAccessories[]);
const productDifferents = ref<IProduct[]>([] as IProduct[]);
const productAccessories = ref<IProductAccessories[]>([] as IProductAccessories[]);

const cartModalStatus = computed(() => store.cart_modal_status);
const cartModalQty = computed(() => store.orderQuantity);
const product = computed(() => store.cart_product);

const parsedTitle = computed(() => props.title);

const modalElement = computed(() => window.$(`#${props.id}`));

const incrementQty = () => {
	// store.incrementCartQty()
	store.increment()
};

const decrementQty = () => {
	// store.decrementCartQty();
	store.decrement();
};

const modal = (...args: any[]) => {
	return modalElement.value.modal(...args);
};

const close = () => {
	modalStatus.value = false;

	if (cartModalStatus.value) {
		store.closeCart();
	}

	modal('hide');
};

const open = async () => {
	// Fetch product accessories and differents (adjust based on your logic)
	// await cartStore.fetchProductAccessoriesGroups(product.value?.slug);
	// await cartStore.fetchProductDifferents(product.value?.slug);

	modalStatus.value = true;

	if (!cartModalStatus.value) {
		store.openCart();
	}

	modal('show');
};

const commitProductToCart = () => {
	if (!productDifferentsValue.value) {
		return;
	}

	const cart: ICartItem = {
		differents: <IProduct>productDifferents.value.find((product_different: IProduct) => product_different?.id === productDifferentsValue.value),
		accessories: productAccessoriesValue.value,
		quantity: cartModalQty.value
	};

	emit('selected', cart);
	store.addToCart(cart)
	store.initialOrderQuantity();
	setProductAccessories([] as ISelectedAccessories[]);
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

const setProductDifferents = (value: IProduct) => {
	productDifferentsValue.value = value?.id;
};

const setProductAccessories = (value: any) => {
	productAccessoriesValue.value = value;
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

watch(product, async (newVal, oldVal) => {
	if (product?.value)
	{
		api.productDifferentsData({
			product: product.value
		}).then((res: any) => {
			productDifferents.value = [
				product.value,
				...res
			];
			setProductDifferents(product.value);
		})

		// productAccessories.value = PAG.data;
		// setProductAccessories([]);
		api.productAccessoriesGroupsData({
			product: product.value
		}).then((res: any) => {
			productAccessories.value = res;//.map((r: IProduct) => r.sku);
			// setProductAccessories([]);
		})
	}
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
</style>
