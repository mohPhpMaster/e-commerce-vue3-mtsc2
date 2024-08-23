<template>
  <div>
      <!-- profile area start -->
      <profile-area/>
      <!-- profile area end -->
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/userStore";
import {api} from "@/plugins/api";

useSeoMeta({ title: "Profile Page" });

useUserStore().needUser();

onMounted(()=>{
	/**
	 * todo
	 */
	api.userAddressesData()
			.then((data) => {
				console.log(19, {data})
			})
})
</script>