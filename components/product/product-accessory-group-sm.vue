<template>
  <div class="tp-product-accessories-item-5 d-flex align-items-center">
    <div class="tp-product-accessories-thumb-5 mx-3 fix col-1">
        <span class="text-danger bold " :class="{
					'v-hidden': !group.is_required,
        }">*</span>
    </div>
    <h4 class="tp-product-accessories-name-5 col-auto">
      {{ group.name }}
    </h4>
    <div class="tp-product-accessories-content-5 my-2 mx-auto col-6">
				<product-accessory-sm :accessories="group.accessories" @updated="accessoryProductUpdated"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-d-t';
import toolsService from "@/services/toolsService";
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";

const currency = useSiteSettings().currency;
const emit = defineEmits(['updated'])

const props = defineProps<{group:IProductAccessories}>()

const accessoryProductUpdated = (v: IProductAccessoriesGroups) => {
	emit('updated', v)
}
</script>
