<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Google Login</button>
    <button @click="loginWithFacebook">Facebook Login</button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const config = useRuntimeConfig()?.public;

function loginWithGoogle() {
  const clientId = config?.googleClientId
  const redirectUri = encodeURIComponent(config?.baseUrl + '/auth/callback/google');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=profile%20email`

  prompt('redirectUri', redirectUri);
  prompt('url', url);
  window.location.href = url
}

function loginWithFacebook() {
  const clientId = config?.fb_app_id
  const redirectUri = config?.baseUrl + '/auth/callback/facebook'
  const url = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=public_profile,email`

  window.location.href = url
}
</script>