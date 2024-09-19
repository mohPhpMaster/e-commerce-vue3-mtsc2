<template>
 <div v-if="props.user" class="profile__main">
      <div class="profile__main-top pb-80" v-if="false">
        <div class="row align-items-center">
            <div class="col-md-6">
              <div class="profile__main-inner d-flex flex-wrap align-items-center">
                  <div class="profile__main-content">
	                  <p>{{ $t('You have :count notifications', {count: props.user.notifications?.length || 0 }) }}</p>
                  </div>
              </div>
            </div>
        </div>
      </div>
      <div class="profile__main-info">
        <div class="row gx-3">
          <forms-update-profile-form />
        </div>
      </div>
 </div>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import type {IUser} from "@/types/user-d-t";

const emit = defineEmits(['logout'])
const props = defineProps<{
	user: IUser,
	loading: boolean
}>();
</script>
