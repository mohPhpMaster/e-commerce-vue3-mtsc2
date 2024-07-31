<template>
  <div class="col-12 pt-5">
      <div class="d-flex align-items-center">
        <label class="col-auto d-flex form-label mr-2" for="groupSelect">يحتاج الى:
            <button v-if="![null, ''].includes(selectedGroupIndex)" id="groupReset" aria-expanded="false" aria-haspopup="false" class="border-0 btn btn-outline-danger btn-sm" type="button" @click="resetGroup()">
              <span class="fa fa-refresh"></span>
            </button>
        </label>

        <div class="dropdown ">
          <button id="groupSelect" ref="groupSelect" aria-expanded="false" aria-haspopup="true" class="btn btn-secondary dropdown-toggle px-3 w-100" data-toggle="dropdown" type="button">
            {{ selectedGroupIndex !== "" ? product_accessories_groups[selectedGroupIndex].name : "اختر" }}
          </button>

          <div aria-labelledby="groupSelect" class="dropdown-menu w-100 p-3">
            <input v-model="searchTerm" autofocus class="form-control mb-2 input-group-search" placeholder="بحث..." type="text"/>
            <a v-for="(group, index) in filteredGroups" :key="index" class="dropdown-item" href="#" @click="selectGroup(index)">
              {{ group.name }}
            </a>
          </div>
        </div>

        <AddToTableBtn class="mx-1" v-if="![null, ''].includes(selectedGroupIndex)" @clicked.stop="addAccessoryToTable(false)" />
      </div>

      <div v-if="![null, ''].includes(selectedGroupIndex)" class="mt-3">
				<div class="px-1">
				  <div class="row m-auto w-100">
				    <div v-for="accessory in product_accessories_groups[selectedGroupIndex]?.accessories" :key="accessory.id" class="col-lg-3 col-12 col-sm-12 mt-sm-2 mb-3">
				      <div @click="selectAccessory(accessory)" :class="{ selected: selectedAccessory && selectedAccessory.id === accessory.id }" class="card h-100 pointer shadow-sm">
				        <div class="embed-responsive embed-responsive-16by9">
				          <img
						          :alt="accessory.name"
						          :src="parseImageUrl(accessory.imageUrl)"
						          class="card-img-top embed-responsive-item"
				          >
				        </div>

				        <div class="card-body">
				          <h5 class="card-title">
					          {{ accessory.name }}
                    <AddToTableBtn class="add-accessory-to-table pull-left" @clicked.prevent="addAccessoryToTable(false)" />
				          </h5>

				          <p class="card-text">{{ accessory.description }}</p>
				          <p class="card-text p-0 m-0">
				            <small class="text-muted">السعر: {{ currency(accessory.price) }}</small>
				          </p>
				          <p class="card-text p-0 m-0">
				            <small class="text-muted">الكمية: {{ accessory.qty }}</small>
				          </p>

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
              <th>الاكسيسوار</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>إزالة</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in selectedItems" :key="index">
              <td>{{ item.group.name + (item.accessory?.name ? " - " + item.accessory.name : "") }}</td>
              <td>{{ Number(item.accessory?.qty) || 1 }}</td>
              <td>{{ currency(item.accessory?.price || item.group?.price || 0) }}</td>
              <td><button class="btn btn-outline-danger btn-sm" @click="removeAccessory(index)"><span class="fa fa-trash"></span></button></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import swal from 'sweetalert';
import global_mixins from '@/utils/global_mixins';
import AddToTableBtn from "@/components/Product/AddToTableBtn";

export default {
	name: 'AddProductAccessories',
	components: {AddToTableBtn},
	mixins: [global_mixins],
	props: {
		productsCount: {
			type: Number,
			default: () => 4
		},
		// product: {
		// 	type: [Object, null],
		// 	default: () => ({})
		// },
		select: {
			type: [Object, Number, null],
			default: () => null
		}
	},
	data() {
		return {
			selectedGroupIndex: "",
			selectedAccessory: null,
			selectedItems: [],
			searchTerm: "",
		};
	},
	computed: {
		...mapGetters(["product_accessories_groups", 'product']),
		filteredGroups() {
			if (this.searchTerm.trim() === "") {
				return this.product_accessories_groups;
			}
			return this.product_accessories_groups.filter(group =>
					group.name.toLowerCase().includes(this.searchTerm.toLowerCase())
			);
		},
	},
	methods: {
		scrollToArea() {
			this.$nextTick(() => {
				this.$refs.groupSelect.scrollIntoView({behavior: "smooth", alignToTop: true});
			})
		},
		resetGroup() {
			this.selectedGroupIndex = "";
			this.selectedAccessory = null;
			this.scrollToArea();
		},
		selectGroup(index) {
			this.selectedGroupIndex = index;
			this.selectedAccessory = null;
			this.scrollToArea();
		},
		selectAccessory(accessory) {
			this.selectedAccessory = this.selectedAccessory?.id === accessory.id ? null : accessory;
			// this.addAccessoryToTable(!true)
			// this.scrollToArea();
		},
		addAccessoryToTable(quit = false) {
			if (![null, ''].includes(this.selectedGroupIndex)) {
				if (Number(this.product_accessories_groups[this.selectedGroupIndex].is_required) && !this.selectedAccessory) {
					quit || swal({
						text: "فضلا قم باختيار اكسسوار",
						icon: "error"
					});
				} else {
					this.selectedItems.push({
						group: this.product_accessories_groups[this.selectedGroupIndex],
						accessory: this.selectedAccessory,
					});
					this.commit();
					this.resetGroup();
				}
			} else {
				quit || swal({
					text: "فضلا قم باختيار مجموعة",
					icon: "error"
				});
			}
		},
		removeAccessory(index) {
			this.selectedItems.splice(index, 1);
			this.commit();
		},
		async commit() {
			this.$emit('updated', this.selectedItems);
		},
		async loadData() {
			await this.$nextTick(async () => {
				await this.$store.dispatch('fetchProductAccessoriesGroups', this?.product?.slug);

			});
		},
	},
	async mounted() {
		window.$(document).on('shown.bs.dropdown', function (e) {
			window.$(".input-group-search")?.focus()?.select();
		})
	},
	unmounted() {
		window.$(document).off('shown.bs.dropdown');
	},
	watch: {
		select(n, o) {
			// if (![null, ""].includes(this.selectedGroupIndex) || ![null, ""].includes(this.selectedAccessory)) {
			// 	this.addAccessoryToTable()
			// }
			this.selectedItems = n === null ? [] : n;
			this.resetGroup()
		},
		async product(n) {
			await this.loadData();
		}
	},
};
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
