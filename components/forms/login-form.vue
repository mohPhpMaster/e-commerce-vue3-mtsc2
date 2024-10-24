<template>
  <form @submit.prevent="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input id="username" :disabled="loading" :placeholder="$t('Username')" type="text" v-bind="username" />
        </div>
        <div class="tp-login-input-title">
          <label for="username">{{ $t('Username') }}</label>
        </div>
        <err-message :msg="errors.username" />
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input id="tp_password" :disabled="loading" :placeholder="$t('Password')" :type="showPass ? 'text' : 'password'" name="password" v-bind="password"/>
          </div>
          <div id="password-show-toggle" class="tp-login-input-eye">
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
    <div class="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
      <div class="tp-login-remeber">
        <input id="remeber" :disabled="loading" name="remeber" type="checkbox" v-bind="remeber" value="1" @change="remeber.checked = !remeber.checked"/>
        <label for="remeber">{{ $t('Remember me') }}</label>
        <err-message :msg="errors.remeber" />
      </div>
      <div class="tp-login-forgot">
        <nuxt-link href="/forgot">{{ $t('Forgot Password?') }}</nuxt-link>
      </div>
    </div>
    <div class="tp-login-bottom">
      <button :disabled="loading" class="tp-login-btn w-100" type="submit">{{ $t('Login') }}</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import {useForm} from "vee-validate";
import * as yup from "yup";
import {useUserStore} from '@/pinia/useUserStore'
import type {IUser} from "@/types/user-d-t";
import {toast} from "vue3-toastify";
import type {IUserLoginFormValues} from "@/types/user-login-form-values-d-t";

const props = defineProps<{ redirect?: string }>()
const userStore = useUserStore()
const $router = useRouter();
const {t} = useI18n()

let showPass = ref<boolean>(false);
const loading = ref<boolean>(false);

const {errors, handleSubmit, defineInputBinds, setFieldValue, resetForm} =
		useForm<IUserLoginFormValues>({
			validationSchema: yup.object({
				remeber: yup.boolean().default(() => false).label(t('Remember me')),
				username: yup.string().required().label(t('Username')),
				password: yup.string().required().min(6).label(t('Password')),
			}),
		});

const onSubmit = handleSubmit((values: IUserLoginFormValues) => {
	if (loading.value) return;

	loading.value = true;
	userStore
			.login({...values, remeber: remeber.value.checked})
			.then((user: Ref<IUser>) => {
				if (user?.value?.token) {
					nextTick(() => toast.success(t('Login successfully')));
					setTimeout(() => {
						resetForm();
						remeber.value.checked = false;
            if ($router.currentRoute.value.query.redirect === 'checkout') {
              $router.push('/checkout');
            } else {
              $router.push(props?.redirect || '/');
            }
					}, 500);
				} else {
					toast.error(t('Invalid username or password'));
				}
			})
			.catch((error) => {
				if (error?.response?.data?.message) {
					toast.error(error?.response?.data?.message);
				} else if (error?.message) {
					toast.error(error?.message);
				}

				console.error(error);
				setTimeout(() => {
					const userInput = document.querySelector('#username');
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

const username = defineInputBinds("username");
const password = defineInputBinds("password");
const remeber = defineInputBinds("remeber");
remeber.value.checked = false;
</script>
