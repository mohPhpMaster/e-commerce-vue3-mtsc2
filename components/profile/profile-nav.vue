<template>
  <nav>
	  <button :disabled="loading" class="tp-logout-btn w-100" type="button" role="button" aria-selected="false" @click="emit('logout')">{{ $t('Sign out') }}</button>

    <div class="nav nav-tabs tp-tab-menu flex-column" id="profile-tab" role="tablist">
      <button class="nav-link" :class="{ active: isActiveTab('nav-profile-tab','') }" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" @click="updateHash('')">
        <span><i class="fa-regular fa-user-pen"></i></span>{{ $t('Profile') }}
      </button>
<!--      <button class="nav-link" :class="{ active: isActiveTab('information') }" id="nav-information-tab" data-bs-toggle="tab" data-bs-target="#nav-information" type="button" role="tab" aria-controls="nav-information" aria-selected="false" @click="updateHash('information')">-->
<!--        <span><i class="fa-regular fa-circle-info"></i></span> {{ $t('Personal Details') }}-->
<!--      </button>-->
      <button class="nav-link" :class="{ active: isActiveTab('address') }" id="nav-address-tab" data-bs-toggle="tab" data-bs-target="#nav-address" type="button" role="tab" aria-controls="nav-address" aria-selected="false" @click="updateHash('address')">
        <span><i class="fa-light fa-location-dot"></i></span> {{ $t('Address') }}
      </button>
      <button class="nav-link" :class="{ active: isActiveTab('order') }" id="nav-order-tab" data-bs-toggle="tab" data-bs-target="#nav-order" type="button" role="tab" aria-controls="nav-order" aria-selected="false" @click="updateHash('order')">
        <span><i class="fa-light fa-clipboard-list-check"></i></span> {{ $t('Orders') }}
      </button>
      <button class="nav-link" :class="{ active: isActiveTab('password') }" id="nav-password-tab" data-bs-toggle="tab" data-bs-target="#nav-password" type="button" role="tab" aria-controls="nav-password" aria-selected="false" @click="updateHash('password')">
        <span><i class="fa-regular fa-lock"></i></span> {{ $t('Change Password') }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type {IUser} from "@/types/user-d-t";

const emit = defineEmits(['logout'])
const props = defineProps<{
	user?: IUser,
	loading?: boolean
}>();

const router = useRouter();

function updateHash(hash) {
	const updatedHash = !hash || hash.startsWith('#') ? hash : `#${hash}`;
	router.push({hash: updatedHash});
}

function isActiveTab(tab, alternate = undefined) {
	return [tab && `#${tab}`, alternate && `#${alternate}`].includes(router.currentRoute.value.hash);
}

</script>

<style scoped lang="scss">
.tp-logout-btn {
	margin-bottom: 30px;
}

</style>