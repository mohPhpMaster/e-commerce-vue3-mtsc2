<template>
  <div>
    <profile-area />
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/pinia/useUserStore";

const {t} = useI18n();
const {title} = useSiteSettings();
const router = useRouter();
// const auth = useAuth();

// definePageMeta({
//   middleware: 'auth',
// })

useSeoMeta({
  title: t("Profile Page"),
});

useUserStore().needUser();

// const logout = async () => {
//   await auth.logout()
//
//   router.push('/login')
// };

</script>