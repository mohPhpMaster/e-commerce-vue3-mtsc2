<template>
  <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-label">{{ $t('Name') }}</label>
		            <input id="address-label" v-model="address.label" :placeholder="$t('Name')" class="no-icon" type="text">
              </div>
            </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-default">{{ $t('Default') }}</label>
		            <ui-nice-select
				            ref="niceSelectRef"
				            :options="[
		                    { text: $t('Yes'), value: true },
		                    { text: $t('No'), value: false }
		                  ]"
				            name="is_default"
				            :default-current="address.is_default ? 0 : 1"
				            @onChange="changeHandler"
				            v-model="address.is_default"
		            />
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-address">{{ $t('Address') }}</label>
		            <textarea
				            id="address-address"
				            v-model="address.address"
				            :placeholder="$t('Address')"
				            class="no-icon"
		            ></textarea>
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
                <div id="map" style="height: 400px; width: 100%;"></div>
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__btn">
              <button class="tp-btn" type="submit">{{ $t('Update') }}</button>
            </div>
        </div>
      </div>
  </form>
</template>

<script lang="ts" setup>
import {useUserStore} from "@/pinia/useUserStore";
import {useRoute} from "vue-router";
import {api} from "@/plugins/api";
import type {IUserAddresses} from "@/types/user-addresses-d-t";
import {$axios} from "@/plugins/00.axiosInstance";

const route = useRoute();
const router = useRouter();
const {t} = useI18n();
const userStore = useUserStore();
const id = computed(() => Number(route.query.id));
const address = ref<IUserAddresses>();
const niceSelectRef = ref<HTMLElement | null>(null);

onMounted(() => {
	setTimeout(() => {
		window.initMap = function () {
			const map = new google.maps.Map(document.getElementById("map"), {
				center: {lat: address.value?.lat || 0, lng: address.value?.long || 0},
				zoom: 17,
			});

			const marker = new google.maps.Marker({
				position: {lat: address.value?.lat || 0, lng: address.value?.long || 0},
				map: map,
				title: address.value?.label || '',
			});

			map.addListener("click", (e) => {
				const newLat = e.latLng.lat();
				const newLng = e.latLng.lng();
				$axios.get(`https://nominatim.openstreetmap.org/search?q=${newLat},${newLng}&format=json`)
						.then(res => {
							address.value.address = res?.data?.[0]?.display_name || address.value.label;
						})

				marker.setPosition({lat: newLat, lng: newLng});
				address.value.lat = newLat;
				address.value.long = newLng;
			});
		};

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig()?.public?.googleMap}&callback=initMap`;
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
	}, 1000);
});

const onSubmit = () => {
	console.log(address.value);
	router.go(-1);

	return false;
};

const changeHandler = (e: { value: string; text: string }, index: number) => {
	address.value.is_default = e.value;
};

const {data, pending, error, execute} = useLazyAsyncData(
		`user-address-${id}`,
		() => {
			return api.userAddressesData({id: id.value})
					.then((res: IUserAddresses[]) => {
						res = res[0] || {};
						address.value = res;
						console.log(143, res);

						return res;
					});
		},
		{
			// watch: [$route],
			immediate: false,
		}
);

await execute();

</script>