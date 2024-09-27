<template>
  <div class="tp-product-details-tab-nav tp-tab">
    <nav>
      <div class="nav nav-tabs justify-content-center p-relative tp-product-tab" id="navPresentationTab" role="tablist">
        <button @click="handleActiveMarker($event)" class="nav-link" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true">{{ $t("Description") }}</button>

        <button @click="handleActiveMarker($event)" class="nav-link active" id="nav-addInfo-tab" data-bs-toggle="tab" data-bs-target="#nav-addInfo" type="button" role="tab" aria-controls="nav-addInfo" aria-selected="false">{{ $t("Additional information") }}</button>

        <button @click="handleActiveMarker($event)" class="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">{{ $t("Reviews (:count)", reviews?.length || 0) }}</button>
        <span id="productTabMarker" class="tp-product-details-tab-line"></span>
      </div>
    </nav>
    <div class="tab-content" id="navPresentationTabContent">
      <div class="tab-pane fade" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" tabindex="0">
          <div class="tp-product-details-desc-wrapper pt-80">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                  <div class="tp-product-details-desc-item pb-105">
                      <div class="row">
                        <div class="col-lg-12">
                            <div class="tp-product-details-desc-content pt-25">
                              <span>{{ toolsService.parseCategoryName(product?.parentCategory) }}</span>
                              <h3 class="tp-product-details-desc-title">{{ toolsService.parseProductName(product, true) }}</h3>
		                          <p v-html="product_description"></p>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div class="tab-pane fade show active" id="nav-addInfo" role="tabpanel" aria-labelledby="nav-addInfo-tab" tabindex="0">
          <div class="tp-product-details-additional-info ">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                  <table>
                      <tbody>
                        <tr v-for="(info,i) in productAddionals" :key="i">
                            <td>{{info.key}}</td>
                            <td>{{info.value}}</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
            </div>
          </div>
      </div>
      <div class="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab" tabindex="0">
          <div class="tp-product-details-review-wrapper pt-60">
            <div class="row">
                <div :class="{
									'col-lg-6': isLoggedIn(),
									'col-lg-12': !isLoggedIn()
                }">
                  <div class="tp-product-details-review-statics">
                      <!-- number -->
                      <div class="tp-product-details-review-number d-inline-block mb-50">
                        <h3 class="tp-product-details-review-number-title">{{ $t('Customer reviews') }}</h3>
                        <div class="tp-product-details-review-summery d-flex align-items-center">
                            <div class="tp-product-details-review-summery-value">
                              <span>{{ product?.rating }}</span>
                            </div>
                            <div class="tp-product-details-review-summery-rating d-flex align-items-center">
										          <product-rating :product="product" />
                              <p>{{ $t(':count Reviews', { count: reviews?.length || 0 }) }}</p>
                            </div>
                        </div>
                        <div class="tp-product-details-review-rating-list">
                            <!-- rating item -->
                            <product-details-rating-item :star="5" width="82" />
                            <product-details-rating-item :star="4" width="30" />
                            <product-details-rating-item :star="3" width="15" />
                            <product-details-rating-item :star="2" width="6" />
                            <product-details-rating-item :star="1" width="10" />
                            <!-- end rating item -->
                        </div>
                      </div>

                      <!-- reviews -->
                      <div class="tp-product-details-review-list pr-110">
                        <h3 class="tp-product-details-review-title">{{ $t('Rating & Review') }}</h3>
                        <div v-if="reviews?.length > 0">
                          <div v-for="(item,i) in reviews" :key="i" class="tp-product-details-review-avater d-flex align-items-start">
                              <div class="tp-product-details-review-avater-thumb">
                                <a href="#">
                                    <img :src="toolsService.parseImageUrl(item?.photo)" alt="user profile image">
                                </a>
                              </div>
                              <div class="tp-product-details-review-avater-content">
                                <div class="tp-product-details-review-avater-rating d-flex align-items-center">
                                    <product-rating :product="item" />
                                </div>
                                <h3 class="tp-product-details-review-avater-title">{{ item.user }}</h3>
                                <span class="tp-product-details-review-avater-meta">{{ item.date }} </span>

                                <div class="tp-product-details-review-avater-comment">
                                    <p>{{ item.comment || '-' }}</p>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div v-else>
                          <h5>{{ $t('No Reviews Found') }}</h5>
                        </div>
                      </div>
                  </div>
                </div> <!-- end col -->
                <div v-if="isLoggedIn()" class="col-lg-6">
                  <div class="tp-product-details-review-form">
                      <h3 class="tp-product-details-review-form-title">{{ $t('Review this product') }}</h3>
                      <p>{{ $t('All fields are Required') }}</p>
                     <!-- form start -->
                     <forms-review-form :product="product" @added="reviews.push($event)" />
                     <!-- form end -->
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProduct } from '@/types/product-d-t';
import toolsService from "@/services/toolsService";
import {useUserStore} from "@/pinia/useUserStore";
import {api} from "@/plugins/api";
import type {IReview} from "@/types/review-d-t";
import {$axios} from "@/plugins/00.axiosInstance";
import {convertProductAccessoriesResponse} from "@/plugins/data/product-accessories-groups-data";
import type {IProductAddionalsResponse} from "@/types/product-addionals-response-d-t";
import {convertProductAddionalResponse} from "@/plugins/data/product-addionals-data";
import type {IProductAddionals} from "@/types/product-addionals-d-t";

const {isLoggedIn, user} = useUserStore();
const props = defineProps<{product:IProduct; mainProduct?:IProduct}>();
const route = useRoute();

const _data = ref<{ [key: string]: IReview[] }>([]);
// const reviews = ref<IReview[]>([]);
const product_description = computed(() => toolsService.normalizeLineEndingsToHtml(props.product?.description));
const pId = computed(() => props.mainProduct?.id || props.product.id);

const loadData = ()=> {
	if (_data.value?.[pId.value])
	{
		return _data.value[pId.value];
	}

	return api.productReviewsData({
		product: props?.product,
	})
			.then(data => {
				// reviews.value = data;
				_data.value[pId.value] = reviews;

				return data;
			});
}

const {
	data: reviews,
	error: reviewsError,
	pending: reviewsPending,
	refresh: reviewsRefresh,
} = useLazyAsyncData(
		`products-${pId.value}-reviews`,
		loadData,
		{
			watch: [pId],
		}
)

const {
	data: productAddionals,
	pending: pendingAddionals,
	error: errorAddionals,
	refresh: refreshAddionals,
	execute: executeAddionals
} = useLazyAsyncData(
		`product_${props?.product?.id}_addionals`,
		() => {
			return api.productAddionalsData({
				slug: props?.product?.sku,
				plain: true
			})
		},
		{
			watch: [route],
			immediate: false
		}
);
await executeAddionals();

onMounted(() => {
  const nav_active = document.getElementById("nav-addInfo-tab");
  const marker = document.getElementById("productTabMarker");
  if (nav_active?.classList.contains("active") && marker) {
    marker.style.left = nav_active.offsetLeft + "px";
    marker.style.width = nav_active.offsetWidth + "px";
  }
	// loadData();
	// todo: handle additional info
});

const handleActiveMarker = (event: MouseEvent) => {
	const marker = document.getElementById("productTabMarker");
	if (marker && event.target) {
		marker.style.left = (event.target as HTMLButtonElement).offsetLeft + "px";
		marker.style.width = (event.target as HTMLButtonElement).offsetWidth + "px";
	}
};

watch(
		() => pId,
		(newStatus, oldStatus) => {
			reviewsRefresh();
			const nav_active = document.getElementById("nav-addInfo-tab");
			const marker = document.getElementById("productTabMarker");
			if (nav_active?.classList.contains("active") && marker) {
				marker.style.left = nav_active.offsetLeft + "px";
				marker.style.width = nav_active.offsetWidth + "px";
			}

		}
);

</script>
