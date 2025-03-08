<script setup lang="ts">
const { params } = useRoute();
const { deckId } = useDeck();
const { card } = useCard();

const hardBtn = ref<HTMLButtonElement | null>(null);
const goodBtn = ref<HTMLButtonElement | null>(null);
const easyBtn = ref<HTMLButtonElement | null>(null);

deckId.value = String(params.deckId);

const queryCache = useQueryCache();
const invisible = ref(false);
const keyStrokeBlock = ref(false);

const test = async () => {
  invisible.value = true;
  queryCache.invalidateQueries({ key: ["deck-card"] });
  setTimeout(() => {
    invisible.value = false;
  }, 400);
};

onKeyStroke("1", () => handleKeyStroke("1"));
onKeyStroke("2", () => handleKeyStroke("2"));
onKeyStroke("3", () => handleKeyStroke("3"));

const handleKeyStroke = (key: "1" | "2" | "3") => {
  if (keyStrokeBlock.value || invisible.value) return;

  switch (key) {
    case "1":
      hardBtn.value?.focus();
      break;
    case "2":
      goodBtn.value?.focus();
      break;
    case "3":
      easyBtn.value?.focus();
      break;
  }

  keyStrokeBlock.value = true;
  setTimeout(() => {
    test();
    keyStrokeBlock.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <Transition name="rotate">
      <Card v-if="!invisible && card" :card="card" />
    </Transition>
    <div class="divider"></div>
    <div class="flex w-full join shadow-xl sm:hidden">
      <button
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="invisible"
      >
        😓
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-info flex-1"
        :disabled="invisible"
        @click="test"
      >
        👌🏻
      </button>
      <button
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        :disabled="invisible"
      >
        👍🏼
      </button>
    </div>
    <div class="w-full join shadow-xl sm:flex hidden">
      <button
        ref="hardBtn"
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="invisible"
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
        :disabled="invisible"
        @click="test"
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
        :disabled="invisible"
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
