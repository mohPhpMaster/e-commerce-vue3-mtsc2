<template>
  <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-xxl-5 col-md-5" />
        <div class="col-xxl-7 col-md-7">
          <div class="tp-profile-input-box">
            <div class="tp-contact-input">
							<profile-user-avatar editable @updated="changePhotoHandler" />
            </div>
          </div>
        </div>

        <div class="col-xxl-12 col-md-12">
          <div class="tp-profile-input-box">
              <div class="tp-contact-input">
                <input id="name" v-bind="name" :placeholder="$t('Name')" class="no-icon" type="text">
              </div>
              <div class="tp-profile-input-title">
                <label for="name">{{ $t('Name') }}</label>
              </div>
              <err-message :msg="errors.name" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-profile-input-box">
            <div class="tp-contact-input">
              <input id="username" v-bind="username" :placeholder="$t('Username')" class="no-icon" type="text">
            </div>
            <div class="tp-profile-input-title">
              <label for="username">{{ $t('Username') }}</label>
            </div>
              <err-message :msg="errors.username" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="tp-profile-input-box">
              <div class="tp-contact-input">
                  <input id="email" v-bind="email" :placeholder="$t('Email')" type="email" readonly disabled>
              </div>
              <div class="tp-profile-input-title">
                <label for="email">{{ $t('Email') }}</label>
              </div>
              <err-message :msg="errors?.email" />
            </div>
        </div>

	      <!--        <div class="col-xxl-6 col-md-6">
										<div class="profile__input-box">
											<div class="profile__input">
													<input type="text" placeholder="Enter username" value="shahnewzname">
													<span>
														<i class="fa-brands fa-facebook-f"></i>
													</span>
											</div>
										</div>
								</div>
								<div class="col-xxl-6 col-md-6">
										<div class="profile__input-box">
											<div class="profile__input">
													<input type="text" placeholder="Enter username" value="shahnewzname">
													<span><i class="fa-brands fa-twitter"></i></span>
											</div>
										</div>
								</div>
								<div class="col-xxl-6 col-md-6">
										<div class="profile__input-box">
											<div class="profile__input">
													<input type="text" :placeholder="$t('Phone')" v-model="user.mobile">
													<span>
														<svg-phone-2/>
													</span>
											</div>
										</div>
								</div>-->
	      <!--        <div class="col-xxl-6 col-md-6">
										<div class="profile__input-box">
											<div class="profile__input">
													<ui-nice-select
													:options="[
														{ text: $t('Male'), value: 'male' },
														{ text: $t('Female'), value: 'female' },
														{ text: $t('Other'), value: 'other' }
													]"
													name="gender"
													:default-current="0"
													@onChange="changeHandler"
													v-model="user.gender"
												/>
											</div>
										</div>
								</div>
								<div class="col-xxl-12">
										<div class="profile__input-box">
											<div class="profile__input">
													<input type="text" :placeholder="$t('Address')" v-model="user.address">
													<span>
														<svg-address/>
													</span>
											</div>
										</div>
								</div>

								<div class="col-xxl-12">
										<div class="profile__input-box">
											<div class="profile__input">
													<textarea :placeholder="$t('Bio')" v-model="user.bio"></textarea>
											</div>
										</div>
								</div>-->
        <div class="col-xxl-12">
            <div class="profile__btn">
              <button class="tp-btn" type="submit">{{ $t('Update Profile') }}</button>
            </div>
        </div>
      </div>
  </form>
</template>

<script lang="ts" setup>
import {useUserStore} from "@/pinia/useUserStore";
import formDataService from "@/services/formDataService";
import {$axios} from "@/plugins/00.axiosInstance";
import {toast} from "vue3-toastify";
import {useForm} from "vee-validate";
import * as yup from "yup";
import type {IResponse} from "@/types/response-d-t";

const {t} = useI18n()
const userStore = useUserStore()
const loading = ref<boolean>(false);
const _photo = ref(null);

interface IUserFormValues {
	name: string
	username: string
	// email: string
}
const {errors, handleSubmit, defineInputBinds, resetForm, setFieldValue} = useForm<IUserFormValues>({
	validationSchema: yup.object({
		name: yup.string().required().label(t("Name")),
		username: yup.string().required().label(t("Username")),
		// email: yup.string().required().email().label(t('Email')),
	}),
});

onMounted(() => {
	// console.log(126, {username, user}, userStore.user)
});

const onSubmit = handleSubmit((values: IUserFormValues) => {
	if (loading.value) return;

	if (values.hasOwnProperty('email')) {
		delete values.email;
	}
	const formData = formDataService(
			{...values, _photo: _photo.value},
			{_photo: 'photo'},
			['_photo']
	);

	loading.value = true;
	$axios
			.post(`profile`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				baseURL: "http://localhost:3000/api"
			})
			.then((response: { data: IResponse }) => {
				// todo: complete it after api finish
				nextTick(() => toast.success(response?.data?.message || t('Profile updated successfully')));
				setTimeout(() => {
					resetForm();
					userStore.refresh();
				}, 500);
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
const username = defineInputBinds('username');
const email = defineInputBinds('email');

const changePhotoHandler = (e: any) => {
	if (e) {
		_photo.value = e;
	}
};

watch(
		() => userStore.user,
		() => {
			setFieldValue('name', userStore.user?.name || '');
			setFieldValue('username', userStore.user?.username || '');
			setFieldValue('email', userStore.user?.email || '');
			_photo.value = null;
		});
</script>

