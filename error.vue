<template>
  <nuxt-layout name="default">
    <section class="tp-error-area pt-110 pb-110">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8 col-md-10">
            <div class="tp-error-content text-center">
              <div class="tp-error-thumb">
                <img src="/images/error/error.png" alt="" />
              </div>
  
              <h5 class="tp-error-title">{{ error.statusCode }} {{ error.message }}</h5>
              <p>
                {{ $t("Whoops, this is embarassing. Looks like the page you were looking for wasn't found.") }}
              </p>
  
              <nuxt-link href="/" class="tp-error-btn">{{ $t("Back to Home") }}</nuxt-link>
<!--              <nuxt-link href="#" @click.prevent="handleError" class="tp-error-btn ml-2">Clear errors</nuxt-link>-->
            </div>
          </div>
        </div>
      </div>
    </section>
  </nuxt-layout>
</template>

<script setup lang="ts">
const { t } = useI18n();
const {title} = useSiteSettings();
useSeoMeta({ title: t("Error Page") });
const props = defineProps(["error"]);
// if (props?.error?.data === 'EMPTY')
// {
// 	clearError()
// }
const handleError = () => clearError({redirect: '/'})
</script>
