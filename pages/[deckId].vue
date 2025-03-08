<script setup lang="ts">
const { params } = useRoute();
const { deckId } = useDeck();
const { card } = useCard();

deckId.value = String(params.deckId);

const queryCache = useQueryCache();
const keyStrokeBlock = ref(false);

const hardBtn = ref<HTMLButtonElement | null>(null);
const goodBtn = ref<HTMLButtonElement | null>(null);
const easyBtn = ref<HTMLButtonElement | null>(null);

const focusTarget = ref<HTMLElement | null>(null);

const isCooldown = computed(() => !card.value);

const doReview = async (choice: "Hard" | "Good" | "Easy") => {
  keyStrokeBlock.value = true;
  setTimeout(() => {
    queryCache.invalidateQueries({ key: ["deck-card"] });
    keyStrokeBlock.value = false;
  }, 100);
};

onKeyStroke("1", () => handleKeyStroke("1"));
onKeyStroke("2", () => handleKeyStroke("2"));
onKeyStroke("3", () => handleKeyStroke("3"));

const handleKeyStroke = (key: "1" | "2" | "3") => {
  if (isCooldown.value) return;

  switch (key) {
    case "1":
      hardBtn.value?.focus();
      doReview("Easy");
      break;
    case "2":
      goodBtn.value?.focus();
      doReview("Good");
      break;
    case "3":
      easyBtn.value?.focus();
      doReview("Hard");
      break;
  }
};
</script>

<template>
  <div>
    <Transition name="rotate">
      <Card v-if="card" :card="card" />
    </Transition>
    <div class="divider"></div>
    <div v-if="card" class="flex w-full join shadow-xl sm:hidden">
      <button
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="isCooldown"
        @click="doReview('Hard')"
      >
        😓
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        :disabled="isCooldown"
        @click="doReview('Good')"
      >
        👌🏻
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        :disabled="isCooldown"
        @click="doReview('Easy')"
      >
        👍🏼
      </button>
    </div>
    <div class="w-full join shadow-xl sm:flex hidden">
      <button
        ref="hardBtn"
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="isCooldown"
        @click="doReview('Hard')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
          >1</kbd
        >
        Hard
      </button>
      <button
        ref="goodBtn"
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        :disabled="isCooldown"
        @click="doReview('Good')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
          >2</kbd
        >
        Good
      </button>
      <button
        ref="easyBtn"
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        :disabled="isCooldown"
        @click="doReview('Easy')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
          >3</kbd
        >
        Easy
      </button>
    </div>
  </div>
</template>
