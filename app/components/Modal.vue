<script setup lang="ts">
const model = defineModel<ListItem>();

const { upsertListItem } = useUpsertListItem();
const { debouncedSearch } = useListItems();

const textEl = useTemplateRef<HTMLInputElement>("textEl");

const tags = computed(() => {
  if (!model.value) return [];
  return model.value.tags.split(",").filter((r) => r);
});

const addTag = () => {
  if (!model.value) return;

  const value = prompt("Add a tag");
  if (!value) return;

  model.value.tags = [...tags.value, value].join(",");
};

const removeTag = (index: number) => {
  if (!model.value) return;
  model.value.tags = tags.value.filter((_, i) => i !== index).join(",");
};

const insertAtCursor = (char: string) => {
  if (!textEl.value || !model.value) return;

  // Focus the input first to ensure selection works on iOS
  textEl.value.focus();

  // Use requestAnimationFrame to ensure focus is complete
  requestAnimationFrame(() => {
    if (!textEl.value || !model.value) return;

    const start = textEl.value.selectionStart || textEl.value.value.length;
    const end = textEl.value.selectionEnd || textEl.value.value.length;

    model.value.text =
      model.value.text.slice(0, start) + char + model.value.text.slice(end);

    // Use requestAnimationFrame again to ensure model update is complete
    requestAnimationFrame(() => {
      if (!textEl.value) return;
      const newPosition = start + char.length;
      textEl.value.setSelectionRange(newPosition, newPosition);
      textEl.value.focus();
    });
  });
};

const submit = async () => {
  if (!model.value) return;

  await upsertListItem(model.value);
  debouncedSearch.value = model.value.text;
};
</script>

<template>
  <slot />
  <dialog id="modal" class="modal modal-bottom sm:modal-middle">
    <form
      v-if="model"
      method="dialog"
      class="modal-box flex flex-col gap-3"
      @submit="submit"
    >
      <div class="flex flex-col gap-2">
        <label class="input input-xl w-full">
          <input
            ref="textEl"
            v-model.trim="model.text"
            class="grow"
            type="text"
            placeholder="一言"
            required
          />
          <kbd class="kbd kbd-xl" @click="insertAtCursor('〜')">〜</kbd>
          <kbd class="kbd kbd-xl" @click="insertAtCursor('・')">・</kbd>
        </label>
        <input
          v-model.trim="model.meaning"
          class="input input-lg w-full"
          type="text"
          placeholder="Значение"
          required
        />
        <textarea
          v-model.trim="model.sentences"
          class="textarea textarea-lg w-full"
          rows="3"
          placeholder="例文"
        />
        <textarea
          v-model.trim="model.translations"
          class="textarea textarea-lg w-full"
          rows="3"
          placeholder="例文の意味"
        />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div
          v-if="model.meaning"
          class="badge badge-outline badge-primary h-auto uppercase"
        >
          {{ model.meaning }}
        </div>
        <template v-if="model.tags">
          <div
            v-for="(tag, index) in tags"
            :key="tag"
            class="badge badge-outline h-auto uppercase"
            @click="removeTag(index)"
          >
            {{ tag }}
          </div>
        </template>
        <div class="btn btn-sm btn-ghost btn-circle">
          <IconAdd02 class="size-6" @click="addTag" />
        </div>
      </div>

      <button class="btn w-full">✏️</button>
    </form>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
