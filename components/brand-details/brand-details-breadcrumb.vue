<template>
  <section class="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
    <div class="container">
        <div class="row">
          <div class="col-xxl-12">
              <div class="breadcrumb__content p-relative z-index-1">
              <h3 class="breadcrumb__title">{{ parsedTitle }}</h3>

                <div class="breadcrumb__list has-icon">
                    <span class="breadcrumb-icon me-1">
                      <svg-dot/>
                    </span>
                    <span><a href="/" @click="useRouter().push('/')">Home</a></span>
<!--                    <span><a href="#" @click="toolsService.gotoBrand(brand)">{{toolsService.parseBrandName(brand)}}</a></span>-->
                    <span>{{ toolsService.parseBrandName(brand) }}</span>
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type IBrand } from '@/types/brand-d-t';
import toolsService from "@/services/toolsService";

const props = defineProps<{ brand: IBrand }>()

const parsedTitle = computed(() => {
	if (props?.brand) {
		return toolsService.parseBrandName(props?.brand)
	} else {
		return ""
	}
});
</script>
