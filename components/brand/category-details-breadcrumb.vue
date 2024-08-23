<template>
  <section class="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
    <div class="container">
        <div class="row">
          <div class="col-xxl-12">
              <div class="breadcrumb__content p-relative z-index-1">
                <div class="breadcrumb__list has-icon">
                    <span class="breadcrumb-icon me-1">
                      <svg-dot/>
                    </span>
                    <span><a href="#" @click="router.push('/')">Home</a></span>
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
const router = useRouter();

const props = defineProps<{category:ICategory}>()

</script>
