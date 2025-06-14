<script setup lang="ts">
const props = defineProps<{ card: Card; box: number }>();

const { tokens, sentence } = useTokens();
const { relatedCards } = useRelatedCards();
const { refetch: refetchStats } = useStats();
const { deckCard } = useDeckCard();

const hasTranslationBlur = ref(props.box !== BOX_LIMIT - 1);
const hasSourceBlur = ref(props.box === BOX_LIMIT - 1);

const sentenceEl = useTemplateRef("sentenceEl");

const selectedTokenIndex = ref(-1);
const isTextSelected = ref(false);

const randomExample =
  props.card.examples[Math.floor(Math.random() * props.card.examples.length)];

const example = computed(() => {
  sentence.value = randomExample?.sentence || "";
  return {
    sentence: randomExample?.sentence,
    translation: randomExample?.translation,
  };
});

const clearBlur = () => {
  hasTranslationBlur.value = false;
  hasSourceBlur.value = false;
};

onKeyStroke(" ", clearBlur);

onClickOutside(sentenceEl, () => {
  selectedTokenIndex.value = -1;
  isTextSelected.value = false;
});
</script>

<template>
  <div
    class="select-none card bg-base-100 card-xl shadow-xl max-h-[400px] overflow-y-auto overflow-x-hidden"
  >
    <label
      for="stats"
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
      <div class="card-title text-5xl flex-col items-start gap-3">
        <div class="relative flex items-center justify-center">
          <div
            :class="{
              'tooltip tooltip-top': !hasSourceBlur,
              'blur-sm': hasSourceBlur,
            }"
            :data-tip="card.kana"
            @touchstart="isTextSelected = true"
            @click="
              copyToClipboard(card.text || card.kana), (hasSourceBlur = false)
            "
          >
            <h2>{{ card.text || card.kana }}</h2>
          </div>
        </div>
        <div
          class="overflow-x-auto w-full no-scrollbar"
          :class="{
            'blur-sm': hasTranslationBlur,
          }"
        >
          <div
            class="flex gap-2 transition-all duration-300 ease-in-out w-max"
            @click="hasTranslationBlur = false"
          >
            <kbd
              v-if="deckCard?.note"
              class="kbd kbd-xl border-primary text-primary"
            >
              {{ deckCard?.note }}
            </kbd>
            <kbd
              v-for="word in relatedCards?.list"
              class="kbd kbd-xl border-warning text-warning tooltip tooltip-right cursor-pointer"
              :key="word.text"
              :data-tip="word.kana"
              @click="copyToClipboard(word.text)"
            >
              {{ word.text || word.kana }}
            </kbd>
            <kbd v-for="word in card.gloss" class="kbd kbd-xl">{{ word }}</kbd>
            <kbd
              v-for="synonym in relatedCards?.synonyms"
              class="kbd kbd-xl"
              :key="synonym"
              @click="copyToClipboard(synonym)"
            >
              {{ synonym }}
            </kbd>
          </div>
        </div>
      </div>

      <section class="flex flex-col gap-2">
        <p
          ref="sentenceEl"
          class="text-3xl"
          :class="{ 'blur-sm': hasSourceBlur }"
          @click="hasSourceBlur = false"
        >
          <span v-if="!tokens">{{ sentence }}</span>
          <span
            v-else
            v-for="(token, index) in tokens"
            :key="token.text + index"
            :class="{
              'hover:text-primary': token.hasMatch && !hasSourceBlur,
              'text-primary': index === selectedTokenIndex,
              'text-accent':
                (token.baseForm && token.baseForm === card.text) ||
                token.baseForm === card.kana,
            }"
            @click="copyToClipboard(token.text)"
          >
            <div
              v-if="token.hasMatch"
              class="inline-block underline decoration-dashed underline-offset-6 decoration-2"
              :class="{
                'tooltip tooltip-top cursor-pointer': !hasSourceBlur,
              }"
              @touchstart="selectedTokenIndex = index"
            >
              <div v-if="!hasSourceBlur" class="flex flex-col tooltip-content">
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
          :class="{ 'blur-sm': hasTranslationBlur }"
          @click="hasTranslationBlur = false"
        >
          {{ example.translation }}
        </p>
      </section>
    </div>
  </div>
</template>
