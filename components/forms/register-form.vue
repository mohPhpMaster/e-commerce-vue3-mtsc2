<template>
  <form @submit.prevent="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input :disabled="loading" id="name" type="text" :placeholder="$t('Name')" v-bind="name" />
        </div>
        <div class="tp-login-input-title">
          <label for="name">{{ $t('Name') }}</label>
        </div>
        <err-message :msg="errors.name" />
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input :disabled="loading" id="username" type="text" :placeholder="$t('Username')" v-bind="username" />
        </div>
        <div class="tp-login-input-title">
          <label for="username">{{ $t('Username') }}</label>
        </div>
        <err-message :msg="errors.username" />
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input :disabled="loading" id="email" type="email" :placeholder="$t('Email')" v-bind="email" />
        </div>
        <div class="tp-login-input-title">
          <label for="email">{{ $t('Email') }}</label>
        </div>
        <err-message :msg="errors.email" />
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
          <input :disabled="loading" id="tp_password" :type="showPass?'text':'password'" name="password" :placeholder="$t('Password')" v-bind="password"/>
        </div>
        <div class="tp-login-input-eye" id="password-show-toggle">
          <span class="open-eye d-inline-block" @click="togglePasswordVisibility">
            <template v-if="showPass">
              <svg-open-eye />
            </template>
            <template v-else>
              <svg-close-eye />
            </template>
          </span>
        </div>
        <div class="tp-login-input-title">
          <label for="tp_password">{{ $t('Password') }}</label>
        </div>
      </div>
      <err-message :msg="errors.password" />
      </div>
    </div>
    <div class="tp-login-bottom">
      <button :disabled="loading" type="submit" class="tp-login-btn w-100">{{ $t('Sign up') }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useUserStore} from "@/pinia/useUserStore";
import type {IUserRegisterResponse} from "@/types/user-register-response-d-t";
import {toast} from "vue3-toastify";
import {$axios} from "@/plugins/00.axiosInstance";
import formDataService from "@/services/formDataService";
import type {IUserRegisterFormValues} from "@/types/user-register-form-values-d-t";

const userStore = useUserStore()
const $router = useRouter();
const {t} = useI18n()

const showPass = ref<boolean>(false);
const loading = ref<boolean>(false);

const { errors, handleSubmit, defineInputBinds,resetForm } = useForm<IUserRegisterFormValues>({
  validationSchema: yup.object({
    name: yup.string().required().label(t('Name')),
	  username: yup.string().required().label(t('Username')),
    email: yup.string().required().email().label(t('Email')),
    password: yup.string().required().min(6).label(t('Password'))
  }),
});

const onSubmit = handleSubmit(values => {
	if (loading.value) return;

	loading.value = true;
	$axios
			.post("register", formDataService(values))
			.then((response: { data: { data: IUserRegisterResponse, message?: string } }) => {
				const user = response?.data?.data || {};
				if (user?.token) {
					userStore.setUser(user);
					nextTick(() => toast.success(response?.data?.message || t('Register successfully')));

					setTimeout(() => {
						resetForm();
						$router.push('/');
					}, 500);
				} else {
					toast.error(response?.data?.message || t('Register failed'));
				}

				return user;
			})
			.catch((error) => {
				if (error?.response?.data?.message) {
					toast.error(error?.response?.data?.message);
				} else if (error?.message) {
					toast.error(error?.message);
				}

				console.error(error);
				setTimeout(() => {
					const userInput = document.querySelector('#name');
					userInput?.focus();
					userInput?.select();
				}, 500);
			})
			.finally(() => {
				setTimeout(() => {
					loading.value = false;
				}, 100);
			});
});

const togglePasswordVisibility = () => {
	if (!loading.value) {
		showPass.value = !showPass.value;
	}
};

const name = defineInputBinds('name');
const username = defineInputBinds('username');
const email = defineInputBinds('email');
const password = defineInputBinds('password');
</script>
