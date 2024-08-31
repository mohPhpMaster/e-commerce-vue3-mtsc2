<template>
  <div
    class="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center"
  >
    <div class="tp-login-option-item has-google">
      <a href="#">
        <img src="/images/icon/login/google.svg" alt="" />
        {{$t('Sign in with')}} Google
      </a>
    </div>
    <div class="tp-login-option-item has-google">
      <a href="#">
        <img src="/images/icon/login/facebook.svg" alt="" />
        {{$t('Sign in with')}} Facebook
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
