<template>
  <tr class="tp-cart-item-row">
    <!-- img -->
    <td class="tp-cart-img col-2">
      <nuxt-link :to="toolsService.getProductUrl(item?.differents, true)" style="background-color: #F2F3F5;display: block;">
        <img :src="toolsService.getImageUrlValue(item?.differents)" :title="item?.differents?.name" alt="cart-img" />
      </nuxt-link>
    </td>
	  <!-- title -->
    <td class="tp-cart-title px-1 col-6">
     <div class="row">
		  <div class="col-12">
          <nuxt-link :to="toolsService.getProductUrl(item?.differents, true)">
		      {{ toolsService.parseProductName(item?.differents, true) }}
		    </nuxt-link>
		  </div>

      <div v-if="item?.accessories?.length" v-for="(accessory, index) in item?.accessories" :key="accessory.group?.id || accessory?.accessory?.id || index" class="col-12">
        <div class="col-12 text-nowrap ms-4 tp-cart-price">
          {{ accessory.group?.name }}{{ accessory?.accessory?.name ? ` - ${accessory?.accessory?.name}` : "" }}
	        <span class="product-price-value_">{{ accessory.accessory?.price ? currency(accessory.accessory?.price) : "" }}</span><span class="">{{ ` x ${(accessory?.accessory?.qty || 1)}` }}</span>
	      </div>
	    </div>
		</div>
    </td>
	  <!-- price -->
    <td class="tp-cart-price col-2"><span class="product-price-value_">{{ currency(cartStore.calcCartItem(item)) }}</span></td>
	  <!-- quantity -->
    <td class="tp-cart-quantity col-1">
      <div class="tp-product-quantity mt-10 mb-10 mx-2">
        <span class="tp-cart-minus" @click.stop.prevent="cartStore.quantityDecrement(item)">
          <svg-minus />
        </span>
				<input
						v-model="item.quantity"
						class="tp-cart-input"
						type="text"
						@change="cartStore.quantitySet(item, $event.target.value || 1)"
				>
        <span class="tp-cart-plus" @click.stop.prevent="cartStore.quantityIncrement(item)">
          <svg-plus-sm />
        </span>
      </div>
    </td>
	  <!-- action -->
    <td class="tp-cart-action col-1">
      <button
		      class="tp-cart-action-btn btn-link btn-outline-danger px-2"
		      @click="cartStore.removeCartProduct(item)"
      >
        <span><svg-close2 /></span>
      </button>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import {useCartStore} from "@/pinia/useCartStore";
import toolsService from "@/services/toolsService";
import type {ICartItem} from "@/types/cart-item-d-t";
import currency from "@/services/currencyService";

const cartStore = useCartStore();

const props = defineProps<{ item: ICartItem }>();

onMounted(() => {
	// console.log(68, props.item.accessories)
});
</script>

<style scoped>
.tp-cart-item-row:hover {
	background-color: #F2F3F5;
}
.tp-cart-item-row {
	padding: 15px 0;
}
</style>