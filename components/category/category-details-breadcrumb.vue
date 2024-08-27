<template>
  <section class="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
    <div class="container">
        <div class="row">
          <div class="col-xxl-12">
              <div class="breadcrumb__content p-relative z-index-1">
              <h3 class="breadcrumb__title">{{ toolsService.parseCategoryName(category) }}</h3>

                <div class="breadcrumb__list has-icon">
                    <span class="breadcrumb-icon me-1">
                      <svg-dot/>
                    </span>
                    <span><a href="/" @click="useRouter().push('/')">{{ $t('Home') }}</a></span>
<!--                    <span><a href="#" @click="toolsService.gotoCategory(category.parentCategory)">{{ category.parentCategory?.parentName }}</a></span>-->
                    <span>{{ toolsService.parseCategoryName(category) }}</span>
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type ICategory } from '@/types/category-d-t';
import toolsService from "@/services/toolsService";

const props = defineProps<{category:ICategory}>()

</script>
