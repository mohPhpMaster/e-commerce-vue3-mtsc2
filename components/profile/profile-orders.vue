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
        <tr v-for="order in dataOrders" :key="order.id">
          <th class="text-center" scope="row">{{ order.id }}</th>
          <td data-info="title">{{ order.date }}</td>
          <td data-info="title">{{ currency(order.total) }}</td>
          <td :data-info="orderStatusDataInfo?.[order.status] || ''">{{ order.status }}</td>
          <td><button class="tp-logout-btn" @click.prevent="handleViewOrder(order)">{{ $t('View') }}</button></td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";

const loading = useLoading();
const router = useRouter();

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
const {data: dataOrders, pending, error, execute: executeOrder} = useLazyAsyncData(
    'user-orders',
    () => {
      return api.userOrdersData();
    }, {
      // watch: [$route],
      immediate: false
    });

await executeOrder();

onMounted(() => {
  /**
   * todo
   */
})

const handleViewOrder = (order) => {
  router.push(toolsService.getOrderUrl(order))
      .finally(() => {
        loading.stop();
      });
}

</script>
