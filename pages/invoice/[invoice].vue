<template>
  <div>
    <!-- invoice start -->
    <section class="invoice__area pt-120 pb-120">
      <div class="container">
        <div class="invoice__msg-wrapper">
          <div class="row">
            <div class="col-xl-12">
              <div class="invoice_msg mb-40">
                <p class="text-black alert alert-success">{{ $t('Thank you Your order is :status !', {status: invoiceData?.status}) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="invoice__wrapper grey-bg-2 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper">
          <div class="invoice__header-wrapper border-2 border-bottom border-white mb-40">
            <div class="row">
              <div class="col-xl-12">
                <div class="invoice__header pb-20">
                  <div class="row align-items-end">
                    <div class="col-md-4 col-sm-6">
                      <div class="invoice__left">
                        <img :src="$settings?.logo" alt="logo" class="mb-15 site-logo">
                        <p v-if="$settings?.siteTitle" v-html="$settings?.siteTitle" />
                        <p v-if="$settings?.address" v-html="$settings?.address" />
                      </div>
                    </div>
                    <div class="col-md-8 col-sm-6">
                      <div class="invoice__right mt-15 mt-sm-0 text-sm-end">
                        <h3 class="text-uppercase font-70 mb-20">{{ $t('Invoice Details') }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="invoice__customer mb-30">
            <div class="row">
              <div class="col-md-6 col-sm-8">
                <div class="invoice__customer-details">
                  <h4 class="mb-10 text-uppercase">#{{ invoiceData?.id || invoice  }}</h4>
                  <!--                  <p class="mb-0 text-uppercase">United State</p>-->
                  <!--                  <p class="mb-0 text-uppercase">Washington DC</p>-->
                  <!--                  <p class="mb-0">123456789</p>-->
                </div>
              </div>
              <div class="col-md-6 col-sm-4">
                <div class="invoice__details mt-md-0 mt-20 text-md-end">
                  <p class="mb-0">
                    <strong>{{ $t('Invoice ID:') }}</strong> {{ invoiceData?.id || invoice }}
                  </p>
                  <p class="mb-0">
                    <strong>{{ $t('Date:') }}</strong> {{ invoiceData?.date }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white mb-30">
            <table class="table">
              <thead class="table-light">
                <tr>
<!--                  <th scope="col">{{ $t("#") }}</th>-->
                  <th scope="col">{{ $t("Product") }}</th>
                  <th scope="col">{{ $t("Quantity") }}</th>
                  <th scope="col">{{ $t("Price") }}</th>
                  <th scope="col">{{ $t("Total") }}</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="item in invoiceData?.items" :key="item.name">
<!--                  <td scope="row" >{{ item.id }}</td>-->
                  <td scope="row">{{ item.name || (item.differents)?.name }}</td>
                  <td scope="row">{{ item.quantity }}</td>
                  <td>{{ currency(item.price) }}</td>
                  <td>{{ currency(item.price * item.quantity) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
            <div class="row">
              <div class="col-lg-3 col-md-4">
                <div class="invoice__payment-method mb-30">
                  <h5 class="mb-0">{{ $t('Payment Method') }}</h5>
                  <p class="tp-font-medium text-uppercase">{{ $t('Stripe') }}</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="invoice__shippint-cost mb-30">
                  <h5 class="mb-0">{{ $t('Shipping Cost') }}</h5>
                  <p class="tp-font-medium">{{ currency(invoiceData?.fee?.value || 0) }}</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="invoice__total-ammount mb-30">
                  <h5 class="mb-0">{{ $t('Subtotal') }}</h5>
                  <p class="tp-font-medium">
                    <strong>{{ currency(invoiceData?.subtotal) }}</strong>
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="invoice__total-ammount mb-30">
                  <h5 class="mb-0">{{ $t('Total') }}</h5>
                  <p class="tp-font-medium text-danger">
                    <strong>{{ currency(invoiceData?.total) }}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="invoice__print text-end mt-3">
          <div class="row">
            <div class="col-xl-12">
              <button class="tp-invoice-print tp-btn tp-btn-black" type="button" @click="handleBackButton" >
                <span class="mr-5">
                  <i class="fa-regular fa-turn-up"></i>
                </span> {{ $t('Back') }} </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- invoice end -->
  </div>
</template>

<script lang="ts" setup>
import type {IUserOrder} from "@/types/user-order-d-t";
import {useCartStore} from "@/pinia/useCartStore";
import currency from "@/services/currencyService";
import {useProductStore} from "@/pinia/useProductStore";
import {api} from "@/plugins/api";
import {convertUserOrdersResponse} from "@/plugins/data/user-orders-data";

useSeoMeta({title: "Invoice Details"});

const props = defineProps<{
  invoice?: number | IUserOrder,
}>()

// const shippingStore = useShipping();
const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const propInvoice = computed(() => (router.currentRoute.value?.params?.invoice));
const {title} = useSiteSettings();
const {$settings} = useNuxtApp();
const {noImageUrl, updateSlugOnLocale} = $settings;
const {t} = useI18n();

function getInvoiceTitle(o = null) {
  o = o || invoice?.value;

  return o && o?.id ? t('Invoice :id Details', {id: o?.id}) : t('Invoice Details')
}

function setTitle(p) {
  if (p && Object.keys(p).length) {
    nextTick(function () {
      useSeoMeta({
        title: title(getInvoiceTitle(p), route.query?.page),
        // todo:
        // description: p?.seo_description,
        // keywords: p?.seo_keywords
      });
    });
  }
}

const {data: invoiceData, pending: pendingInvoice, error, refresh, execute: executeInvoice} = useLazyAsyncData(
    `invoice_${propInvoice?.value}`,
    () => {
      if (invoiceData.value && invoiceData.value?.id && propInvoice.value != invoiceData.value?.id) {
        return {};
      }

      return api.userOrdersData({id: propInvoice?.value, plain: true})
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

await executeInvoice();

if (invoiceData.value && invoiceData.value?.id) {
  setTitle(invoiceData.value)
}

if (
    (error?.value && error?.value?.message === 'EMPTY')
    // || !(invoiceData?.value && invoiceData?.value?.id)
) {
  showError({
    statusCode: 404,
    statusMessage: t('Invoice not found'),
    data: 'EMPTY',
    error: error?.value || new Error('EMPTY'),
    url: route.href,
    fatal: true
  });
}

const handleBackButton = () => {
  window?.close();
}

onMounted(() => {

})

watch(
    () => router.currentRoute.value?.params,
    (n) => {
      if (invoiceData.value && invoiceData.value?.id && propInvoice.value !== invoiceData.value?.id) {
        invoiceData.value = undefined;
        // refresh();
      }
    }
);
</script>

<style lang="scss" scoped>
.site-logo {
  height: 72px;
}
</style>