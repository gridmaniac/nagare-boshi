<script setup lang="ts">
const { deck } = useDeck();
const { isLoading, progress } = useRunBatch();

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
});
</script>

<template>
  <div class="bg-base-200 overflow-hidden">
    <NuxtPwaManifest />
    <div
      v-if="isLoading"
      class="radial-progress absolute bottom-5 right-5"
      :style="{ '--value': progress }"
      :aria-valuenow="progress"
      role="progressbar"
    >
      {{ progress }}%
    </div>

    <Menu v-if="deck" class="fixed top-5 left-5" />
    <ThemeController class="fixed top-5 right-5" />
    <ShootingStars />
    <Stats />
    <div class="p-5 min-h-screen flex flex-col justify-center items-center">
      <div class="max-w-2xl w-full">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
