<template>
  <UiLoader v-if="loadingStore.isLoading"/>
  <main v-else>

	  <LayoutsMainNavbar />
	  <section class="min-h-85vh bg-white dark:bg-black">
		<slot />
	  </section>
  </main>
</template>

<script setup lang="ts">
import { useLoadingStore } from "~/store/loading.store";
import { useAuthStore } from "#imports";
import { ACCOUNT } from "~/libs/appwrite";

const authStore = useAuthStore()
const loadingStore = useLoadingStore()

onMounted(() => {
  ACCOUNT.get()
		.then(response =>
			authStore.set({
				email: response.email,
				id: response.$id,
				name: response.name,
				status: response.status,
			})
		)
		.finally(() => loadingStore.set(false))
})

</script>