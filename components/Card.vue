<script setup lang="ts">
const props = defineProps<{ card: Card }>();

const { tokens, sentence } = useSentence();

const hasTranslationsBlur = ref(true);
const hasExamplesBlur = ref(true);

const example = computed(() => {
  const randomExample =
    props.card.examples[Math.floor(Math.random() * props.card.examples.length)];

  sentence.value = randomExample?.sentence;
  return {
    sentence: randomExample?.sentence,
    translation: randomExample?.translation,
  };
});

const clearBlur = () => {
  hasTranslationsBlur.value = false;
  hasExamplesBlur.value = false;
};

onKeyStroke(" ", clearBlur);
</script>

<template>
  <div
    class="card bg-base-100 card-xl shadow-xl max-h-[400px] overflow-y-auto overflow-x-hidden"
  >
    <div class="absolute right-5 top-5 inline-grid *:[grid-area:1/1]">
      <div class="status status-accent status-xl animate-ping"></div>
      <div class="status status-xl"></div>
    </div>
    <div class="card-body flex flex-col gap-5">
      <h2 class="card-title text-5xl flex flex-col items-start gap-3">
        <div class="relative flex items-center justify-center">
          <div class="tooltip tooltip-top" :data-tip="card.kana">
            <span>{{ card.text || card.kana }}</span>
          </div>
        </div>
        <div class="overflow-x-auto w-full no-scrollbar">
          <div
            class="flex gap-2 transition-all duration-300 ease-in-out w-max"
            :class="{
              'blur-sm': hasTranslationsBlur,
            }"
            @click="clearBlur"
          >
            <kbd v-for="word in card.gloss" class="kbd kbd-xl">{{ word }}</kbd>
          </div>
        </div>
      </h2>

      <section class="flex flex-col gap-2">
        <p class="text-3xl">
          <span
            v-for="token in tokens"
            :key="token.text"
            :class="{
              'hover:text-primary': token.hasMatch,
              'text-accent': token.text === card.text,
            }"
          >
            <div
              v-if="token.hasMatch"
              class="tooltip tooltip-top"
              :data-tip="token.kana + ' / ' + token.gloss"
            >
              {{ token.text }}
            </div>
            <span v-else>{{ token.text }}</span>
          </span>
        </p>
        <p
          class="text-1xl transition-all duration-300 ease-in-out italic text-right"
          :class="{ 'blur-sm': hasExamplesBlur }"
          @click="clearBlur"
        >
          {{ example.translation }}
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
