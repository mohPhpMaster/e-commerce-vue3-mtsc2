<template>
 <section class="tp-login-area pb-140 p-relative z-index-1 fix">
    <div class="tp-login-shape">
        <img alt="shape" class="tp-login-shape-1" src="/images/login/login-shape-1.png">
        <img alt="shape" class="tp-login-shape-2" src="/images/login/login-shape-2.png">
        <img alt="shape" class="tp-login-shape-3" src="/images/login/login-shape-3.png">
        <img alt="shape" class="tp-login-shape-4" src="/images/login/login-shape-4.png">
    </div>
    <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8">
              <div class="tp-login-wrapper">
                <div class="tp-login-top text-center mb-30">
                    <h3 class="tp-login-title">{{ $t('Reset Password') }}</h3>
                    <p>{{ $t('Enter your username to request password reset.') }}</p>
                </div>
                <div class="tp-login-option">
                    <form @submit="onSubmit">
                      <div class="tp-login-input-wrapper">
                        <div class="tp-login-input-box">
                            <div class="tp-login-input">
                              <input id="username" :placeholder="$t('Username')" type="text" v-bind="username">
                            </div>
                            <div class="tp-login-input-title">
                              <label for="username">{{ $t('Username') }}</label>
                            </div>
                            <err-message :msg="errors.username" />
                        </div>
                      </div>
                      <div class="tp-login-bottom mb-15">
                        <button class="tp-login-btn w-100" type="submit">{{ $t('Submit') }}</button>
                      </div>
                      <div class="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                        <div class="tp-login-forgot">
                            <span>{{ $t("Click here to login") }} <nuxt-link href="/login"> {{ $t("Login") }}</nuxt-link></span>
                        </div>
                      </div>
                    </form>
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {useForm} from "vee-validate";
import * as yup from "yup";
import {toast} from "vue3-toastify";
import formDataService from "@/services/formDataService";
import toolsService from "@/services/toolsService";

const $router = useRouter();
const {t} = useI18n()

interface IFormValues {
  username?: string | null;
}

const loading = ref<boolean>(false);
const {errors, handleSubmit, defineInputBinds, resetForm} =
    useForm<IFormValues>({
      validationSchema: yup.object({
        username: yup.string().required().label(t("Username")),
      }),
    });

const onSubmit = handleSubmit((values) => {
  if (loading.value) return;

  loading.value = true;
  values.site = toolsService.getBaseUrl();
  $axios
      .post('forgot', formDataService(values))
      .then((response) => {
        nextTick(() => {
          toast.success(response?.data?.message);
          resetForm();

          setTimeout(() => {
            $router.push('/');
          }, 1000);
        });
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

const username = defineInputBinds("username");
</script>
