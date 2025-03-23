<script setup lang="ts">
const { params } = useRoute();
const { deckId } = useDeck();
const { level, challenge } = useChallenge();
const { submitChallenge, isLoading } = useSubmitChallenge();

const isHolding = ref(false);
let timeout: NodeJS.Timeout;

level.value = String(params.level);

const currentQuestion = ref(0);
const totalQuestions = computed(() => challenge.value?.questions.length);
const answeredQuestions = computed(
  () => answers.value.filter((x) => x !== null).length
);

const hasPrevious = computed(() => currentQuestion.value > 0);
const hasNext = computed(
  () => currentQuestion.value < (totalQuestions.value || 0) - 1
);

const answers = ref<Number[]>([]);
const completeChallenge = async () => {
  if (!challenge.value) return;

  await submitChallenge({
    deckId: deckId.value,
    challengeId: challenge.value.id,
  });

  navigateTo("/");
};

const holdStart = () => {
  timeout = setTimeout(() => {
    isHolding.value = true;
    timeout = setTimeout(async () => {
      isHolding.value = false;

      navigator.clipboard.writeText(
        challenge.value?.questions[currentQuestion.value].text || ""
      );
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
    <div class="text-center text-4xl font-bold" v-if="!challenge">
      <div
        class="tooltip tooltip-top tooltip-open block"
        data-tip="You did great!"
      >
        お疲れ様でした！
      </div>
    </div>
    <Lesson
      v-if="challenge"
      :url="challenge.url"
      :grammar="challenge.grammar"
      :vocabulary="challenge.vocabulary"
    />
    <ChallengeCard
      v-if="challenge"
      v-model="answers[currentQuestion]"
      :question="challenge.questions[currentQuestion]"
      :challenge="challenge"
      class="transition-all duration-300 ease-in-out"
      :class="{
        'scale-105 shadow-2xl': isHolding,
      }"
      @mousedown="holdStart"
      @touchstart="holdStart"
      @mouseup="holdEnd"
      @touchend="holdEnd"
    />
    <div class="divider"></div>
    <div v-if="challenge" class="flex w-full join shadow-xl">
      <button
        :disabled="!hasPrevious"
        class="btn btn-xl btn-soft join-item btn-neutral flex-1"
        @click="currentQuestion--"
      >
        <IconArrowLeft class="size-10" />
      </button>
      <button
        :disabled="answeredQuestions !== totalQuestions || isLoading"
        class="btn btn-xl btn-soft join-item btn-success flex-1"
        @click="completeChallenge()"
      >
        <IconCheckMarkBadge03
          v-if="answeredQuestions === totalQuestions"
          class="size-10"
        />
        <span v-else> {{ answeredQuestions }}/{{ totalQuestions }}</span>
      </button>
      <button
        :disabled="!hasNext"
        class="btn btn-xl btn-soft join-item btn-neutral flex-1"
        @click="currentQuestion++"
      >
        <IconArrowRight class="size-10" />
      </button>
    </div>
  </div>
</template>
