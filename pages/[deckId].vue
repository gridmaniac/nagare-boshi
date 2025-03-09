<script setup lang="ts">
const { params } = useRoute();
const { deckId } = useDeck();
const { card } = useCard();
const { sendReview } = useReview();
const { refetch: refetchStats } = useStats();
const {
  deckCard,
  refetch: refetchDeckCard,
  isLoading: isDeckCardLoading,
} = useDeckCard();

deckId.value = String(params.deckId);

const keyStrokeBlock = ref(false);

const hardBtn = ref<HTMLButtonElement | null>(null);
const goodBtn = ref<HTMLButtonElement | null>(null);
const easyBtn = ref<HTMLButtonElement | null>(null);

const doReview = async (choice: ReviewChoice) => {
  keyStrokeBlock.value = true;

  await sendReview({
    cardId: deckCard.value?._id || "",
    choice,
  });

  await refetchDeckCard();

  setTimeout(() => {
    keyStrokeBlock.value = false;
  }, 100);
};

onKeyStroke("1", () => handleKeyStroke("1"));
onKeyStroke("2", () => handleKeyStroke("2"));
onKeyStroke("3", () => handleKeyStroke("3"));

const handleKeyStroke = (key: "1" | "2" | "3") => {
  if (keyStrokeBlock.value) return;

  switch (key) {
    case "1":
      hardBtn.value?.focus();
      doReview("easy");
      break;
    case "2":
      goodBtn.value?.focus();
      doReview("good");
      break;
    case "3":
      easyBtn.value?.focus();
      doReview("hard");
      break;
  }
};
</script>

<template>
  <div>
    <div class="text-center text-4xl font-bold" v-if="deckId && !deckCard">
      <div
        class="tooltip tooltip-top tooltip-open block"
        data-tip="You did great!"
      >
        お疲れ様でした！
        <label
          for="stats"
          class="drawer-button cursor-pointer absolute right-0"
          @click="refetchStats()"
        >
          <div class="status status-xl animate-pulse"></div>
        </label>
      </div>
    </div>
    <Transition name="rotate">
      <Card v-if="!isDeckCardLoading && card" :card="card" />
    </Transition>
    <div class="divider"></div>
    <div
      v-if="!isDeckCardLoading && card"
      class="flex w-full join shadow-xl sm:hidden"
    >
      <button
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        @click="doReview('hard')"
      >
        😓
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        @click="doReview('good')"
      >
        👌🏻
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        @click="doReview('easy')"
      >
        👍🏼
      </button>
    </div>
    <div class="w-full join shadow-xl sm:flex hidden">
      <button
        ref="hardBtn"
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('hard')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
        >
          1
        </kbd>
        Hard
      </button>
      <button
        ref="goodBtn"
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('good')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
        >
          2
        </kbd>
        Good
      </button>
      <button
        ref="easyBtn"
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('easy')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
        >
          3
        </kbd>
        Easy
      </button>
    </div>
  </div>
</template>
