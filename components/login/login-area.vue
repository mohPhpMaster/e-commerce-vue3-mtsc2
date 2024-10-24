<template>
  <section class="tp-login-area pb-140 p-relative z-index-1 fix">
    <div class="tp-login-shape">
      <img alt="shape" class="tp-login-shape-1" src="/images/login/login-shape-1.png" />
      <img alt="shape" class="tp-login-shape-2" src="/images/login/login-shape-2.png" />
      <img alt="shape" class="tp-login-shape-3" src="/images/login/login-shape-3.png" />
      <img alt="shape" class="tp-login-shape-4" src="/images/login/login-shape-4.png" />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <div class="tp-login-wrapper">
            <div class="tp-login-top text-center mb-30">
              <h3 class="tp-login-title">{{ $t("Login to :siteTitle", {siteTitle: $settings?.siteTitle || ""}) }}</h3>
              <p>
								{{ $t("Don’t have an account?") }}
                <span><nuxt-link href="/register">{{ $t("Create a free account") }}</nuxt-link></span>
              </p>
            </div>
            <div class="tp-login-option">
              <!-- social login start -->
              <login-social />
              <!-- social login end -->
              <div class="tp-login-mail text-center mb-40">
                <p>{{ $t("or Sign in with Username") }}</p>
              </div>
              <!-- form start -->
              <forms-login-form />
              <!-- form end -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {useUserStore} from "@/pinia/useUserStore";

useUserStore().guestUser();
</script>
