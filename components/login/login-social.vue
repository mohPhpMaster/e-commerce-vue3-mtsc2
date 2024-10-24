<template>
  <div
		  class="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center"
  >
    <div class="tp-login-option-item has-google">
      <a href="#" :title="$t('Sign in with google')">
        <img src="/images/icon/login/google.svg" alt="" />
				{{ $t("Sign in with google") }}
      </a>
    </div>

    <div class="tp-login-option-item">
      <a href="#" :title="$t('Sign in with facebook')" >
        <img src="/images/icon/login/facebook.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>