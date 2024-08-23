<template>
 <div v-if="user" class="profile__main">
      <div class="profile__main-top pb-80">
        <div class="row align-items-center">
            <div class="col-md-6">
              <div class="profile__main-inner d-flex flex-wrap align-items-center">
                  <div class="profile__main-thumb">
                    <img
		                    :src="toolsService.parseImageUrl(user?.image)"
		                    :title="user?.image+`\n`+toolsService.parseImageUrl(user?.image)"
		                    alt="user profile image"
                    >
                    <div class="profile__main-thumb-edit">
                        <input id="profile-thumb-input" class="profile-img-popup" type="file">
                        <label for="profile-thumb-input"><i class="fa-light fa-camera"></i></label>
                    </div>
                  </div>
                  <div class="profile__main-content">
                    <h4 class="profile__main-title">{{ $t("Welcome :username!", {username: user.name}) }}</h4>
	                  <p>{{ $t('You have ') }}<span>{{ user.notifications?.length || 0 }}</span>{{ $t(' notifications') }}</p>
                  </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile__main-logout text-sm-end">
                  <button :disabled="loading" class="tp-logout-btn" @click.prevent="emit('logout')">{{ $t('Sign out') }}</button>
              </div>
            </div>
        </div>
      </div>
      <div class="profile__main-info">
        <div class="row gx-3">
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-download">2</span>
                        <svg-download />
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Downlaods</h4>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-order">5</span>
                      <svg-orders />
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Orders</h4>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-wishlist">10</span>
                        <svg-wishlist-2 />
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Wishlist</h4>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-wishlist">07</span>
                        <svg-gift-box />
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Gift Box</h4>
              </div>
            </div>
        </div>
      </div>
 </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import type {IUser} from "@/types/user-d-t";

const emit = defineEmits(['logout'])
defineProps<{
	user: IUser,
	loading: boolean
}>();
</script>
