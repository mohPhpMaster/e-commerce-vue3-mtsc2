<template>
	<div v-if="newAddress">
      <forms-user-address-form add/>
	</div>
	<div v-else-if="idInUrl">
      <forms-user-address-form />
	</div>
	<template v-else>
    <button class="tp-logout-btn mb-3" @click="$router.push({hash: $route.hash, query: {add: 1}})">{{ $t('Add Address') }}</button>
		<div class="profile__ticket table-responsive">
			<table class="table">
			  <thead>
			      <tr>
			        <th class="text-center" scope="col">{{ $t('Name') }}</th>
			        <th class="text-center" scope="col">{{ $t('Default') }}</th>
			        <th class="text-center" scope="col">{{ $t('Actions') }}</th>
				      <!--		        <th class="text-center" scope="col">{{ $t('Remove') }}</th>-->
			      </tr>
			  </thead>
			  <tbody>
			      <tr v-for="address in data" :key="address.id">
			        <td
					        class="text-center" :class="{
			          'bold': address.is_default
			        }"
			        >{{ address.label }}</td>
			        <td class="text-center" :data-info="address.is_default ? 'status done' : 'status reply'">
	                <button
			                v-if="!address?.is_default"
			                class="tp-logout-btn"
			                @click.prevent="handleSetDefaultAddress(address)"
	                >{{ $t('Set Default') }}</button>
				          <span v-else>{{ $t(address.is_default ? 'Yes' : 'No') }}</span>
			        </td>
			        <td class="text-center">
				        <button
						        class="tp-logout-btn me-1"
						        @click.prevent="handleViewAddress(address)"
				        >{{ $t('View') }}</button>
				        <button
						        class="tp-logout-btn me-1"
						        @click.prevent="handleDeleteAddress(address)"
				        >{{ $t('Remove') }}</button>
			        </td>
			      </tr>
			  </tbody>
			</table>
		</div>
	</template>
</template>

<script lang="ts" setup>
import {api} from "@/plugins/api";
import swal from "sweetalert";
import {toast} from "vue3-toastify";
import type {IResponse} from "@/types/response-d-t";

const router = useRouter();
const route = useRoute();
const {t} = useI18n();
const idInUrl = computed(() => route.query.id !== undefined);
const newAddress = computed(() => route.query.add !== undefined);

const {data, pending, error, execute, refresh} = useLazyAsyncData(
		'user-addresses',
		() => {
			return api.userAddressesData();
		}, {
			// watch: [$route],
			immediate: false
		});

await execute();

const handleViewAddress = (address: IUserAddresses) => {
	router.push({hash: route.hash, query: {id: address.id}});
	scrollToTop();
};

const handleDeleteAddress = (address: IUserAddresses) => {
	return swal({
		title: t("Are you sure?"),
		text: t("You won't be able to revert this!"),
		icon: "warning",
		dangerMode: true,
		buttons: [t("Cancel"), t("Remove")],
	})
			.then((result?: boolean) => {
				if (result) {
					return $axios
							.delete(`addresses/${address.id}/delete`, {})
							.then((res: { data: IResponse }) => {
								if (res?.data?.status === 'success') {
									toast.success(res?.data?.message || t('Address removed successfully'));
									execute();
								}

								return res?.data;
							})
							.catch((error) => {
								console.error(73, error);
								if (error?.response?.data?.message) {
									toast.error(error?.response?.data?.message);
								} else if (error?.message) {
									toast.error(error?.message);
								}

								console.error(error);
							})
							.finally(() => {
								setTimeout(() => {
									// loading.value = false;
									scrollToTop();
								}, 100);
							});
				}

				return false;
			});
};

const handleSetDefaultAddress = (address: IUserAddresses) => {
	return swal({
		title: t("Are you sure?"),
		text: t("You won't be able to revert this!"),
		icon: "warning",
		buttons: [t("Cancel"), t("Set Default")],
	})
			.then((result?: boolean) => {
				if (result) {
					return $axios
							.post(`addresses/${address.id}/default`, {}/*, {baseURL: "http://localhost:3000/api"}*/)
							.then((res: { data: IResponse }) => {
								if (res?.data?.status === 'success') {
									toast.success(res?.data?.message || t('Address set as default successfully'));
									execute();
									scrollToTop();
								}

								return res?.data;
							})
							.catch((error) => {
								console.error(115, error);
								if (error?.response?.data?.message) {
									toast.error(error?.response?.data?.message);
								} else if (error?.message) {
									toast.error(error?.message);
								}

								console.error(error);
							})
							.finally(() => {
								setTimeout(() => {
									// 	loading.value = false;
									scrollToTop();
								}, 100);
							});
				}

				return false;
			});
};

onMounted(() => {
	/**
	 * todo
	 */
});

watch(
    () => route.fullPath,
    (n) => {
      if (router.currentRoute.value.fullPath !== '/profile#address') {
        return;
      }

      refresh();
    }
);
</script>