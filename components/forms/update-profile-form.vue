<template>
  <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" :placeholder="$t('Username')" v-model="user.username">
                  <span>
                    <svg-user-3/>
                  </span>
              </div>
            </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" :placeholder="$t('Name')" v-model="user.name">
                  <span>
                    <svg-user-3/>
                  </span>
              </div>
            </div>
        </div>

        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="email" :placeholder="$t('Email')" v-model="user.email">
                  <span>
                    <svg-email/>
                  </span>
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
        </div>-->
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" :placeholder="$t('Phone')" v-model="user.mobile">
                  <span>
                    <svg-phone-2/>
                  </span>
              </div>
            </div>
        </div>
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
        </div>-->
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
        </div>
        <div class="col-xxl-12">
            <div class="profile__btn">
              <button type="submit" class="tp-btn">{{ $t('Update Profile') }}</button>
            </div>
        </div>
      </div>
  </form>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/useUserStore";
import type {IUser} from "@/types/user-d-t";

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
watch(
		() => userStore.user,
		() => {
			user.value = userStore.user;
		});

onMounted(() => {
	// console.log(126, {username, user}, userStore.user)
});

const changeHandler = (e: { value: string; text: string }, index: number) => {
	user.value.gender = e.value;
};

const onSubmit = () => {

	console.log(user.value);
};

</script>

