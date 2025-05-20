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

const hardBtn = ref<HTMLButtonElement | null>(null);
const goodBtn = ref<HTMLButtonElement | null>(null);
const easyBtn = ref<HTMLButtonElement | null>(null);

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
      hardBtn.value?.focus();
      doReview("delist");
      break;
    case "2":
      goodBtn.value?.focus();
      doReview("good");
      break;
    case "3":
      easyBtn.value?.focus();
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

const orientation = reactive({
  alpha: 0,
  beta: 0,
  gamma: 0,
});

async function getOrientation() {
  if (
    !window.DeviceOrientationEvent ||
    !window.DeviceOrientationEvent.requestPermission
  ) {
    return alert(
      "Your current device does not have access to the DeviceOrientation event"
    );
  }

  let permission = await window.DeviceOrientationEvent.requestPermission();
  if (permission !== "granted") {
    return alert("You must grant access to the device's sensor for this demo");
  }
}

onMounted(async () => {
  window.addEventListener("deviceorientation", function (e) {
    // let requestBtn = document.querySelector("#get-orientation");
    // if (requestBtn){requestBtn.remove();}

    Object.assign(orientation, {
      alpha: e.alpha?.toFixed(0),
      beta: e.beta?.toFixed(0),
      gamma: e.gamma?.toFixed(0),
    });
  });
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
          class="drawer-button cursor-pointer absolute right-0"
          @click="refetchStats()"
        >
          <div class="status status-xl animate-pulse"></div>
        </label>
      </div>
    </div>
    <button class="btn" @click="getOrientation">test</button>
    {{ orientation }}
    <progress v-if="!card && isCardLoading" class="progress w-full"></progress>
    <Transition name="rotate">
      <Card
        v-if="!isDeckCardLoading && card && deckCard"
        :card="card"
        :box="deckCard.box"
        class="transition-all duration-300 ease-in-out"
        :class="{
          'scale-105 shadow-2xl': isHolding,
        }"
        :style="{
          // transform: `rotateX(${(orientation.beta - 90) * 0.3}deg)`,
          transform: `rotate3d(1, 0, 0, ${90 - orientation.beta}deg)`,
        }"
        @mousedown="holdStart"
        @touchstart="holdStart"
        @mouseup="holdEnd"
        @touchend="holdEnd"
      />
    </Transition>
    <TextMeta v-if="!!card" :text="card.text" />
    <div
      v-if="!isDeckCardLoading && card"
      class="flex w-full join shadow-xl sm:hidden"
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
    <div class="w-full join shadow-xl sm:flex hidden">
      <button
        ref="hardBtn"
        class="btn btn-xl btn-soft join-item btn-error flex-1"
        :disabled="!card || isDeckCardLoading"
        @click="doReview('delist')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
        >
          1
        </kbd>
        Delist
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
        @click="doReview('cake')"
      >
        <kbd
          class="kbd bg-transparent in-hover:border-base-300 in-focus:border-base-300"
        >
          3
        </kbd>
        Cake
      </button>
    </div>
  </div>
</template>
