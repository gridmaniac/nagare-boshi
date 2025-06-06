<script setup lang="ts">
const isEditing = ref(true);
const text = ref("");
const editableEl = useTemplateRef<HTMLDivElement>("editableEl");

const toggleMode = () => {
  isEditing.value = !isEditing.value;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLDivElement;
  text.value = target.innerText;
};

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const plainText = event.clipboardData?.getData("text/plain") || "";
  document.execCommand("insertText", false, plainText);
};

onMounted(() => {
  if (editableEl.value) {
    editableEl.value.innerText = text.value;
  }
});

watch(isEditing, () => {
  nextTick(() => {
    if (isEditing.value && editableEl.value) {
      editableEl.value.innerText = text.value;
    }
  });
});
</script>

<template>
  <dialog id="reader" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-none sm:max-w-[800px] overflow-x-hidden">
      <div class="min-h-[200px] relative flex flex-col gap-4">
        <div class="flex items-center justify-end gap-2 mb-2">
          <span class="text-sm opacity-60">Read Mode</span>
          <input
            type="checkbox"
            class="toggle toggle-primary toggle-lg"
            :checked="!isEditing"
            @change="toggleMode"
          />
        </div>

        <div
          v-if="isEditing"
          ref="editableEl"
          class="outline-none text-xl font-semibold"
          contenteditable
          @input="handleInput"
          @paste="handlePaste"
          v-text="text"
        ></div>

        <Sentence v-else :sentence="text" />
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
</style>
