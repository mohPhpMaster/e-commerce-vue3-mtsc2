<template>
    <div class="dropdown">
        <button
		        id="groupSelect"
		        ref="groupSelect"
		        aria-expanded="false"
		        aria-haspopup="true"
		        class="tp-btn tp-btn-sm dropdown-toggle px-3 w-100"
		        data-bs-toggle="dropdown"
		        type="button"
        >
          {{ selectedAccessory?.id ? selectedAccessory?.name : $t("Choose") }}
        </button>

        <div aria-labelledby="groupSelect" class="dropdown-menu w-100 p-3">
          <input
		          v-model="searchTerm"
		          autofocus
		          class="form-control mb-2 input-group-search"
		          :placeholder="$t('Search...')"
		          type="text"
          />
          <a
		          v-show="!searchTerm"
		          href="void(0)"
		          class="dropdown-item"
		          @click.prevent="resetAccessory()"
          >
            {{ $t("Choose") }}
          </a>
          <a
		          v-for="(accessory, index) in filteredAccessories"
		          :key="index"
		          href="void(0)"
		          class="dropdown-item"
		          @click.prevent="selectAccessory(accessory)"
          >
            {{ accessory?.name }}
          </a>
        </div>
      </div>
</template>

<script setup lang="ts">
import type {IProductAccessoriesGroups} from "@/types/product-accessories-groups-d-t";
import {computed, nextTick, ref} from "vue";

const currency = useSiteSettings().currency;
const emit = defineEmits(['updated'])

const props = defineProps<{ accessories:IProductAccessoriesGroups[]}>()

const selectedAccessory = ref<IProductAccessoriesGroups>({} as IProductAccessoriesGroups);
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
