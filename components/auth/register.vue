
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { ACCOUNT, UNIQUE_ID } from "~/libs/appwrite";

const isLoading = ref(false)
let errorMessage = ref('')
const toast = useToast()
const router = useRouter()

const props = defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});


const state = ref({
  name: undefined,
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Name is required" });
  if (!state.email)
    errors.push({ path: "email", message: "Email is required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true
  const { name, email, password } = event.data;

  try {
    await ACCOUNT.create(UNIQUE_ID, email, password, name);
    props.toggleLogin();
    isLoading.value = false
    toast.add({
			title: 'Account created',
			description: 'You can now login with your new account',
		})
    
    
    router.push('/')

  } catch (error: any) {
    errorMessage.value = error.message
    isLoading.value = false
  }
}
</script>

<template>
  <UAlert
		icon="i-heroicons-command-line"
		:description="errorMessage"
		title="Error"
		v-if="errorMessage"
		color="red"
		variant="outline"
	/>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" color="blue" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" color="blue" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" color="blue" />
    </UFormGroup>

    <UButton
			type="submit"
			color="blue"
			class="w-full"
			block
			size="lg"
			:disabled="isLoading"
		>
			<template v-if="isLoading">
				<Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
			</template>
			<template v-else>Next</template>
		</UButton>
  </UForm>

  <div class="text-sm text-neutral-500">
			Already have an account?
			<span
				class="text-blue-500 hover:underline"
				role="button"
				@click="$props.toggleLogin"
			>
				Sign in
			</span>
		</div>

</template>

