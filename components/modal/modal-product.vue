<template>
  <div
		  va-show="utilityStore.modalId && utilityStore.product"
		  class="modal fade tp-product-modal"
		  :id="utilityStore.modalId"
		  tabindex="-1"
		  :aria-labelledby="utilityStore.modalId"
		  aria-hidden="true"
  >
    <div
		    class="modal-dialog modal-dialog-centered"
		    data-bs-backdrop="static"
		    data-bs-keyboard="false"
    >
      <div class="modal-content">
        <div class="tp-product-modal-content d-lg-flex align-items-start">
          <button
		          type="button"
		          class="tp-product-modal-close-btn"
		          data-bs-dismiss="modal"
		          :data-bs-target="`#${utilityStore.modalId}`"
          >
            <i class="fa-regular fa-xmark"></i>
          </button>
	        <!-- product details thumb start -->
          <product-details-thumb :product="utilityStore.product" />
	        <!-- product details thumb end -->

	        <!-- product details wrapper -->
          <product-details-wrapper :product="utilityStore.product" :is-show-bottom="false"/>
	        <!-- product details wrapper -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUtilityStore } from "@/pinia/useUtilityStore";
const utilityStore = useUtilityStore();

</script>