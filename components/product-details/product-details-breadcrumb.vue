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
                    <span>
	                    <nuxt-link href="/">{{ $t('Home') }}</nuxt-link>
                    </span>
                    <span v-if="product?.parentCategory">
	                    <nuxt-link :href="toolsService.getCategoryUrl(product?.parentCategory)">{{ toolsService.parseCategoryName(product.parentCategory) }}</nuxt-link>
                    </span>
                    <span>{{ toolsService.parseProductName(product) }}</span>
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type IProduct } from '@/types/product-d-t';
import toolsService from "@/services/toolsService";
import type {ICategory} from "@/types/category-d-t";

const props = defineProps<{ product: IProduct }>()

const parsedTitle = computed(() => {
	if (props?.product) {
		return toolsService.parseProductName(props?.product)
	} else {
		return ""
	}
});
</script>
