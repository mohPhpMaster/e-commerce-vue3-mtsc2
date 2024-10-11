<template>
  <form
      ref="addressFormRef"
      @submit="onSubmit"
  >
      <div class="row">
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-label">{{ $t('Name') }}</label>
		            <input
                    id="address-label"
                    :placeholder="$t('Name')"
                    class="no-icon"
                    name="label"
                    type="text"
                    v-bind="label"
                >
              </div>
              <err-message :msg="errors.label" />
            </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-default">{{ $t('Default') }}</label>
		            <ui-nice-select
                    ref="niceSelectRef"
                    :default-current="dataUserAddresses?.is_default ? 0 : 1"
                    :options="defaultOptions"
                    name="is_default"
                    v-bind="is_default"
                    @onChange="changeIsDefaultHandler"
                />
                <err-message :msg="errors.is_default" />
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-address">{{ $t('Address') }}</label>
		            <textarea
                    id="address-address"
                    :placeholder="$t('Address')"
                    class="no-icon"
                    v-bind="address"
                ></textarea>
                <err-message :msg="errors.address" />
              </div>
            </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="postal_code-label">{{ $t('Postal code') }}</label>
		            <input
                    id="postal_code-label"
                    :placeholder="$t('Postal code')"
                    class="no-icon"
                    name="postal_code"
                    type="text"
                    v-bind="postal_code"
                >
              </div>
              <err-message :msg="errors.postal_code" />
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-ship_to_location">{{ $t('Shipping Location') }}</label>
		            <textarea
                    id="address-ship_to_location"
                    :placeholder="$t('Shipping Location')"
                    class="no-icon"
                    v-bind="ship_to_location"
                ></textarea>
                <err-message :msg="errors.ship_to_location" />
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-bill_to_location">{{ $t('Billing Location') }}</label>
		            <textarea
                    id="address-bill_to_location"
                    :placeholder="$t('Billing Location')"
                    class="no-icon"
                    v-bind="bill_to_location"
                ></textarea>
                <err-message :msg="errors.bill_to_location" />
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
		            <label for="address-country_id">{{ $t('Country') }}</label>
                <ui-nice-select
                    ref="niceSelectCountryRef"
                    :default-current="dataUserAddresses?.country_id || 0"
                    :options="countryOptions"
                    name="country_id"
                    v-bind="country_id"
                    @onChange="changeCountryIdHandler"
                />
                <err-message :msg="errors.country_id" />
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__input-box">
              <div class="profile__input">
                <div id="map" style="height: 400px; width: 100%;"></div>
                <err-message :msg="errors.lat_long" />
              </div>
            </div>
        </div>

        <div class="col-xxl-12">
            <div class="profile__btn">
              <button class="tp-btn me-1" type="submit">{{ $t(props?.add ? 'Add' : 'Update') }}</button>
              <button class="tp-btn me-1" type="button" @click="onCancel">{{ $t('Cancel') }}</button>
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
import type {IResponse} from "@/types/response-d-t";
import {toast} from "vue3-toastify";
import formDataService from "@/services/formDataService";
import {useForm} from "vee-validate";
import * as yup from "yup";
import type {IUserAddressesFormValues} from "@/types/user-addresses-form-values-d-t";

const props = defineProps<{ add?: boolean }>();

const route = useRoute();
const router = useRouter();
const {t} = useI18n();
const userStore = useUserStore();
const id = computed(() => Number(route?.query?.id || 0) || 0);
const addressFormRef = ref<HTMLElement | HTMLFormElement | null>(null);
const niceSelectRef = ref<HTMLElement | null>(null);
const niceSelectCountryRef = ref<HTMLElement | null>(null);
const loading = ref<boolean>(false);
const defaultYesOption = {text: t('Yes'), value: true};
const defaultNoOption = {text: t('No'), value: false};
const defaultOptions = ref([
  defaultYesOption,
  defaultNoOption
]);
const countryOptions = ref([
  {value: '', text: t('Select Country')},
]);

const {errors, handleSubmit, defineInputBinds, resetForm, setFieldValue} = useForm<IUserAddressesFormValues>({
  validationSchema: yup.object({
    label: yup.string().required().label(t("Label")),
    ship_to_location: yup.string().required().label(t("Shipping Location")),
    bill_to_location: yup.string().required().label(t("Billing Location")),
    country_id: yup.string().optional().label(t("Country")),
    // governorate_id: yup.number().required().label(t("Governorate")),
    // city_id: yup.number().required().label(t("City")),
    // nighbourhood_id: yup.number().required().label(t("Neighbourhood")),
    address: yup.string().required().label(t("Address")),
    postal_code: yup.string().optional().label(t("Postal Code")),
    lat_long: yup.string().required().label(t("Location")),
    is_default: yup.boolean().required().label(t("Default"))
  }),
});

const {data: dataUserAddresses, pending: pendingUserAddresses, error, execute} = useLazyAsyncData(
    props?.add ? 'user-addresses-add' : `user-address-${id}`,
    () => {
      if (props?.add) {
        setFieldValue('label', '');
        setFieldValue('ship_to_location', '');
        setFieldValue('bill_to_location', '');
        setFieldValue('country_id', '');
        setFieldValue('governorate_id', '');
        setFieldValue('city_id', '');
        setFieldValue('nighbourhood_id', '');
        setFieldValue('postal_code', '');
        setFieldValue('address', '');
        setFieldValue('lat_long', '');
        setFieldValue('is_default', false);

        // niceSelectRef.value.current = 0;
        return Promise.resolve({
          label: label.value.value,
          address: address.value.value,
          is_default: (is_default.value.value),
          ...lat_longValue.value,
          // ...lat_long.value.value,
        });
      }

      return api.userAddressesData({id: id.value})
          .then((res: IUserAddresses[]) => {
            res = res[0] || {};
            console.log(180, res)
            // console.log(143, {
            //   label: label.value.value,
            //   address: address.value.value,
            //   is_default: is_default.value.value,
            //   ...lat_longValue.value,
              //// ...lat_long.value.value,
            // }, res);

            return res;
          });
    },
    {
      watch: [route],
      immediate: false,
    }
);

await execute();

const onCancel = () => {
  router.go(-1);
  scrollToTop();
};

const onSubmit = handleSubmit((values: IUserAddressesFormValues) => {
  console.log(214, values)
  if (loading.value) return;
  /*
  {
      "is_default": false,
      "label": "Rerum et debitis ame",
      "address": "Numquam assumenda su",
      "lat_long": "25.16854973557042,45.49976857594911"
  }
   */
  // address.value.label = values.label;
  // address.value.address = values.address;
  // let latLong = values.lat_long.split(',');
  // address.value.lat = Number(latLong[0]);
  // address.value.long = Number(latLong[1]);
  // address.value.is_default = values.is_default;
  let _lat_long = (values?.lat_long || '0,0')?.split(',');
  ["governorate_id", "city_id", "nighbourhood_id"].map((key) => {
    values[key] = !values[key] ? null : values[key];
  });

  console.log(194, {
    ...values,
    lat: Number(_lat_long[0]),
    long: Number(_lat_long[1]),
  })
  loading.value = true;

  $axios
      .post(`addresses` + (id.value ? `/${id.value}` : ''), formDataService({
        ...values,
        is_default: Number(values.is_default ? 1 : 0),
        lat: Number(_lat_long[0]),
        long: Number(_lat_long[1]),
      }))
      .then((response: { data: IResponse }) => {
        if (response?.data?.status === 'success') {
          nextTick(() => toast.success(response?.data?.message || t(props?.add ? 'Address added successfully' : 'Address updated successfully')));
          setTimeout(() => {
            resetForm();
            onCancel();
          }, 500);
        } else {
          toast.error(t('Unexpected error. Please try again later.'));
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else if (error?.message) {
          toast.error(error?.message);
        }

        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false;
        }, 100);
      });
});

const label = defineInputBinds('label');
const is_default = defineInputBinds('is_default');
const ship_to_location = defineInputBinds('ship_to_location');
const bill_to_location = defineInputBinds('bill_to_location');
const country_id = defineInputBinds('country_id');
const governorate_id = defineInputBinds('governorate_id');
const city_id = defineInputBinds('city_id');
const nighbourhood_id = defineInputBinds('nighbourhood_id');
const postal_code = defineInputBinds('postal_code');
const address = defineInputBinds('address');
const lat_long = defineInputBinds('lat_long');
// setFieldValue('lat_long', `0,0`);
// setFieldValue('is_default', dataUserAddresses?.value?.is_default || false);

const changeIsDefaultHandler = (e: { value: string; text: string }, index: number) => {
  // address.value.is_default = e.value;
  setFieldValue('is_default', (e.value));
  // niceSelectRef.value.current = e.value ? defaultYesOption : defaultNoOption;
};
const changeCountryIdHandler = (e: { value: string; text: string }, index: number) => {
  setFieldValue('country_id', e.value);
  // niceSelectCountryRef.value.current = e;
};

const lat_longValue = computed(() => {
  let v = (lat_long.value.value || '0,0')?.split(',');
  return {
    lat: Number(v?.[0]) || 0,
    long: Number(v?.[1]) || 0,
  }
});

const assignValues = (res?: IUserAddresses = undefined) => {
  res = res || {};//dataUserAddresses.value;

  setFieldValue('label', res?.label || '');
  setFieldValue('ship_to_location', res?.ship_to_location || '');
  setFieldValue('bill_to_location', res?.bill_to_location || '');
  setFieldValue('country_id', res?.country_id || '');
  setFieldValue('governorate_id', res?.governorate_id || '');
  setFieldValue('city_id', res?.city_id || '');
  setFieldValue('nighbourhood_id', res?.nighbourhood_id || '');
  setFieldValue('postal_code', res?.postal_code || '');
  setFieldValue('address', res?.address || '');
  setFieldValue('lat_long', (res?.lat || res?.long) ? `${res?.lat || 0},${res?.long || 0}` : '');
  setFieldValue('is_default', res?.is_default || false);

  // niceSelectRef.value.current = defaultNoOption;

  return res;
};

onMounted(() => {
  setTimeout(() => {
    window.initMap = function () {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: lat_longValue.value?.lat || 0, lng: lat_longValue.value?.long || 0},
        zoom: lat_long.value.value ? 17 : 5,
      });

      const marker = new google.maps.Marker({
        position: {lat: lat_longValue.value?.lat || 0, lng: lat_longValue.value?.long || 0},
        map: map,
        title: label.value.value || '',
      });

      map.addListener("click", (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        $axios.get(`https://nominatim.openstreetmap.org/search?q=${newLat},${newLng}&format=json&addressdetails=1`)
            .then(res => {
              let data = res?.data?.[0];
              setFieldValue('address', data?.display_name || address.value.value)
            })
        marker.setPosition({lat: newLat, lng: newLng});
        setFieldValue('lat_long', (newLat || newLng) ? `${newLat || 0},${newLng || 0}` : '');
      });
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig()?.public?.googleMap}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, 1000);

  assignValues(dataUserAddresses.value);
});

</script>