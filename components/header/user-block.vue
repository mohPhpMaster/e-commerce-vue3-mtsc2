<template>
  <template v-if="userStore.initialized">
	  <template v-if="userStore.isLoggedIn()">
	    <nuxt-link href="/profile" class="d-flex align-items-center">
	        <div class="tp-header-login-icon-5">
	          <span>
	              <svg-user></svg-user>
	          </span>
	        </div>
	        <div class="tp-header-login-content-5">
		        <p><span>{{ $t('Hello') }}</span> <br> {{ userStore.user.name }}</p>
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
