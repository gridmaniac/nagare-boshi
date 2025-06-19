<script setup lang="ts">
const props = defineProps<{ card: Card; box: number }>();

const { tokens, sentence } = useTokens();
const { relatedCards } = useRelatedCards();
const { refetch: refetchStats } = useStats();
const { deckCard } = useDeckCard();

const hasTranslationBlur = ref(props.box !== BOX_LIMIT - 1);
const hasSourceBlur = ref(props.box === BOX_LIMIT - 1);

const sentenceEl = useTemplateRef("sentenceEl");

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
</script>

<template>
  <div
    class="card bg-base-100 card-xl max-h-[400px] overflow-x-hidden overflow-y-auto shadow-xl select-none"
  >
    <label
      for="stats"
      class="drawer-button absolute top-5 right-5 inline-grid cursor-pointer *:[grid-area:1/1]"
      @click="refetchStats()"
    >
      <div
        v-if="deckCard && deckCard.box > 0"
        class="status status-accent status-xl animate-ping cursor-pointer"
      ></div>
      <div class="status status-xl"></div>
    </label>

    <div class="card-body flex flex-col gap-5">
      <div class="card-title flex-col items-start gap-3 text-5xl">
        <div class="relative flex items-center justify-center">
          <div
            :class="{
              'tooltip tooltip-top': !hasSourceBlur,
              'blur-sm': hasSourceBlur,
            }"
            :data-tip="card.kana"
            @click="
              (copyToClipboard(card.text || card.kana), (hasSourceBlur = false))
            "
          >
            <h2>{{ card.text || card.kana }}</h2>
          </div>
        </div>
        <div
          class="no-scrollbar w-full overflow-x-auto"
          :class="{
            'blur-sm': hasTranslationBlur,
          }"
        >
          <div
            class="flex w-max gap-2 transition-all duration-300 ease-in-out"
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
              'hover:text-primary active:text-primary':
                token.hasMatch && !hasSourceBlur,
              'text-accent':
                (token.baseForm && token.baseForm === card.text) ||
                token.baseForm === card.kana,
            }"
            @click="copyToClipboard(token.text)"
          >
            <div
              v-if="token.hasMatch"
              class="inline-block underline decoration-dashed decoration-2 underline-offset-6"
              :class="{
                'tooltip tooltip-top cursor-pointer': !hasSourceBlur,
              }"
            >
              <div v-if="!hasSourceBlur" class="tooltip-content flex flex-col">
                <span>{{ token.kana }}</span>
                <span>{{ token.gloss?.substring(0, 24) }}</span>
              </div>
              {{ token.text }}
            </div>
            <span v-else>{{ token.text }}</span>
          </span>
        </p>
        <p
          class="text-1xl text-right italic transition-all duration-300 ease-in-out"
          :class="{ 'blur-sm': hasTranslationBlur }"
          @click="hasTranslationBlur = false"
        >
          {{ example.translation }}
        </p>
      </section>
    </div>
  </div>
</template>
