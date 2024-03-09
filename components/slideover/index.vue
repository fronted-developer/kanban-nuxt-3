<template>
   <USlideover v-model="isLocalOpen">
      <UCard class="flex flex-col flex-1 overflow-y-auto rounded-nonezz"
      :ui="{
        body: {base: 'flex-1'},
        ring: '',
        devide: 'devide-y devide-border'
      }"
      >
      <template #header> 
        

          <SlideoverTop/>
      
      </template>
      <SlideoverComment/>
      </UCard>
    </USlideover>
</template>

<script setup lang="ts">
import { useCurrentDealStore, } from '../../store/current-deal-store';


const store = useCurrentDealStore()


const isLocalOpen = computed({
   
    get: () => store.isOpen,
    set: value => (store.isOpen = value)

    
})

</script>

<style>

</style>