<script setup lang="ts">
const { deckId } = useDeck();
const { isLoading, progress, newCount } = useRunBatch();
const route = useRoute();

const toast = ref(false);
watch(newCount, () => {
  toast.value = true;

  setTimeout(() => {
    toast.value = false;
  }, 2000);
});

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
      src: "https://cdn.jsdelivr.net/npm/ios-pwa-splash@1.0.0/cdn.min.js",
      onload: "iosPWASplash('icons/icon-192x192.png', '#120b3d')",
    },
  ],
});
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
        class="fixed top-safe-6 right-3"
        :to="`/${deckId}/list`"
      >
        <IconMore class="btn" />
      </NuxtLink>

      <NuxtLink v-else class="fixed top-safe-6 right-3" :to="`/${deckId}`">
        <IconCancel02 class="btn" />
      </NuxtLink>
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
  </div>
</template>

<style scoped>
.top-safe-5 {
  top: calc(env(safe-area-inset-top) + 1.25rem);
}

.top-safe-6 {
  top: calc(env(safe-area-inset-top) + 1.5rem);
}
</style>
