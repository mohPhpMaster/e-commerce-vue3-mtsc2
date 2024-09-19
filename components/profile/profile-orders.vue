<template>
 <div class="profile__ticket table-responsive">
  <table class="table text-center">
    <thead>
        <tr>
          <th scope="col" class="text-center">{{ $t('Order Id') }}</th>
          <th scope="col" class="text-center">{{ $t('Date') }}</th>
          <th scope="col" class="text-center">{{ $t('Total') }}</th>
          <th scope="col" class="text-center">{{ $t('Status') }}</th>
          <th scope="col" class="text-center">{{ $t('Action') }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="order in data" :key="order.id">
          <th scope="row" class="text-center">{{ order.id }}</th>
          <td data-info="title">{{ order.date }}</td>
          <td data-info="title">{{ currency(order.total) }}</td>
          <td :data-info="orderStatusDataInfo?.[order.status] || ''">{{ order.status }}</td>
          <td><a class="tp-logout-btn" :href="toolsService.getOrderUrlByStatus(order)">{{ $t('View') }}</a></td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";
import toolsService from "@/services/toolsService";
import currency from "@/services/currencyService";
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
const {data, pending, error, execute} = useLazyAsyncData(
		'user-orders',
		() => {
			return api.userOrdersData();
		}, {
			// watch: [$route],
			immediate: false
		});

await execute();

onMounted(() => {
	/**
	 * todo
	 */
})
</script>
