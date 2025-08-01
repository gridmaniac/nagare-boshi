<script setup lang="ts">
const { deckId } = useDeck();
const { isLoading, progress, newCount } = useRunBatch();
const { ensureReady, isReady } = useDictionary();
const route = useRoute();
const isChallengeVisible = ref(false);
const isReaderVisible = ref(false);
const toast = ref(false);
watch(newCount, () => {
  toast.value = true;

  setTimeout(() => {
    toast.value = false;
  }, 2000);
});

const moreEl = useTemplateRef<HTMLElement>("moreEl");
onLongPress(
  moreEl,
  () => {
    isChallengeVisible.value = true;
    nextTick(() => {
      window.challenge.showModal();
    });
  },
  {
    modifiers: {
      prevent: true,
    },
  },
);

const showReader = () => {
  isReaderVisible.value = true;
  nextTick(() => {
    window.reader.showModal();
  });
};

useHead({
  title: "流れ星の学習アプリ",
  meta: [
    {
      name: "description",
      content: "Leverage Imiwa? backup to study SRS flashcards.",
    },
    {
      property: "og:title",
      content: "流れ星の学習アプリ",
    },
    {
      property: "og:description",
      content: "Leverage Imiwa? backup to study SRS flashcards.",
    },
    {
      property: "og:image",
      content: "https://nagare-boshi.vercel.app/icons/icon-512x512.png",
    },
  ],
  script: [
    {
      src: "/scripts/kuromoji.js",
      async: true,
    },
  ],
});

onMounted(ensureReady);
</script>

<template>
  <div class="bg-base-200 overflow-hidden">
    <NuxtPwaManifest />
    <ShootingStars />

    <div
      v-if="isLoading"
      class="radial-progress absolute right-5 bottom-5"
      :style="{ '--value': progress }"
      :aria-valuenow="progress"
      role="progressbar"
    >
      {{ progress }}%
    </div>

    <template v-if="deckId">
      <Menu class="top-safe-5 fixed left-5" />

      <NuxtLink
        v-if="route.path.indexOf('list') === -1"
        ref="moreEl"
        class="top-safe-6 fixed right-3"
        :to="`/${deckId}/list`"
      >
        <IconMore class="btn" />
      </NuxtLink>

      <NuxtLink v-else class="top-safe-6 fixed right-3" :to="`/${deckId}`">
        <IconCancel02 class="btn" />
      </NuxtLink>

      <button
        v-if="route.path.indexOf('list') === -1"
        class="btn btn-circle btn-lg bottom-safe-5 fixed left-5 shadow-xl"
        @click="showReader"
      >
        <IconTextClear class="h-6 w-6" />
      </button>
    </template>

    <Stats />
    <div class="flex min-h-screen flex-col items-center justify-center p-5">
      <div class="w-full max-w-2xl">
        <NuxtPage />
      </div>
    </div>

    <Transition name="slideup">
      <div v-if="toast" class="toast toast-center">
        <div class="alert">
          <span>+ {{ addCommas(newCount) }} new cards</span>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="!isReady" class="toast toast-center">
        <div class="alert">
          <span>loading cache..</span>
        </div>
      </div>
    </Transition>

    <Challenge v-if="isChallengeVisible" />
    <Reader v-if="isReaderVisible" />
  </div>
</template>
