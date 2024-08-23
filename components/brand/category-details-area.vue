<template>
  <section class="tp-category-details-area">
    <div class="tp-category-details-top pb-115">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-6">
            <!-- category details thumb start -->
            <category-details-thumb
              :category="category"
            />
            <!-- category details thumb end -->
          </div>
          <!-- col end -->
          <div class="col-xl-5 col-lg-6">
            <!-- category details wrapper -->
            <category-details-wrapper :category="category" />
            <!-- category details wrapper -->
          </div>
        </div>
      </div>
    </div>
    <div class="tp-category-details-bottom pb-140">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <!-- category details tab nav -->
            <category-details-tab-nav :category="category" />
            <!-- category details tab nav -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type ICategory } from '@/types/category-d-t';
 const props = defineProps<{ category: ICategory; }>()

</script>
