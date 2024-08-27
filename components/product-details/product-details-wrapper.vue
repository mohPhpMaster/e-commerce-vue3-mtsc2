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
        <span class="tp-product-details-price new-price">{{ currency(different?.net) }} </span>
        <span class="tp-product-details-price old-price">{{ currency(different?.price) }}</span>
      </div>
      <span v-else class="tp-product-details-price new-price">{{ currency(different?.price) }}</span>
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
		          class="tp-product-details-add-to-cart-btn w-100"
		          data-bs-dismiss="modal"
		          @click="openCartProduct(different)"
          >
            {{ $t("Add To Cart") }}
          </button>
          </div>
      </div>
	    <!--      <nuxt-link @click="cartStore.openCartProduct(product)" :href="'/cart'" class="tp-product-details-buy-now-btn w-100 text-center">{{ $t("Buy Now") }}</nuxt-link>-->
    </div>

	  <!-- Additional Information (Tags, Category, Social, etc.) -->
    <div v-if="isShowBottom">
      <div class="tp-product-details-query">
	      <div class="row">
	        <div v-for="productDifferent in productDifferents" :key="productDifferent.id" class="col-12 col-xxl-6 pb-3">
		        <product-sm :current="different" :product="productDifferent" @clicked="differentProductClicked" />
	        </div>
	      </div>
	      <div class="row">
	        <div v-for="(productAccessory, i) in productAccessories" :key="productAccessory.id" class="col-12 pb-3">
		        <product-accessory-group-sm
				        :group="productAccessory"
				        @updated="accessoryProductClicked(productAccessory, $event)"
		        />
	        </div>
	      </div>
	    </div>
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
	      <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
	      <a href="#"><i class="fa-brands fa-twitter"></i></a>
	      <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
	      <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>
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
import {$axios} from "@/plugins/axiosInstance";
import {convertProductDifferentsResponse} from "@/plugins/data/product-differents-data";
import {convertProductAccessoriesResponse} from "@/plugins/data/product-accessories-groups-data";
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['updated'])

const props = withDefaults(defineProps<{ product: IProduct; mainProduct: IProduct; isShowBottom?: boolean }>(), {
	isShowBottom: true,
})
const different = useState('different', () => props?.product);
const accessories = useState('accessories', () => [] as IProductAccessoriesGroups[]);

const productDifferentsLoader = () => $axios.get(`products/${toolsService.id(props?.product)}/differents`).then(res => {
	let data = (res?.data?.data || []).map(convertProductDifferentsResponse);
	data.unshift(props?.mainProduct);
	if (route.query?.different) {
		different.value = data.find((product) => Number(product?.id) === Number(route.query?.different))
	}
	return data
});

const productAccessoriesLoader = () => $axios.get(`products/${toolsService.id(props?.product)}/accessories_groups`).then(res => {
	let data = (res?.data?.data || []).map(convertProductAccessoriesResponse);
	return data
});

const {
	data: productDifferents,
	error: productDifferentsError,
	pending: productDifferentsPending,
	refresh: productDifferentsRefresh,
} = await useLazyAsyncData(`products-${props?.product?.id}-differents`, productDifferentsLoader, {
	watch: [props.mainProduct],
})

const {
	data: productAccessories,
	error: productAccessoriesError,
	pending: productAccessoriesPending,
	refresh: productAccessoriesRefresh,
} = await useLazyAsyncData(`products-${props?.product?.id}-accessories`, productAccessoriesLoader, {
	watch: [props.mainProduct],
})

const currency = useSiteSettings().currency;

const openCartProduct = (product: IProduct) => {
	cartStore.openCartProduct(product)
}

const differentProductClicked = ($product: IProduct) => {
	different.value = $product;
	emit('updated', $product)
	// route.query?.different = $product?.id
	router.push({
		query: {
			...route.query,
			different: $product?.id
		}
	})
}

const accessoryProductClicked = ($group: IProductAccessories, $accessory: IProductAccessoriesGroups) => {
	accessories.value = {
		...accessories.value,
		[$group.id]: $accessory
	}
	if (!$accessory?.id) {
		delete accessories.value[$group.id]
	}
}

onMounted(async () => {
	if (!productDifferents.value) {
		await productDifferentsRefresh()
	}
	if (!productAccessories.value) {
		await productAccessoriesRefresh()
	}
});


watch(
		() => props.product,
		(newStatus, oldStatus) => {
			different.value = newStatus
			accessories.value = [] as IProductAccessoriesGroups[]
			// productDifferentsRefresh()
			// productAccessoriesRefresh()
		}
)

watch(
		() => props.mainProduct,
		(newStatus, oldStatus) => {
			productDifferentsRefresh()
			productAccessoriesRefresh()
		}
)
</script>
