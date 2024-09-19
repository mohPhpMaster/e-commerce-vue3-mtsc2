<template>
  <component :is="props?.editable ? 'label' : 'span'" :class="{'pointer profile__main-thumb': props?.editable}" :for="props?.editable ? props?.photoInputId : ''">

	  <div :class="{'pointer': props?.editable, 'sm-size': props?.sm,}" class="user-avatar" >
				<img v-if="photoUrl" :src="photoUrl" alt="user profile image">
				<img v-else-if="user?.photo" :src="toolsService.parseImageUrl(user?.photo)" alt="user profile image">
			  <span v-else-if="user?.name">{{ initials }}</span>
	      <div v-else class="tp-header-login-icon-5">
	        <span>
	            <svg-user></svg-user>
	        </span>
	      </div>

		    <div v-if="props?.editable && props?.photoInputId" class="profile__main-thumb-edit">
			    <input :id="props?.photoInputId" class="profile-img-popup" type="file" @change="photoChangeHandler">
		    </div>
	  </div>
	</component>
</template>

<script lang="ts" setup>
import toolsService from "@/services/toolsService";
import type {IUser} from "@/types/user-d-t";
import {useUserStore} from "@/pinia/useUserStore";

const emit = defineEmits(['updated']);

const props = withDefaults(defineProps<{
	photoInputId?: string;
	editable?: boolean;
	sm?: boolean;
}>(), {
	photoInputId: 'profile-thumb-input',
	editable: false,
	sm: false,
});

const userStore = useUserStore();
const user = ref<IUser>(userStore.user);
const _photo = ref(null);
watch(
		() => userStore.user,
		() => {
			user.value = userStore.user;
		}
);

const getInitials = (name?: string): string => {
	name = name || user.value?.name;
	const names = name.split(' ');
	const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
	return initials.slice(0, 2);
};

const initials = computed(() => getInitials());
const photoUrl = computed(() => {
	if (_photo.value && typeof URL !== 'undefined') {
		return URL.createObjectURL(_photo.value);
	}
	return null;
});

const photoChangeHandler = (e: Event) => {
	if (process.client && e.target?.files?.[0]) {
		_photo.value = e.target.files[0];
		emit('updated', _photo);
	}
};

onMounted(() => {
	// user.value.name = '';
});
</script>

<style lang="scss" scoped>
.user-avatar .tp-header-login-icon-5 span {
	background-color: #55585b;
	color: #fff;
}

.user-avatar:not(:has(img)):not(:has(svg)) {
	background-color: #55585b;
	color: #fff;
	width: 50px;
	height: 50px;
}

.user-avatar {
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80px;
	height: 80px;
	font-size: 20px;
	margin-right: 9px;

	[dir=rtl] & {
		margin-right: inherit;
		margin-left: 9px;
	}
}

.user-avatar:is(.sm-size) {
	width: 38px;
	height: 38px;
}

.user-avatar img {
	border-radius: 50%;
	width: 100%;
	height: 100%;
}

.profile__main-thumb-edit {
	& input {
		display: none;
	}

	& label {
		position: absolute;
		bottom: 8px;
		right: 8px;
		color: var(--tp-common-white);
		width: 26px;
		height: 26px;
		line-height: 24px;
		border: 1px solid var(--tp-common-white);
		text-align: center;
		background-color: var(--tp-theme-primary);
		border-radius: 50%;
		-webkit-transition: all .3s 0s ease-out;
		-moz-transition: all .3s 0s ease-out;
		-ms-transition: all .3s 0s ease-out;
		-o-transition: all .3s 0s ease-out;
		transition: all .3s 0s ease-out;

		[dir=rtl] & {
			right: 0;
			left: 8px;
		}

		& i {
			//margin-left: 2px;
			//
			//[dir=rtl] & {
			//    margin-right: 2px;
			//    margin-left: auto;
			//}
		}

		&:hover {
			cursor: pointer;
			color: var(--tp-common-white);
			background-color: var(--tp-common-black);
		}
	}
}
</style>
