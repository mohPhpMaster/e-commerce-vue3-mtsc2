<template>
  <section :class="`tp-search-area tp-search-style-brown ${utilityStore.openSearchBar ? 'opened' : ''}`">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-search-form">
            <div class="tp-search-close text-center mb-20">
              <button class="tp-search-close-btn tp-search-close-btn"></button>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="tp-search-input mb-10">
                <input
		                v-model="searchText"
		                :placeholder="$t('Search for products keywords ...')"
		                autofocus
		                class="search-bar-input-search"
		                type="text"
                />
                <button type="submit"><i class="flaticon-search-1"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
		  :class="`body-overlay ${utilityStore.openSearchBar ? 'opened' : ''}`"
		  @click="utilityStore.handleOpenSearchBar()"
  ></div>
</template>

<script lang="ts" setup>
import {useUtilityStore} from "@/pinia/useUtilityStore";
import {useSearchStore} from "@/pinia/useSearchStore";

const route = useRoute();
const router = useRouter();
let searchText = ref<string>(route?.query?.searchText);
const utilityStore = useUtilityStore();

// handleSubmit
const handleSubmit = () => {
	utilityStore.handleOpenSearchBar();

	if (searchText.value) {
		if (searchText.value === router.currentRoute.value?.query?.searchText) {
			useSearchStore().triggerSearch();
			return false;
		}
		router.push(`/search?searchText=${searchText.value}`);
	} else {
		router.push(`/search`);
	}
};

watch(
		() => route.query,
		() => {
			searchText.value = router.currentRoute.value?.query?.searchText
		}
)
</script>
