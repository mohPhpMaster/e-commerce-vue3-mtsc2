<template>
  <div>
    <h1>Logging in...</h1>
  </div>
</template>

<script lang="ts" setup>
import formDataService from "@/services/formDataService";
import toolsService from "@/services/toolsService";

const route = useRoute()

async function handleCallback() {
  const provider = route.params.provider
  const token = route.hash?.split('=')[1]?.split('&')[0]

  if (token) {
    try {

      const response = await $axios.post(toolsService.getApiUrl() + `/auth/${provider}/callback`, formDataService({
        token
      }))

      const user = response.data.user // Handle response and user data
      console.log('User logged in:', user, response.data)

      // Store user info (e.g., in Pinia) and redirect to home page
    } catch (error) {
      console.error('OAuth callback error:', error)
    }
  } else {
    console.error('No token found in URL')
  }
}

handleCallback()
</script>