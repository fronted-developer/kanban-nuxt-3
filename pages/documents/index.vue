<template>
  <div class="grid grid-cols-4 gap-2 mt-12" v-if="isLoading">
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-300" />
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-300" />
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-300" />
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-300" />
    <UiDealsLoader />
    <UiDealsLoader />
    <UiDealsLoader />
    <UiDealsLoader />
  </div>

  <div class="grid grid-cols-4 gap-2 mt-12" v-else>
    <div
      v-for="(item, index) in data"
      :key="index"
      @dragover="handleDragOver"
      @drop="() => handleDrop(item)"
      class="px-1"
      :class="
        isMoving &&
        'border-l-2 border-r-2 border-dotted h-screen dark:border-gray-900'
      "
    >
      <UButton class="w-full h-12" color="blue" variant="outline">
        <div class="flex items-center space-x-2">
          <span class="font-bold">{{ item.name }}</span>
          <span class="text-sm text-neutral-500">{{ item.items.length }}</span>
        </div>
      </UButton>
      <SharedCreateDeals :status="item.id" :refetch="refetch" />

      <div
        class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation"
        role="button"
        v-for="card in item.items"
        :key="card.$id"
        draggable="true"
        @dragstart="() => handleDragStart(card, item)"
        :class="isMoving || isPending ? 'opacity-50' : ''"
      >
        <div class="flex items-center space-x-2" role="button">
          <span class="font-bold text-lg uppercase">{{ card.name }}</span>
        </div>

        <UDivider class="my-3" />

        <div class="opacity-55 text-sm line-clamp-1">
          <span class="">{{ card.description }}</span>
        </div>

        <UButton color="blue" class="w-full mt-3 group flex items-center" block @click="set(card)">
          <span>More details</span>
          <Icon
            name="bytesize:arrow-right"
            class="group-hover:translate-x-2 transition"
          />
        </UButton>
      </div>
    

    </div>
		<!-- <Slideover /> -->
  <Slideover />

  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { DATABASE } from "~/libs/appwrite";
import { useStatusQuery } from "~/query/use-status-query";
import { useLoadingStore } from "~/store/loading.store";
import { useCurrentDealStore } from "~/store/current-deal-store";
import type { IColumn, IDeal } from "~/types";

definePageMeta({ layout: 'documents' })
useHead({ title: 'Documents | Jira software' })

const { data, isLoading, refetch } = useStatusQuery();
const loadingStore = useLoadingStore();

const { set } = useCurrentDealStore();

const dragCardRef = ref<IDeal | null>(null);

const sourceColumnRef = ref<IColumn | null>(null);

const isMoving = ref(false);

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (column: IColumn) => {
  isMoving.value = false;
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.$id, status: column.id });
  }
};

const handleDragStart = (card: IDeal, column: IColumn) => {
  isMoving.value = true;
  dragCardRef.value = card;
  sourceColumnRef.value = column;
};

const { mutate, isPending } = useMutation({
  mutationKey: ["moveCard"],
  mutationFn: ({ docId, status }: { docId: string; status: string }) =>
    DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
  onSuccess: () => refetch(),
});
</script>

<style scoped>
@keyframes show {
  from {
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 0.3s ease-in-out;
}
</style>