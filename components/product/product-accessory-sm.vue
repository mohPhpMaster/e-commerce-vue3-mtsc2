<template>
    <div class="dropdown">
        <button
		        id="groupSelect"
		        ref="groupSelect"
		        :title="selectedAccessory?.id ? selectedAccessory?.name : $t('Choose')"
		        aria-expanded="false"
		        aria-haspopup="true"
		        class="tp-btn tp-btn-sm dropdown-toggle px-3 w-100 py-2 text-truncate "
		        data-bs-toggle="dropdown"
		        type="button"
        >
          {{ selectedAccessory?.id ? selectedAccessory?.name : $t("Choose") }}
        </button>

        <div aria-labelledby="groupSelect" class="dropdown-menu w-100 p-3">
          <input
		          v-model="searchTerm"
		          :placeholder="$t('Search...')"
		          autofocus
		          class="form-control mb-2 input-group-search"
		          type="text"
          />
          <a
		          v-show="!searchTerm"
		          :title="$t('Choose')"
		          class="dropdown-item text-truncate"
		          href="void(0)"
		          @click.prevent="resetAccessory()"
          >
            {{ $t("Choose") }}
          </a>
          <a
		          v-for="(accessory, index) in filteredAccessories"
		          :key="accessory?.id || index"
		          :title="accessory?.name"
		          class="dropdown-item text-truncate"
		          href="void(0)"
		          @click.prevent="selectAccessory(accessory)"
          >
            {{ accessory?.name }}
          </a>
        </div>
      </div>
</template>

<script lang="ts" setup>
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import {computed, ref} from "vue";
import type {IProductAccessoriesData} from "@/types/selected-accessories-data-d-t";

const emit = defineEmits(['updated'])

const props = defineProps<{ accessories: IProductAccessoriesGroups[], selected?: IProductAccessoriesGroups|IProductAccessoriesData }>()

const selectedAccessory = ref<IProductAccessoriesGroups>(props.selected || {} as IProductAccessoriesGroups);
const searchTerm = ref<string>("");

// Computed properties
const filteredAccessories = computed(() => {
	if (searchTerm.value.trim() === "") {
		return props.accessories;
	}
	return props.accessories.filter(group =>
			group?.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});

const resetAccessory = () => {
	selectedAccessory.value = {} as IProductAccessoriesGroups;
	emit('updated', {} as IProductAccessoriesGroups);
};

const selectAccessory = (v: IProductAccessoriesGroups) => {
	selectedAccessory.value = v;
	emit('updated', v);
};
</script>
