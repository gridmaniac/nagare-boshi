<script setup lang="ts">
const { deckId } = useDeck();
const { refetch: refetchDeckCard } = useDeckCard();
const { runBatch, stopBatch, isLoading, isReady } = useRunBatch();
const fileInput = ref<HTMLInputElement | null>(null);

const goHome = () => {
  const isConfirm = confirm("Did you backup your code?");
  if (!isConfirm) return;

  deckId.value = "";
  localStorage.removeItem("deckId");

  stopBatch();
  navigateTo("/");
};

const updateWithFile = () => {
  fileInput.value?.click();
};

const { onFileUpload } = useFileUpload((content) => {
  uploadFile(content);
});

const uploadFile = async (content: string) => {
  const batch = useImiwaBatch(content);
  if (!batch) return;

  runBatch({
    deckId: deckId.value,
    ...batch,
  });
};

const copyCode = () => {
  navigator.clipboard.writeText(deckId.value);
  alert("Copied to clipboard");
};

watch(isReady, () => {
  if (isReady.value) {
    refetchDeckCard();
  }
});
</script>

<template>
  <ul class="menu menu-horizontal sm:menu-vertical bg-base-300 rounded-box">
    <li v-if="!isLoading">
      <NuxtLink class="tooltip tooltip-right" data-tip="Home" @click="goHome">
        <IconHome09 class="size-6" />
      </NuxtLink>
    </li>
    <li v-if="!isLoading">
      <NuxtLink
        class="tooltip tooltip-right"
        data-tip="Update with .imiwa file"
        @click="updateWithFile"
      >
        <IconFileSync class="size-6" />
      </NuxtLink>
      <input
        ref="fileInput"
        type="file"
        accept=".imiwa"
        @change="onFileUpload"
        hidden
      />
    </li>
    <li>
      <NuxtLink
        class="tooltip tooltip-right"
        data-tip="Copy code"
        @click="copyCode"
      >
        <IconClipboard class="size-6" />
      </NuxtLink>
    </li>
  </ul>
</template>
