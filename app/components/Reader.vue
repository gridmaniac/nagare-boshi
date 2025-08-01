<script setup lang="ts">
const isEditing = ref(true);
const text = ref("");
const textareaEl = useTemplateRef<HTMLTextAreaElement>("textareaEl");

const toggleMode = () => {
  isEditing.value = !isEditing.value;
};

const clearText = () => {
  text.value = "";
  isEditing.value = true;
};

const adjustHeight = () => {
  if (!textareaEl.value) return;
  textareaEl.value.style.height = "auto";
  textareaEl.value.style.height = `${textareaEl.value.scrollHeight}px`;
};

watch(() => text.value, adjustHeight, { immediate: true });
watch(
  () => isEditing.value,
  (newValue) => {
    if (newValue) {
      nextTick(adjustHeight);
    }
  },
);

onMounted(() => {
  adjustHeight();
  window.addEventListener("resize", adjustHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", adjustHeight);
});
</script>

<template>
  <dialog id="reader" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-none overflow-x-hidden sm:max-w-[800px]">
      <div class="relative flex min-h-[200px] flex-col gap-4">
        <div class="mb-2 flex items-center justify-between gap-2">
          <button
            v-if="text"
            class="btn btn-ghost text-error"
            @click="clearText"
          >
            Clear
          </button>
          <div v-else class="flex-1" />
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-60">Read Mode</span>
            <input
              type="checkbox"
              class="toggle toggle-primary toggle-lg"
              :checked="!isEditing"
              @change="toggleMode"
            />
          </div>
        </div>

        <textarea
          v-if="isEditing"
          ref="textareaEl"
          v-model.trim="text"
          class="min-h-[200px] w-full resize-none overflow-hidden bg-transparent text-xl font-semibold outline-none placeholder:opacity-40"
          placeholder="Paste or type Japanese text here..."
          rows="1"
        />

        <Sentence v-else class="min-h-[200px]" :sentence="text" break-line />
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
