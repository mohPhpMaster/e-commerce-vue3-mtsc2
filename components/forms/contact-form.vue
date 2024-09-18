<template>
  <form id="contact-form" @submit.prevent="onSubmit">
      <div class="tp-contact-input-wrapper">
        <div class="tp-contact-input-box">
            <div class="tp-contact-input">
              <input name="name" id="name" type="text" :placeholder="$t('Name')" v-bind="name">
            </div>
            <div class="tp-contact-input-title">
              <label for="name">{{ $t('Name') }}</label>
            </div>
            <err-message :msg="errors.name" />
        </div>
        <div class="tp-contact-input-box">
            <div class="tp-contact-input">
              <input name="email" id="email" type="email" :placeholder="$t('Email')" v-bind="email">
            </div>
            <div class="tp-contact-input-title">
              <label for="email">{{ $t('Email') }}</label>
            </div>
            <err-message :msg="errors.email" />
        </div>
        <div class="tp-contact-input-box">
            <div class="tp-contact-input">
              <input name="subject" id="subject" type="text" :placeholder="$t('Subject')" v-bind="subject">
            </div>
            <div class="tp-contact-input-title">
              <label for="subject">{{ $t('Subject') }}</label>
            </div>
            <err-message :msg="errors.subject" />
        </div>
        <div class="tp-contact-input-box">
            <div class="tp-contact-input">
              <Field name="message" v-slot="{ field }">
                <textarea v-bind="field" id="message" name="message" :placeholder="$t('Write your message here...')"></textarea>
              </Field>
            </div>
            <div class="tp-contact-input-title">
              <label for="message">{{ $t('Message') }}</label>
            </div>
            <err-message :msg="errors.message" />
        </div>
      </div>
      <div class="tp-contact-btn">
        <button type="submit">{{ $t('Send Message') }}</button>
      </div>
  </form>
</template>

<script setup lang="ts"> 
import { useForm,Field } from 'vee-validate';
import * as yup from 'yup';
import type {IContactUsFormValues} from "@/types/contact-us-form-values-d-t";
import {toast} from "vue3-toastify";
import {api} from "@/plugins/api";
import type {IResponse} from "@/types/response-d-t";

const {t} = useI18n();
const $router = useRouter();
const loading = ref<boolean>(false);

const { errors, handleSubmit, defineInputBinds,resetForm } = useForm<IContactUsFormValues>({
  validationSchema: yup.object({
    name: yup.string().required().label(t("Name")),
    email: yup.string().required().email().label(t("Email")),
    subject: yup.string().required().label(t("Subject")),
    message: yup.string().required().label(t("Message"))
  }),
});

const onSubmit = handleSubmit((values: IContactUsFormValues) => {
	if (loading.value) return;

	loading.value = true;
	api
			.contactUsData(values)
			.then((response: IResponse) => {
				if (response?.data?.message) {
					nextTick(() => toast.success(response?.data?.message));
					setTimeout(() => {
						resetForm()
						$router.push('/');
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

const name = defineInputBinds('name');
const email = defineInputBinds('email');
const subject = defineInputBinds('subject');
const message = defineInputBinds('message');
</script>
