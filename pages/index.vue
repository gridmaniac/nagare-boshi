<script setup lang="ts">
const { createDeck, isLoading } = useCreateDeck();
const { runBatch, isReady } = useRunBatch();
const { deck, deckId } = useDeck();
const fileInput = ref<HTMLInputElement | null>(null);

const updateWithFile = () => {
  fileInput.value?.click();
};

const { onFileUpload } = useFileUpload((content) => {
  uploadFile(content);
});

const uploadFile = async (content: string) => {
  const batch = useImiwaBatch(content);
  if (!batch) return;

  isReady.value = false;
  const newDeckId = await createDeck();

  await runBatch({
    deckId: newDeckId,
    ...batch,
  });

  deckId.value = newDeckId;
};

watch([deck, isReady], () => {
  if (isReady.value && deck.value) {
    localStorage.setItem("deckId", deckId.value);
    navigateTo(`/${deckId.value}`);
  }
});

onMounted(() => {
  const deckId = localStorage.getItem("deckId");
  if (deckId) {
    navigateTo(`/${deckId}`);
  }
});
</script>

<template>
  <div class="flex flex-col items-center text-center gap-5">
    <div class="max-w-md">
      <h1 class="text-8xl font-bold">
        <div class="tooltip tooltip-top tooltip-open" data-tip="なが">流</div>
        れ
        <div class="tooltip tooltip-top tooltip-open" data-tip="ぼし">星</div>
      </h1>
      <p class="p-6 flex items-center gap-2 flex-wrap">
        Leverage
        <a
          class="badge badge-error badge-outline"
          target="_blank"
          href="https://imiwaapp.com"
        >
          Imiwa?</a
        >
        backup to study <strong>SRS</strong> flashcards.
      </p>
    </div>
    <progress v-if="isLoading || !isReady" class="progress w-56"></progress>
    <section
      class="w-full max-w-xs flex flex-col sm:items-center items-end"
      v-else
    >
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        accept=".imiwa"
        @change="onFileUpload"
        hidden
      />
      <button class="btn btn-neutral btn-sm" @click="updateWithFile">
        <IconFileSync class="size-4" />
        Upload .imiwa file
      </button>
      <div class="divider">or</div>
      <input
        v-model="deckId"
        type="text"
        placeholder="Paste your code"
        class="input text-center"
      />
    </section>
  </div>
</template>
