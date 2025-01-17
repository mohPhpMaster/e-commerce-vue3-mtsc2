<template>
  <div class="tp-product-details-wrapper has-sticky">
    <!-- Category Name -->
    <div v-if="different?.parentCategory" class="tp-product-details-category">
      <span>{{ toolsService.parseCategoryName(different?.parentCategory) }}</span>
    </div>

	  <!-- Product Title -->
    <h3 class="tp-product-details-title">{{ toolsService.parseProductName(different, true) }}</h3>

	  <!-- Inventory Details -->
    <div class="tp-product-details-inventory d-flex align-items-center mb-10">
      <div class="tp-product-details-stock mb-10">
          <span>{{ different?.quantity === 0 ? $t('Out of Stock') : $t('In Stock') }}</span>
      </div>
      <div class="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div class="tp-product-details-rating">
						<product-rating :product="different" />
          </div>
          <div class="tp-product-details-reviews">
            <span>{{ $t(':count Reviews', {count: different?.reviews?.length || 0}) }}</span>
          </div>
      </div>
    </div>

	  <!-- Description -->
	  <text-show-more-less v-if="different?.description" :product="different" class="p-0 pb-4" />

	  <!-- Price Section -->
    <div class="tp-product-details-price-wrapper mb-20">
      <div v-if="different?.discount">
        <span class="tp-product-details-price new-price product-price-value">{{ currency(different?.net) }} </span>
        <span class="tp-product-details-price old-price product-old-price-value">{{ currency(different?.price) }}</span>
      </div>
      <span
		      v-else
		      class="tp-product-details-price new-price product-price-value"
      >{{ currency(different?.price) }}</span>
   </div>

	  <!-- Product Countdown -->
    <div v-if="different?.offerDate?.endDate">
	    <product-details-countdown :product="different" />
	  </div>

	  <!-- Actions (Quantity, Add to Cart) -->
    <div class="tp-product-details-action-wrapper">
      <h3 class="tp-product-details-action-title">{{ $t("Quantity") }}</h3>
      <div class="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <div class="tp-product-details-quantity">
            <div class="tp-product-quantity mb-15 mr-15">
                <span class="tp-cart-minus" @click.stop.prevent="cartStore.decrement">
                  <svg-minus />
                </span>
                <input :value="cartStore.orderQuantity" class="tp-cart-input" readonly type="text">
                <span class="tp-cart-plus" @click.stop.prevent="cartStore.increment">
                  <svg-plus-sm />
                </span>
            </div>
          </div>
          <div class="tp-product-details-add-to-cart mb-15 w-100">
          <button
		          :data-bs-dismiss="isShowBottom ? '' : 'modal'"
		          class="tp-product-details-add-to-cart-btn w-100"
		          @click="addToCart(mainProduct)"
          >
            {{ $t("Add To Cart") }}
          </button>
          </div>
      </div>
	    <!--      <nuxt-link @click="cartStore.openCartProduct(product)" :href="'/cart'" class="tp-product-details-buy-now-btn w-100 text-center">{{ $t("Buy Now") }}</nuxt-link>-->
    </div>

	  <!-- Additional Information (Tags, Category, Social, etc.) -->
    <div v-if="isShowBottom">
      <product-details-differents-accessories
		      :accessories="accessories"
		      :different="different"
		      :product="mainProduct"
		      @clicked="differentProductClicked"
		      @updated="accessoryProductUpdated"
      />

      <div class="tp-product-details-query">
	      <div v-if="different?.tags?.length" class="tp-product-details-query-item d-flex align-items-center">
	          <span>{{ $t("Tags:") }}  </span>
	          <p v-for="tag in different?.tags" :key="tag">{{ tag }}</p>
	      </div>
	      <div v-if="different?.parentCategory" class="tp-product-details-query-item d-flex align-items-center">
	          <span>{{ $t("Category:") }}  </span>
	          <p>{{ toolsService.parseCategoryName(different?.parentCategory) }}</p>
	      </div>
	    </div>
	    <div class="tp-product-details-social">
	      <span>{{ $t("Share:") }}  </span>
	      <product-details-share />
	    </div>
	    <div class="tp-product-details-msg mb-15">
	      <ul>
	          <li>{{ $t("30 days easy returns") }}</li>
	          <li>{{ $t("Order yours before 2.30pm for same day dispatch") }}</li>
	      </ul>
	    </div>
	    <div class="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
	      <p v-html="toolsService.normalizeLineEndingsToHtml($t('Guaranteed safe & secure checkout'))" />
	      <img alt="" src="/images/product/icons/payment-option.png">
	    </div>
    </div>

  </div>
</template>


<script lang="ts" setup>
import {type IProduct} from '@/types/product-d-t';
import {useCartStore} from "@/pinia/useCartStore";
import toolsService from "@/services/toolsService";
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import {toast} from "vue3-toastify";
import type {ICartItem} from "@/types/cart-item-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";
import {convertProductAccessoriesResponse} from "@/plugins/data/product-accessories-groups-data";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";
import currency from "@/services/currencyService";
import type {IProductAccessoriesData} from "@/types/selected-accessories-data-d-t";

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const {t} = useI18n();
const emit = defineEmits(['updated'])

const props = withDefaults(defineProps<{ product: IProduct; mainProduct: IProduct; isShowBottom?: boolean }>(), {
	isShowBottom: true,
})
const different = ref<IProduct>(props?.product);
const accessories = ref<IProductAccessoriesData[]>([] as IProductAccessoriesData[]);

const {
	data: productAccessories,
	error: productAccessoriesError,
	pending: productAccessoriesPending,
	execute: productAccessoriesExecute,
} = useLazyAsyncData(
		`products-${props.mainProduct?.id}-accessories`,
		() => {
			if (!props.isShowBottom) return Promise.resolve([]);

			return $axios.get(`products/${toolsService.id(props.mainProduct)}/accessories_groups`)
					.then(res => (res?.data?.data || []).map(convertProductAccessoriesResponse));
		},
		{
			watch: [props.mainProduct, props.product, route],
		}
)

const addToCart = (product: IProduct) => {
	if (!props.isShowBottom) {
		cartStore.openCartProduct(product, t('Add To Cart'));
		return false;
	}

	let requiredAccessories = productAccessories.value.filter((accessory) => accessory?.is_required);
	// let requiredAccessories = productAccessories.value.slice(0,1);
	if (!requiredAccessories.every((accessory) => (accessory.id in accessories.value))) {
		toast.error(t("Please select all required accessories"));
		return false;
	}

	let $accessories: ISelectedAccessories[] = productAccessories.value
			.filter((accessory) => accessory?.id in accessories.value)
			.map((accessory) => ({
				group: accessory,
				accessory: accessories.value[accessory.id],
			}))

	const cartItem: ICartItem = {
		quantity: cartStore.orderQuantity,
		accessories: $accessories,
		differents: different.value,
	}
	cartStore.addToCart(cartItem);
}

const differentProductClicked = ($product: IProduct) => {
	different.value = $product;
	emit('updated', $product)
	// route.query?.different = $product?.id
	router.push({
		query: {
			...route.query,
			different: $product?.id,
			different_name: toolsService.parseProductDifferent($product),
		}
	})
}

const accessoryProductUpdated = ($group: IProductAccessories, $accessory: IProductAccessoriesGroups, $productAccessories: IProductAccessoriesGroups[]) => {
	let _value = [
		...accessories.value,
	]
	_value[$group.id] = $accessory
	accessories.value = _value
	if (!$accessory?.id) {
		delete accessories.value[$group.id]
	}
}

watch(
		() => props.product,
		async (newStatus, oldStatus) => {
			different.value = newStatus
			accessories.value = [] as IProductAccessoriesGroups[]
			// console.log(251, different.value)
		}
);
</script>
