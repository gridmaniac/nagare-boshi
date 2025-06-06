<script setup lang="ts">
const { deckId } = useDeck();
const { isLoading, progress, newCount } = useRunBatch();
const { ensureReady, isReady } = useDictionary();
const route = useRoute();
const isChallengeVisible = ref(false);

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
  }
);

const showReader = () => {
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
      class="radial-progress absolute bottom-5 right-5"
      :style="{ '--value': progress }"
      :aria-valuenow="progress"
      role="progressbar"
    >
      {{ progress }}%
    </div>

    <template v-if="deckId">
      <Menu class="fixed top-safe-5 left-5" />

      <NuxtLink
        v-if="route.path.indexOf('list') === -1"
        ref="moreEl"
        class="fixed top-safe-6 right-3"
        :to="`/${deckId}/list`"
      >
        <IconMore class="btn" />
      </NuxtLink>

      <NuxtLink v-else class="fixed top-safe-6 right-3" :to="`/${deckId}`">
        <IconCancel02 class="btn" />
      </NuxtLink>

      <button
        v-if="route.path.indexOf('list') === -1"
        class="btn btn-circle btn-lg fixed bottom-safe-5 right-5 shadow-xl"
        @click="showReader"
      >
        <IconTextClear class="w-6 h-6" />
      </button>
    </template>

    <Stats />
    <div class="p-5 min-h-screen flex flex-col justify-center items-center">
      <div class="max-w-2xl w-full">
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
    <Reader />
  </div>
</template>
