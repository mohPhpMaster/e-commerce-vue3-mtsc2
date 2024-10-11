<template>
  <div class="profile__password">
      <form @submit.prevent="onSubmit">
        <div class="row">
            <div class="col-xxl-12">
              <div class="tp-profile-input-box">
                  <div class="tp-contact-input">
                    <input id="password" name="password" type="password" v-bind="password">
                  </div>
                  <div class="tp-profile-input-title">
                    <label for="password">{{ $t('Old Password') }}</label>
                  </div>
					        <err-message :msg="errors.password" />
              </div>
            </div>
            <div class="col-xxl-6 col-md-6">
              <div class="tp-profile-input-box">
                  <div class="tp-profile-input">
                    <input id="new_password" name="new_password" type="password" v-bind="new_password">
                  </div>
                  <div class="tp-profile-input-title">
                    <label for="new_password">{{ $t('New Password') }}</label>
                  </div>
					        <err-message :msg="errors.new_password" />
              </div>
            </div>
            <div class="col-xxl-6 col-md-6">
              <div class="tp-profile-input-box">
                  <div class="tp-profile-input">
                    <input
		                    id="new_password_confirmation"
		                    name="new_password_confirmation"
		                    type="password"
		                    v-bind="new_password_confirmation"
                    >
                  </div>
                  <div class="tp-profile-input-title">
                    <label for="new_password_confirmation">{{ $t('Confirm New Password') }}</label>
                  </div>
					        <err-message :msg="errors.new_password_confirmation" />
              </div>
            </div>
            <div class="col-xxl-6 col-md-6">
              <div class="profile__btn">
                  <button class="tp-btn" type="submit">{{ $t('Update') }}</button>
              </div>
            </div>
        </div>
      </form>
  </div>
</template>

<script lang="ts" setup>
import formDataService from "@/services/formDataService";
import {toast} from "vue3-toastify";
import {useForm} from "vee-validate";
import * as yup from "yup";
import type {IUserChangePasswordFormValues} from "@/types/user-change-password-form-values-d-t";
import type {IResponse} from "@/types/response-d-t";

const $router = useRouter();
const {t} = useI18n()

const loading = ref<boolean>(false);

const {errors, handleSubmit, defineInputBinds, resetForm} = useForm<IUserChangePasswordFormValues>({
	validationSchema: yup.object({
		password: yup.string().required().min(6).label(t('Password')),
		new_password: yup.string().required().min(6).label(t('New Password')),
		new_password_confirmation: yup.string().required().min(6).oneOf([yup.ref('new_password')], t('Passwords must match')).label(t('Confirm New Password'))
	}),
});


const onSubmit = handleSubmit(values => {
	if (loading.value) return;

	loading.value = true;
	$axios
			.post("change-password", formDataService(values)/*, {baseURL: "http://localhost:3000/api"}*/)
			.then((response: { data: IResponse }) => {
				const {status, message} = response?.data;
				if (!status || status == "success") {
					nextTick(() => toast.success(message || t('Password changed successfully')));

					setTimeout(() => {
						resetForm();
						$router.push('/profile');
					}, 500);
				} else {
					toast.error(message || t('Change password failed'));
				}

				return response;
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


const password = defineInputBinds('password');
const new_password = defineInputBinds('new_password');
const new_password_confirmation = defineInputBinds('new_password_confirmation');
</script>
