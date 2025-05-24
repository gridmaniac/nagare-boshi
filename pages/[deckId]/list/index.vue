<script setup lang="ts">
const { params, query } = useRoute();
const { listItems, debouncedSearch, isLoading } = useListItems();
const { deckId, error } = useDeck();
const { deleteListItemById } = useDeleteListItem();

deckId.value = String(params.deckId);
debouncedSearch.value = (query.search as string) || "";

const emptyListItem = {
  deckId: deckId.value,
  text: "",
  meaning: "",
  tags: "",
  sentences: "",
  translations: "",
  reviewNum: 0,
};

const activeListItem = ref<ListItem>({ ...emptyListItem });

const setListItem = (listItem?: ListItem) => {
  if (listItem) {
    activeListItem.value = { ...listItem };
    return;
  }

  activeListItem.value = { ...emptyListItem };
};

const deleteListItem = async (listItem: ListItem) => {
  if (!listItem._id) return;
  if (!confirm("Are you sure you want to delete this item?")) return;
  await deleteListItemById(listItem._id);
};

const getListItem = async () => {
  const listItem = await $fetch<ListItem>("/api/list/list-item", {
    query: { deckId: deckId.value },
  });

  debouncedSearch.value = listItem.text;
};

watch(error, () => {
  localStorage.removeItem("deckId");
  navigateTo("/");
});

definePageMeta({
  pageTransition: false,
});
</script>

<template>
  <div>
    <ul class="card card-xl list bg-base-100/70 shadow-xl backdrop-blur-sm">
      <li class="p-4 opacity-60 flex gap-2">
        <label class="input input-ghost w-full">
          <input
            class="grow"
            v-model.trim="debouncedSearch"
            type="search"
            placeholder="Type here"
          />
          <kbd
            v-if="debouncedSearch"
            class="kbd sm:hidden"
            @click="debouncedSearch = ''"
            >×</kbd
          >
        </label>
        <Modal v-model="activeListItem">
          <button
            class="btn btn-circle btn-ghost"
            onclick="modal.showModal()"
            @click="setListItem()"
          >
            <IconAdd02 class="size-6" />
          </button>
        </Modal>
      </li>

      <div class="max-h-[400px] overflow-y-auto overflow-x-hidden">
        <div v-if="isLoading" class="flex flex-col gap-2 p-2">
          <div class="skeleton h-20 w-full"></div>
          <div class="skeleton h-20 w-full"></div>
        </div>
        <li
          v-else
          v-for="listItem in listItems"
          :key="listItem._id"
          class="list-row"
        >
          <div class="flex flex-col gap-2 items-start">
            <div class="flex gap-2 items-center">
              <div class="dropdown dropdown-right">
                <button tabindex="0" class="status status-xl cursor-pointer" />
                <ul
                  class="dropdown-content menu menu-xl bg-base-100 rounded-box z-1 p-2 shadow-sm"
                >
                  <li>
                    <button
                      onclick="modal.showModal()"
                      @click="setListItem(listItem)"
                    >
                      ✏️
                    </button>
                  </li>
                  <li>
                    <button @click="deleteListItem(listItem)">🪣</button>
                  </li>
                </ul>
              </div>

              <div class="text-2xl text-neutral-100">{{ listItem.text }}</div>
            </div>

            <div
              v-for="(sentence, index) in listItem.sentences?.split('。')"
              :key="index"
            >
              <template v-if="!!sentence">
                <Sentence :sentence="sentence" />
                <div>{{ listItem.translations?.split(".")[index] }}.</div>
              </template>
            </div>

            <div class="flex gap-2 flex-wrap">
              <div class="badge badge-outline badge-primary uppercase">
                {{ listItem.meaning }}
              </div>
              <div
                v-for="tag in listItem.tags.split(',').filter((r) => r)"
                class="badge badge-outline uppercase"
                @click="debouncedSearch = tag"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <button
      class="btn btn-xl btn-circle bg-base-300 fixed bottom-20 right-[calc(50%-1.75rem)]"
      @click="getListItem"
    >
      💠
    </button>
  </div>
</template>
