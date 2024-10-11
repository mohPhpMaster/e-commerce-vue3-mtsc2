<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb v-if="!pendingOrder" :subtitle="getOrderTitle()" :title="getOrderTitle()" />
    <!-- breadcrumb end -->

    <!-- order area start -->
      <order-area v-if="!pendingOrder" :order="order" />
    <!-- order area end -->
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "@/pinia/useProductStore";
import {api} from "@/plugins/api";
import {convertUserOrdersResponse} from "@/plugins/data/user-orders-data";
import type {IUserOrder} from "@/types/user-order-d-t";

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const propOrder = computed(() => (router.currentRoute.value?.params?.order));
const {title} = useSiteSettings();
const {$settings} = useNuxtApp();
const {noImageUrl, updateSlugOnLocale} = $settings;
const {t} = useI18n();

useSeoMeta({title: title(t("Order Details"))});

function getOrderTitle(o = null) {
  o = o || order?.value;

  return o && o?.id ? t('Order :id Details', {id: o?.id}) : t('Order Details')
}

function setTitle(p) {
  if (p && Object.keys(p).length) {
    nextTick(function () {
      useSeoMeta({
        title: title(getOrderTitle(p), route.query?.page),
        // todo:
        // description: p?.seo_description,
        // keywords: p?.seo_keywords
      });
    });
  }
}

const {data: order, pending: pendingOrder, error, refresh, execute: executeOrder} = useLazyAsyncData(
    `order_${propOrder?.value}`,
    () => {
      if (order.value && order.value?.id && propOrder.value != order.value?.id) {
        return {};
      }

      return api.userOrdersData({id: propOrder?.value, plain: true})
          .then((data: IOrderResponse[]) => {
            data = (data && Array.isArray(data) ? data : [data]).map(x => convertUserOrdersResponse(x));

            if (!data || data.length === 0) {
              return [[]];
            }

            return data;
          })
          .then(data => data?.[0])
          .then((data: IUserOrder) => {
            if (process.client) {
              setTitle(data)
            }

            return data;
          })
          .catch(e => {
            if (e?.response?.status === 404) {
              return [];
            }

            throw e;
          });
    },
    {
      initialData: () => [],
      watch: [route],
      immediate: false
    }
);

await executeOrder();

if (order.value && order.value?.id) {
  setTitle(order.value)
}

if (
    (error?.value && error?.value?.message === 'EMPTY')
    // || !(order?.value && order?.value?.id)
) {
  showError({
    statusCode: 404,
    statusMessage: useI18n().t('Order not found'),
    data: 'EMPTY',
    error: error?.value || new Error('EMPTY'),
    url: route.href,
    fatal: true
  });
}

watch(
    () => router.currentRoute.value?.params,
    (n) => {
      if (order.value && order.value?.id && propOrder.value !== order.value?.id) {
        order.value = undefined;
        // refresh();
      }
    }
);

</script>
