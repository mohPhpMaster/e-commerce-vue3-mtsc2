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
                <input id="name" v-model="user.name" :placeholder="$t('Name')" class="no-icon" type="text">
              </div>
              <div class="tp-profile-input-title">
                <label for="name">{{ $t('Name') }}</label>
              </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-profile-input-box">
            <div class="tp-contact-input">
              <input id="username" v-model="user.username" :placeholder="$t('Username')" class="no-icon" type="text">
            </div>
            <div class="tp-profile-input-title">
              <label for="username">{{ $t('Username') }}</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="tp-profile-input-box">
              <div class="tp-contact-input">
                  <input id="email" v-model="user.email" :placeholder="$t('Email')" type="email">
              </div>
              <div class="tp-profile-input-title">
                <label for="email">{{ $t('Email') }}</label>
              </div>
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
import type {IUser} from "@/types/user-d-t";
import formDataService from "@/services/formDataService";
import {$axios} from "@/plugins/00.axiosInstance";
import {toast} from "vue3-toastify";

const {t} = useI18n()
const userStore = useUserStore()

// interface IFormValues {
// 	username?: string | null;
// 	email?: string | null;
// 	mobile?: string | null;
// 	gender?: string | null;
// 	address?: string | null;
// 	bio?: string | null;
// }

const user = ref<IUser>(userStore.user);
const _photo = ref(null);
watch(
		() => userStore.user,
		() => {
			user.value = userStore.user;
		});

onMounted(() => {
	// console.log(126, {username, user}, userStore.user)
});

const changePhotoHandler = (e: any) => _photo.value = e;

const onSubmit = () => {
	const formData = formDataService(
			objectOnly({
						...user.value,
						_photo
					},
					['name', 'email', 'username', 'photo', '_photo']
			),
			{_photo: 'photo'},
			['_photo']
	);
	$axios.post('profile', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		// baseURL: "http://laravel.local/api"
	})
			.then(response => {
				toast.success(t('Profile updated successfully'));
				console.log(166, response.data);
				_photo.value = null;
				userStore.refresh();
			})
			.catch(error => {
				console.log(error);
				toast.error(t('Failed to update profile'));
			});
};

</script>

