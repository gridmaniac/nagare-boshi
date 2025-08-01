<script setup lang="ts">
const { createDeck, isLoading } = useCreateDeck();
const { runBatch, isReady } = useRunBatch();
const { deck, deckId } = useDeck();
const fileEl = useTemplateRef("fileEl");

const updateWithFile = () => {
  fileEl.value?.click();
};

const { onFileUpload } = useFileUpload((content) => {
  uploadFile(content);
});

const uploadFile = async (content: string) => {
  const batch = useImiwaBatch(content);
  if (!batch) return;

  isReady.value = false;
  deckId.value = await createDeck();

  await runBatch({
    deckId: deckId.value,
    ...batch,
  });
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
  <div class="flex flex-col items-center gap-5 text-center">
    <div class="max-w-md">
      <h1 class="text-8xl font-bold">
        <div class="tooltip tooltip-top tooltip-open" data-tip="なが">流</div>
        れ
        <div class="tooltip tooltip-top tooltip-open" data-tip="ぼし">星</div>
      </h1>
      <p class="flex flex-wrap items-center gap-2 p-6">
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
    <progress v-if="isLoading || !isReady" class="progress w-56" />
    <section
      v-else
      class="flex w-full max-w-xs flex-col items-end sm:items-center"
    >
      <input
        ref="fileEl"
        class="file-input"
        type="file"
        accept=".imiwa"
        hidden
        @change="onFileUpload"
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
