<template>
  <div class="col-12 pt-5" v-if="productAccessories?.length">
    <div class="d-flex align-items-center row">
      <label class="col-auto d-flex form-label mr-2" for="groupSelect">{{ $t("Needs to:")}}</label>
      <button
		      v-if="![null, ''].includes(selectedGroupIndex)"
		      id="groupReset"
		      aria-expanded="false"
		      aria-haspopup="false"
		      class="border-0 btn btn-outline-danger btn-sm col-auto"
		      type="button"
		      @click="resetGroup"
      >
        <span class="fa fa-refresh"></span>
      </button>

      <div class="col-3 dropdown">
        <button
		        id="groupSelect"
		        ref="groupSelect"
		        aria-expanded="false"
		        aria-haspopup="true"
		        class="btn btn-secondary dropdown-toggle px-3 w-100"
		        data-bs-toggle="dropdown"
		        type="button"
        >
          {{ selectedGroupIndex !== "" ? productAccessories?.[selectedGroupIndex]?.name : $t("Choose") }}
        </button>

        <div aria-labelledby="groupSelect" class="dropdown-menu w-100 p-3">
          <input v-model="searchTerm" autofocus class="form-control mb-2 input-group-search" :placeholder="$t('Search...')" type="text"/>
          <a
		          v-for="(group, index) in filteredGroups"
		          :key="index"
		          href="void(0)"
		          class="dropdown-item"
		          @click.prevent="selectGroup(index)"
          >
            {{ group?.name }}
          </a>
        </div>
      </div>

      <cart-add-to-table-btn class="mx-1 col-auto" v-if="![null, ''].includes(selectedGroupIndex)" @clicked.stop="addAccessoryToTable(false)"/>
    </div>

    <div v-if="![null, ''].includes(selectedGroupIndex)" class="mt-3">
      <div class="px-1">
        <div class="row m-auto w-100">
          <div v-for="accessory in productAccessories?.[selectedGroupIndex]?.accessories" :key="accessory.id" class="col-lg-3 col-12 col-sm-12 mt-sm-2 mb-3">
            <div @click="selectAccessory(accessory)" :class="{ selected: selectedAccessory && selectedAccessory.id === accessory.id }" class="card h-100 pointer shadow-sm">
              <div class="embed-responsive embed-responsive-16by9">
                <img :alt="accessory?.name" :src="toolsService.parseImageUrl(accessory.imageUrl)" class="card-img-top embed-responsive-item">
              </div>

              <div class="card-body">
                <h5 class="card-title">
                  {{ accessory?.name }}
                  <cart-add-to-table-btn class="add-accessory-to-table pull-left" @clicked.prevent="addAccessoryToTable(false)"/>
                </h5>

                <p v-html="toolsService.normalizeLineEndingsToHtml(accessory.description)" class="overflow-x-auto card-text"/>

					      <div class="row m-auto w-100">
				            <p class="card-text p-0 m-0">
					            <small class="text-muted">{{ $t('Price:') }} <span class="product-price-value_">{{ currency(accessory.price) }}</span></small>
				            </p>
				            <p class="card-text p-0 m-0">
				              <small class="text-muted">{{ $t("Quantity:") }} {{ accessory.qty }}</small>
				            </p>
					      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2 col-12">
      <table class="table table-hover">
        <thead class="table-primary">
          <tr>
            <th>{{ $t("Accessory") }}</th>
            <th>{{ $t("Quantity") }}</th>
            <th>{{ $t("Price") }}</th>
            <th>{{ $t("Remove") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in selectedItems" :key="index">
            <td>{{ item?.group?.name + (item?.accessory?.name ? " - " + item?.accessory?.name : "") }}</td>
            <td>{{ Number(item?.accessory?.qty) || 1 }}</td>
            <td class="product-price-value_">{{ currency(item?.accessory?.price || item.group?.price || 0) }}</td>
            <td><button class="btn btn-outline-danger btn-sm" @click="removeAccessory(index)"><span class="fa fa-trash"></span></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, watch, computed, nextTick} from 'vue';
import swal from 'sweetalert';
import toolsService from "@/services/toolsService";

import {api} from "@/plugins/api";
import type {IProduct} from "@/types/product-d-t";
import type {IProductAccessories} from "@/types/product-accessories-d-t";
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import type {ISelectedAccessories} from "@/types/selected-accessories-d-t";
import currency from "@/services/currencyService";

const emit = defineEmits(['updated'])

// Props
const props = defineProps<{
	product: IProduct;
	productsCount?: number;
	select: ISelectedAccessories[];
	productAccessories: IProductAccessories[];
}>();

const selectedGroupIndex = ref<number|string|null>("");
const selectedAccessory = ref<IProductAccessoriesGroups>({} as IProductAccessoriesGroups);
const selectedItems = ref<ISelectedAccessories[]>([] as ISelectedAccessories[]);
const searchTerm = ref<string>("");

// Computed properties
const filteredGroups = computed(() => {
	if (searchTerm.value.trim() === "") {
		return props.productAccessories;
	}
	return props.productAccessories.filter(group =>
			group?.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});

// Methods
const scrollToArea = () => {
	nextTick(() => {
		const element = document.getElementById('groupSelect');
		element?.scrollIntoView({behavior: "smooth", alignToTop: true});
	});
};

const resetGroup = () => {
	selectedGroupIndex.value = "";
	selectedAccessory.value = {} as IProductAccessoriesGroups;
	scrollToArea();
};

const selectGroup = (index: string | number) => {
	selectedGroupIndex.value = index;
	selectedAccessory.value = {} as IProductAccessoriesGroups;
	scrollToArea();
};

const selectAccessory = (accessory: any) => {
	selectedAccessory.value = selectedAccessory.value?.id === accessory.id ? null : accessory;
};

const addAccessoryToTable = (quit = false) => {
	if (![null, ''].includes(selectedGroupIndex.value)) {
		if (Number(props.productAccessories[selectedGroupIndex.value].is_required) && !selectedAccessory.value) {
			if (!quit) {
				swal({
					text: "فضلا قم باختيار اكسسوار",
					icon: "error"
				});
			}
		} else {
			selectedItems.value.push({
				group: props.productAccessories[selectedGroupIndex.value],
				accessory: selectedAccessory.value,
			});
			commit();
			resetGroup();
		}
	} else {
		if (!quit) {
			swal({
				text: "فضلا قم باختيار مجموعة",
				icon: "error"
			});
		}
	}
};

const removeAccessory = (index: number) => {
	selectedItems.value.splice(index, 1);
	commit();
};

const commit = () => {
	emit('updated', selectedItems.value);
};

// Lifecycle hooks
onMounted(() => {
	window.$(document).on('shown.bs.dropdown', function () {
		window.$(".input-group-search")?.focus()?.select();
	});
});

onUnmounted(() => {
	window.$(document).off('shown.bs.dropdown');
});

// Watchers
watch(
		() => props.select,
		(newVal) => {
			selectedItems.value = (newVal === null ? [] : newVal) as ISelectedAccessories[];
			resetGroup();
		}
);

// watch(
// 		() => props.product,
// 		async (newVal) => {
//
// 		}
// );
</script>

<style scoped>
.card-title {
	font-size: 1.25rem;
	font-weight: bold;
}

.card-text {
	font-size: 1rem;
}

.embed-responsive .card-img-top {
	object-fit: cover;
}

.table thead th {
	vertical-align: bottom;
	border-bottom: 2px solid #dee2e6;
}

.table-hover tbody tr:hover {
	background-color: #f8f9fa;
}

.btn-close {
	background: none;
	border: none;
	color: #000;
	font-size: 1.5rem;
}

.modal-header {
	border-bottom: 1px solid #dee2e6;
}

.modal-footer {
	border-top: 1px solid #dee2e6;
}

.dropdown-menu {
	max-height: 200px;
	overflow-y: auto;
}

.selected {
	border: 2px solid #007bff;
	background-color: rgba(0, 123, 255, 0.1);
}

.d-flex.align-items-center {
	display: flex;
	align-items: center;
}

.accessory-scroll-container {
	min-height: 400px;
	height: 400px;
	overflow: hidden scroll;
}

.add-accessory-to-table {
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	visibility: hidden;
}

.selected .add-accessory-to-table {
	visibility: visible;
}
</style>
