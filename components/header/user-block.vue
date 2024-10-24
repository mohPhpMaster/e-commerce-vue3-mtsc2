<template>
  <template v-if="userStore.initialized">
	  <template v-if="userStore.isLoggedIn()">
	    <nuxt-link href="/profile" class="d-flex align-items-center">
		      <profile-user-avatar sm />

	        <div class="tp-header-login-content-5">
		        <p class="text-nowrap"><span>{{ $t('Hello') }}</span> <br> {{ userStore.user.name }}</p>
	        </div>
	    </nuxt-link>
	  </template>
	  <template v-else>
		  <header-login-btn />
	  </template>
  </template>
  <template v-else>
	  <header-login-btn />
  </template>
</template>

<script setup lang="ts">

// const {$auth} = useNuxtApp()
// const icon = computed(() => $auth.session.value?.email ? 'i-heroicons-lock-open' : 'i-heroicons-lock-closed')


import {useUserStore} from '@/pinia/useUserStore'

const userStore = useUserStore()
const data = ref({})

// const login = async () => {
// 	await userStore.login({
// 		username: 'admin',
// 		password: '123456'
// 	} as IUserFormValues)
// }

const logout = async () => {
	await userStore.logout()
}
</script>
