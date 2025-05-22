<script setup lang="ts">
const model = defineModel<ListItem>();

const { upsertListItem } = useUpsertListItem();
const { debouncedSearch } = useListItems();

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

const submit = async () => {
  if (!model.value) return;

  await upsertListItem(model.value);
  debouncedSearch.value = model.value.text;
};
</script>

<template>
  <slot />
  <dialog id="modal" class="modal">
    <form
      v-if="model"
      method="dialog"
      class="modal-box flex flex-col gap-3"
      @submit="submit"
    >
      <div class="flex flex-col gap-2">
        <label class="input input-xl w-full">
          <input
            class="grow"
            v-model.trim="model.text"
            type="text"
            placeholder="一言"
            required
          />
          <kbd class="kbd kbd-xl" @click="model.text += '〜'">〜</kbd>
          <kbd class="kbd kbd-xl" @click="model.text += '・'">・</kbd>
        </label>
        <input
          class="input input-lg w-full"
          v-model.trim="model.meaning"
          type="text"
          placeholder="Значение"
          required
        />

        <textarea
          class="textarea textarea-lg w-full"
          v-model.trim="model.sentences"
          rows="3"
          placeholder="例文"
        ></textarea>
        <textarea
          class="textarea textarea-lg w-full"
          v-model.trim="model.translations"
          rows="3"
          placeholder="例文の意味"
        ></textarea>
      </div>

      <div class="flex gap-2 items-center flex-wrap">
        <div
          v-if="model.meaning"
          class="badge badge-outline badge-primary uppercase"
        >
          {{ model.meaning }}
        </div>
        <div
          v-if="model.tags"
          v-for="(tag, index) in tags"
          class="badge badge-outline uppercase"
          @click="removeTag(index)"
        >
          {{ tag }}
        </div>
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
