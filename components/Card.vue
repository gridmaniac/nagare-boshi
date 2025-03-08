<script setup lang="ts">
const props = defineProps<{ card: Card }>();

const { tokens, sentence } = useSentence();
const { refetch: refetchStats } = useStats();
const { deckCard } = useDeckCard();

const hasTranslationsBlur = ref(true);
const hasExamplesBlur = ref(true);

const textEl = ref<HTMLElement | null>(null);
const sentenceEl = ref<HTMLElement | null>(null);

const selectedTokenIndex = ref(-1);
const isTextSelected = ref(false);

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

onClickOutside(sentenceEl, () => {
  selectedTokenIndex.value = -1;
  isTextSelected.value = false;
});
</script>

<template>
  <div
    class="card bg-base-100 card-xl shadow-xl max-h-[400px] overflow-y-auto overflow-x-hidden"
  >
    <label
      for="my-drawer"
      class="drawer-button cursor-pointer absolute right-5 top-5 inline-grid *:[grid-area:1/1]"
      @click="refetchStats()"
    >
      <div
        v-if="deckCard && deckCard.box > 0"
        class="status status-accent status-xl animate-ping cursor-pointer"
      ></div>
      <div class="status status-xl"></div>
    </label>

    <div class="card-body flex flex-col gap-5">
      <h2 class="card-title text-5xl flex flex-col items-start gap-3">
        <div class="relative flex items-center justify-center">
          <div
            ref="textEl"
            class="tooltip tooltip-top"
            :class="{
              'tooltip-open': isTextSelected,
            }"
            :data-tip="card.kana"
            @touchstart="isTextSelected = true"
          >
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
        <p ref="sentenceEl" class="text-3xl">
          <span
            v-for="(token, index) in tokens"
            :key="token.text"
            :class="{
              'hover:text-primary': token.hasMatch,
              'text-primary': index === selectedTokenIndex,
              'text-accent': token.text === card.text,
            }"
          >
            <div
              v-if="token.hasMatch"
              class="tooltip tooltip-top"
              :class="{
                'tooltip-open': index === selectedTokenIndex,
              }"
              @touchstart="selectedTokenIndex = index"
            >
              <div class="flex flex-col tooltip-content">
                <span>{{ token.kana }}</span>
                <span>{{ token.gloss?.substring(0, 24) }}</span>
              </div>
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
