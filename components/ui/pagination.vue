<template>
  <nav>
    <ul>
      <li @click="setPage(currentPage-1)" :class="currentPage === 1 ?'disable':''">
        <a class="tp-pagination-prev prev page-numbers pointer">
          <svg-paginate-prev />
        </a>
      </li>

      <li v-for="n in totalPages" :key="n" @click="setPage(n)">
        <a :class="`pointer ${currentPage === n ? 'current' : ''}`">{{
          n
        }}</a>
      </li>

      <li @click="setPage(currentPage+1)" :class="currentPage === totalPages ?'disable':''">
        <a class="next page-numbers pointer">
          <svg-paginate-next />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted,watch } from "vue";
import {calcStartIndexByPage} from "@/services/calcPageService";
const emit = defineEmits(["handlePaginate"]);
const route = useRoute();
const router = useRouter();

type ItemDataType<T> = {
  data: T[];
  itemsPerPage: number;
	total?: number
};
const props = defineProps<ItemDataType<any>>();
const currentPage = ref<number>(Number(route?.query?.page || 1));
const totalPages = computed(() =>
  (props?.total ? Math.ceil(props.total / props.itemsPerPage) : 0) || Math.ceil(props.data.length / props.itemsPerPage)
);
const startIndex = computed(() => calcStartIndexByPage(currentPage.value, props.itemsPerPage));
const endIndex = computed(() => startIndex.value + props.itemsPerPage);

const setPage = (idx: number) => {
  if (idx <= 0 || idx > totalPages.value) {
    return;
  }
  window.scrollTo(0, 0);
  currentPage.value = idx;
	const query = {...route.query, page: idx};
	router.push({query});
  emit("handlePaginate", props.data, startIndex.value, endIndex.value);

};

onMounted(() => {
  emit("handlePaginate", props.data, startIndex.value, endIndex.value);
});
watch(() => route.query || route.params, (newStatus) => {
  currentPage.value = Number(route?.query?.page || 1);
});
</script>
