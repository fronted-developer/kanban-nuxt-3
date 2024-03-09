
<template>
  <div class="flex items-center justify-center h-screen relative w-full">
    <NuxtImg
      src="/bg-auth.jpg"
      class="absolute inset-0 h-full w-full object-cover z-10"
    />
    <div class="absolute w-full h-full z-20 bg-white/40 dark:bg-black/20"></div>
    
      <UCard class="z-50 w-1/2 relative" :ui="{ body: { base: 'flex gap-4' } }">
        <div class="space-y-4 flex-1">
				<h1 class="text-2xl font-bold">
					<template v-if="isLogin">Login</template>
					<template v-else>Register</template>
				</h1>
				<p class="opacity-70">
					<template v-if="isLogin"
						>Please use the following credentials to login</template
					>
					<template v-else>
						Please use the following credentials to register
					</template>
				</p>

        <AuthLogin v-if="isLogin" :toggleLogin="toggleLogin"/>
        <AuthRegister v-else :toggleLogin="toggleLogin"/>

			</div>
        <UDivider label="or" orientation="vertical" class="w-fit" />
        <div class="space-y-4 flex-1 flex flex-col justify-center">
            <UButton color="black" block size="lg" @click="onGithub">
                <Icon name="grommet-icons:github"/>
                <h1 class="text-center">Login with GitHub</h1>
            </UButton>
            <UButton color="black" block size="lg" @click="onGoogle">
                <Icon name="ri:google-fill"/>
                <h1 class="text-center">Login with Google</h1>
            </UButton>
        </div>
      </UCard>
  
  </div>
</template>

<script lang="ts" setup>
import type { Body } from "#build/components";
import { ACCOUNT } from "~/libs/appwrite";

definePageMeta({
  layout: "auth",
});

const isLogin = ref(true)
const router = useRouter()


const toggleLogin = () => (isLogin.value = !isLogin.value)


const onGoogle = () =>
	ACCOUNT.createOAuth2Session('google', 'http://localhost:3000')

const onGithub = () =>
	ACCOUNT.createOAuth2Session('github',  'http://localhost:3000')



</script>

<style>
</style>