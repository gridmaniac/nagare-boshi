<script setup lang="ts">
const { params } = useRoute();
const { deckId, error } = useDeck();
const { card, isLoading: isCardLoading } = useCard();
const { sendReview } = useSendReview();
const { refetch: refetchStats } = useStats();
const { addNote } = useAddNote();
const {
  deckCard,
  refetch: refetchDeckCard,
  isLoading: isDeckCardLoading,
} = useDeckCard();

deckId.value = String(params.deckId);

const keyStrokeBlock = ref(false);
const isHolding = ref(false);
let timeout: NodeJS.Timeout;

const delistBtn = useTemplateRef("delistEl");
const goodBtn = useTemplateRef("goodEl");
const cakeBtn = useTemplateRef("cakeEl");

const doReview = async (choice: ReviewChoice) => {
  keyStrokeBlock.value = true;

  await Promise.all([
    sendReview({
      cardId: deckCard.value?._id || "",
      choice,
    }),
    refetchDeckCard(),
  ]);

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
      delistBtn.value?.focus();
      doReview("delist");
      break;
    case "2":
      goodBtn.value?.focus();
      doReview("good");
      break;
    case "3":
      cakeBtn.value?.focus();
      doReview("cake");
      break;
  }
};

watch(error, () => {
  localStorage.removeItem("deckId");
  navigateTo("/");
});

const holdStart = () => {
  timeout = setTimeout(() => {
    isHolding.value = true;
    timeout = setTimeout(async () => {
      isHolding.value = false;

      const value = prompt("Add a note", deckCard.value?.note);
      if (value === null) return;

      const note = {
        cardId: deckCard.value?._id || "",
        text: value ? value?.trim().substring(0, 24) : "",
      };

      await addNote(note);
    }, 1000);
  }, 100);
};

const holdEnd = () => {
  clearTimeout(timeout);
  isHolding.value = false;
};

onBeforeUnmount(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <div>
    <div
      class="text-center text-4xl font-bold"
      v-if="deckId && !deckCard && !isCardLoading"
    >
      <div
        class="tooltip tooltip-top tooltip-open block"
        data-tip="You did great!"
      >
        お疲れ様でした！
        <label
          for="stats"
          class="drawer-button absolute right-0 cursor-pointer"
          @click="refetchStats()"
        >
          <div class="status status-xl animate-pulse"></div>
        </label>
      </div>
    </div>
    <progress v-if="deckCard && !card" class="progress w-full"></progress>
    <Transition name="rotate">
      <Card
        v-if="!isDeckCardLoading && card && deckCard"
        :card="card"
        :box="deckCard.box"
        class="transition-all duration-300 ease-in-out"
        :class="{
          'scale-105 shadow-2xl': isHolding,
        }"
        @mousedown="holdStart"
        @touchstart="holdStart"
        @mouseup="holdEnd"
        @touchend="holdEnd"
      />
    </Transition>
    <TextMeta v-if="!!card" :text="card.text" />
    <div v-else class="divider text-xs text-gray-600 uppercase"></div>
    <div
      v-if="!isDeckCardLoading && card"
      class="join relative flex w-full shadow-xl sm:hidden"
    >
      <button
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        @click="doReview('delist')"
      >
        🪣
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        @click="doReview('good')"
      >
        👌🏻
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        @click="doReview('cake')"
      >
        🍰
      </button>
    </div>
    <div class="join hidden w-full shadow-xl sm:flex">
      <button
        ref="delistEl"
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('delist')"
      >
        <kbd
          class="kbd in-hover:border-base-300 in-focus:border-base-300 bg-transparent"
        >
          1
        </kbd>
        Delist
      </button>
      <button
        ref="goodEl"
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('good')"
      >
        <kbd
          class="kbd in-hover:border-base-300 in-focus:border-base-300 bg-transparent"
        >
          2
        </kbd>
        Good
      </button>
      <button
        ref="cakeEl"
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('cake')"
      >
        <kbd
          class="kbd in-hover:border-base-300 in-focus:border-base-300 bg-transparent"
        >
          3
        </kbd>
        Cake
      </button>
    </div>
  </div>
</template>
