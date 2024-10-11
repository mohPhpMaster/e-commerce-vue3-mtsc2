<template>
  <section class="profile__area pt-120 pb-120">
      <div v-if="userStore?.isLoggedIn() && userStore?.initialized" class="container">
        <div class="profile__inner p-relative">
            <div class="profile__shape">
              <img class="profile__shape-1" src="/images/login/laptop.png" alt="" >
              <img class="profile__shape-2" src="/images/login/man.png" alt="" >
              <img class="profile__shape-3" src="/images/login/shape-1.png" alt="" >
              <img class="profile__shape-4" src="/images/login/shape-2.png" alt="" >
              <img class="profile__shape-5" src="/images/login/shape-3.png" alt="" >
              <img class="profile__shape-6" src="/images/login/shape-4.png" alt="" >
            </div>
            <div class="row">
              <div class="col-xxl-4 col-lg-4">
                  <div class="profile__tab mr-40">
                    <!-- profile nav start -->
                    <profile-nav :loading="loading" @logout="logout" :user="userStore?.user" />
                    <!-- profile nav end -->
                  </div>
              </div>
              <div class="col-xxl-8 col-lg-8">
                  <div class="profile__tab-content">
                    <div class="tab-content" id="profile-tabContent">
				                <div class="tab-pane fade" :class="{ 'active show': ['#profile', '#', ''].includes($route.hash) }" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                          <profile-main :loading="loading" @logout="logout" :user="userStore?.user" />
                        </div>
<!--				                <div class="tab-pane fade" :class="{ 'active show': $route.hash === '#information' }" id="nav-information" role="tabpanel" aria-labelledby="nav-information-tab">-->
<!--                          <profile-info/>-->
<!--                        </div>-->
				                <div class="tab-pane fade" :class="{ 'active show': $route.hash === '#password' }" id="nav-change-password" role="tabpanel" aria-labelledby="nav-change-password-tab">
                          <profile-password/>
                        </div>
				                <div class="tab-pane fade" :class="{ 'active show': $route.hash === '#address' }" id="nav-address" role="tabpanel" aria-labelledby="nav-address-tab">
                          <profile-address/>
                        </div>
				                <div class="tab-pane fade" :class="{ 'active show': $route.hash === '#order' }" id="nav-order" role="tabpanel" aria-labelledby="nav-order-tab">
                          <profile-orders/>
                        </div>
<!--                        <div class="tab-pane fade" id="nav-notification" role="tabpanel" aria-labelledby="nav-notification-tab">-->
<!--                          <profile-notification/>-->
<!--                        </div>-->
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/useUserStore";
import {toast} from "vue3-toastify";

const userStore = useUserStore();
const $router = useRouter();
const {t} = useI18n()
const loading = ref<boolean>(false);

const logout = () => {
	if (loading.value) return;

	loading.value = true;
	userStore
			.logout()
			.then((message) => {
				nextTick(() => toast.success(String(message || t('Logged out successfully'))));

				setTimeout(() => {
					$router.push('/login');
				}, 500);
			})
			.catch((error) => {
				if (error?.response?.data?.message) {
					toast.error(error?.response?.data?.message);
				} else if (error?.message) {
					toast.error(error?.message);
				}

				console.error(error);
			})
			.finally(() => {
				setTimeout(() => {
					loading.value = false;
				}, 100);
			});
}

onMounted(() => {
	if (userStore.initialized && !userStore.isLoggedIn()) {
		logout();
	}
});

</script>
