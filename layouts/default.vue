<script setup lang="ts">
const { deck } = useDeck();
const { isLoading, isReady, progress } = useRunBatch();
</script>

<template>
  <div class="bg-base-200 overflow-hidden">
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
    <div class="p-5 min-h-screen flex flex-col justify-center items-center">
      <div class="max-w-2xl w-full">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
