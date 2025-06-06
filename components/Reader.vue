<script setup lang="ts">
const isEditing = ref(true);
const text = ref("");
const editableEl = useTemplateRef<HTMLDivElement>("editableEl");

const toggleMode = () => {
  isEditing.value = !isEditing.value;
};

const clearText = () => {
  text.value = "";
  if (editableEl.value) {
    editableEl.value.innerText = "";
  }
  // Switch back to edit mode after clearing
  isEditing.value = true;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLDivElement;
  text.value = cleanText(target.innerText);

  // Re-apply cleaned text to prevent visual artifacts
  nextTick(() => {
    if (editableEl.value && editableEl.value.innerText !== text.value) {
      editableEl.value.innerText = text.value;
    }
  });
};

const cleanText = (text: string) => {
  return text.replace(/\n{3,}/g, "\n\n").trim();
};

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const plainText = event.clipboardData?.getData("text/plain") || "";
  const cleanedText = cleanText(plainText);
  document.execCommand("insertText", false, cleanedText);
};

onMounted(() => {
  if (editableEl.value) {
    editableEl.value.innerText = cleanText(text.value);
  }
});

watch(isEditing, () => {
  nextTick(() => {
    if (isEditing.value && editableEl.value) {
      editableEl.value.innerText = cleanText(text.value);
    }
  });
});
</script>

<template>
  <dialog id="reader" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-none sm:max-w-[800px] overflow-x-hidden">
      <div class="min-h-[200px] relative flex flex-col gap-4">
        <div class="flex items-center justify-between gap-2 mb-2">
          <button
            v-if="text"
            class="btn btn-ghost text-error"
            @click="clearText"
          >
            Clear
          </button>
          <div v-else class="flex-1"></div>
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

        <div
          v-if="isEditing"
          ref="editableEl"
          class="min-h-[200px] outline-none text-xl font-semibold"
          contenteditable
          data-placeholder="Paste or type Japanese text here..."
          @input="handleInput"
          @paste="handlePaste"
          v-text="text"
        ></div>

        <Sentence class="min-h-[200px]" v-else :sentence="text" />
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>
[contenteditable] {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

[contenteditable]:empty::before {
  content: attr(data-placeholder);
  opacity: 0.4;
  pointer-events: none;
}
</style>
