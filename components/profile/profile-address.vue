<template>
	<div v-if="idInUrl">
      <forms-user-address-form />
	</div>
	<div class="profile__ticket table-responsive" v-else>
		<table class="table text-center">
		  <thead>
		      <tr>
		        <th class="text-center" scope="col">{{ $t('Name') }}</th>
		        <th class="text-center" scope="col">{{ $t('Default') }}</th>
		        <th class="text-center" scope="col">{{ $t('Action') }}</th>
		      </tr>
		  </thead>
		  <tbody>
		      <tr v-for="address in data" :key="address.id">
		        <th class="text-center" scope="row">{{ address.label }}</th>
		        <td :data-info="address.is_default ? 'status done' : 'status reply'">{{ $t(address.is_default ? 'Yes' : 'No') }}</td>
		        <td><button
				        @click="$router.push({hash: $route.hash, query: {id: address.id}})"
				        class="tp-logout-btn"
		        >{{ $t('View') }}</button></td>
		      </tr>
		  </tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";

const route = useRoute();
const idInUrl = computed(() => route.query.id !== undefined);

const {data, pending, error, execute} = useLazyAsyncData(
		'user-addresses',
		() => {
			return api.userAddressesData();
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