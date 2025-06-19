<script setup lang="ts">
const { params, query } = useRoute();
const router = useRouter();
const {
  listItems,
  debouncedSearch,
  page,
  hasNextPage,
  total,
  refetch,
  isPending,
} = useListItems();

const { deckId, error } = useDeck();
const { deleteListItemById } = useDeleteListItem();

deckId.value = String(params.deckId);
debouncedSearch.value = (query.search as string) || "";

let timeout: NodeJS.Timeout;
const isCooldown = ref(false);
const bottomEl = useTemplateRef("bottom");
const listEl = useTemplateRef("list");

useIntersectionObserver(bottomEl, ([entry]) => {
  if (
    !entry?.isIntersecting ||
    !listItems.value?.length ||
    !hasNextPage.value ||
    isPending.value
  )
    return;

  page.value++;
  refetch();

  listEl.value?.scrollTo({ top: listEl.value?.scrollHeight });
});

watch(debouncedSearch, () => {
  page.value = 1;
  listEl.value?.scrollTo({ top: 0 });

  // Update URL query parameter
  router.replace({
    query: {
      ...query,
      search: debouncedSearch.value || undefined,
    },
  });
});

const emptyListItem = {
  deckId: deckId.value,
  text: "",
  meaning: "",
  tags: "",
  sentences: "",
  translations: "",
  reviewNum: 0,
  updatedAt: new Date(),
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
  if (isCooldown.value) return;
  isCooldown.value = true;

  const listItem = await $fetch<ListItem>("/api/list/list-item", {
    query: { deckId: deckId.value },
  });

  debouncedSearch.value = listItem.text;

  timeout = setTimeout(async () => {
    isCooldown.value = false;
  }, 3000);
};

watch(error, () => {
  localStorage.removeItem("deckId");
  navigateTo("/");
});

onUnmounted(() => {
  clearTimeout(timeout);
});

definePageMeta({
  pageTransition: false,
});
</script>

<template>
  <div>
    <ul class="card card-xl list bg-base-100/70 shadow-xl backdrop-blur-sm">
      <li class="flex gap-2 p-4 opacity-60">
        <label class="input input-ghost w-full">
          <input
            class="grow"
            v-model.trim="debouncedSearch"
            placeholder="Type here"
          />
          <span v-if="total" class="text-xs">{{ total }}</span>
          <kbd v-if="debouncedSearch" class="kbd" @click="debouncedSearch = ''"
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

      <div ref="list" class="max-h-[400px] overflow-x-hidden overflow-y-auto">
        <div v-if="isPending" class="flex flex-col gap-2 p-2">
          <div class="skeleton h-20 w-full"></div>
          <div class="skeleton h-20 w-full"></div>
        </div>
        <li
          v-else
          v-for="listItem in listItems"
          :key="listItem._id"
          class="list-row"
        >
          <div class="flex flex-col items-start gap-2">
            <div class="flex items-center gap-2">
              <div class="dropdown dropdown-right">
                <button tabindex="0" class="status status-xl cursor-pointer" />
                <ul
                  class="dropdown-content menu menu-xl menu-horizontal bg-base-100 rounded-box z-1 flex-nowrap p-2 shadow-sm"
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

              <div
                class="text-2xl text-neutral-100"
                @click="copyToClipboard(listItem.text)"
              >
                {{ listItem.text }}
              </div>
            </div>

            <div
              v-for="(sentence, index) in listItem.sentences?.split('。')"
              :key="index"
            >
              <template v-if="!!sentence">
                <Sentence :sentence="sentence" dot />
                <div v-if="listItem.translations?.split('.')[index]">
                  {{ listItem.translations?.split(".")[index] }}.
                </div>
              </template>
            </div>

            <div class="flex flex-wrap gap-2">
              <div class="badge badge-outline badge-primary h-auto uppercase">
                {{ listItem.meaning }}
              </div>
              <div
                v-for="tag in listItem.tags.split(',').filter((r) => r)"
                class="badge badge-outline h-auto uppercase"
                @click="debouncedSearch = tag"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </li>
        <li v-if="hasNextPage" ref="bottom" class="flex justify-center py-6">
          <progress class="progress w-20"></progress>
        </li>
      </div>
    </ul>
    <button
      class="btn btn-xl btn-circle bg-base-300 active:bg-base-100 fixed right-[calc(50%-1.75rem)] bottom-20"
      @click="getListItem"
    >
      <IconHourGlass v-if="isCooldown" class="size-6 animate-spin" />
      <IconBrain class="size-8" v-else />
    </button>
  </div>
</template>
