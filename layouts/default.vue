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

    <Menu v-if="deckId" class="fixed top-safe-5 left-5" />

    <ChallengeSelector v-if="!route.params.level" class="fixed top-6 right-3" />
    <NuxtLink v-else class="fixed top-6 right-3" to="/">
      <IconCancel02 class="btn" />
    </NuxtLink>

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
</style>
