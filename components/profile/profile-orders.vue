<template>
 <div class="profile__ticket table-responsive">
  <table class="table text-center">
    <thead>
        <tr>
          <th class="text-center" scope="col">{{ $t('Order Id') }}</th>
          <th class="text-center" scope="col">{{ $t('Date') }}</th>
          <th class="text-center" scope="col">{{ $t('Total') }}</th>
          <th class="text-center" scope="col">{{ $t('Status') }}</th>
          <th class="text-center" scope="col">{{ $t('Actions') }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="order in data" :key="order.id">
          <th class="text-center" scope="row">{{ order.id }}</th>
          <td data-info="title">{{ order.date }}</td>
          <td data-info="title">{{ currency(order.total) }}</td>
          <td :data-info="orderStatusDataInfo?.[order.status] || ''">{{ order.status }}</td>
          <td><button class="tp-logout-btn" @click.prevent="handleViewOrder(order)">{{ $t('View') }}</button></td>
        </tr>
    </tbody>
    <tfoot>
    <tr>
      <td colspan="5">
        <div class="text-center">
          <button
              :disabled="pending"
              aria-selected="false"
              class="tp-logout-btn w-100"
              role="button"
              type="button"
              @click="handleViewMore"
          >{{ $t('See more') }}</button>
        </div>
      </td>
    </tr>
    </tfoot>
  </table>
</div>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";

const loading = useLoading();
const router = useRouter();
const route = useRoute();
const page = ref(1);
const data = ref([]);

/*
status done done
status pending pending
status reply canceled
status hold new
*/
const orderStatusDataInfo = {
  pending: 'status pending',
  done: 'status done',
  canceled: 'status reply',
  new: 'status hold',
}
const {data: dataOrders, pending, error, execute: executeOrder, refresh: refreshOrder} = useLazyAsyncData(
    'user-orders',
    () => {
      return api.userOrdersData({page: page.value})
          .then(d => {
            if (!d.length) {
              page.value--;
            }
            data.value = [...data.value, ...d];

            return d;
          });
    }, {
      // watch: [route],
      immediate: false
    });

onMounted(() => {
  executeOrder();
})

const handleViewOrder = (order) => {
  router
      .push(toolsService.getOrderUrl(order))
      .finally(() => {
        loading.stop();
      });
}

const handleViewMore = async () => {
  page.value++;
  await executeOrder();
}

watch(
    () => route.fullPath,
    (n) => {
      if (router.currentRoute.value.fullPath !== '/profile#order')
      {
        return;
      }

      page.value = 1;
      data.value = [];
      refreshOrder();
    }
);
</script>
