<script setup lang="ts">
const queryCache = useQueryCache();
const { challenge, isLoading } = useChallenge();
const { generateFeedback } = useGenerateFeedback();

const displayedSentence = ref("");
const alternativeSentence = ref("");
const isTranslationVisible = ref(false);
const isSubmitted = ref(false);
const feedback = ref<string>("");
const displayedFeedback = ref<string>("");

const typeSentence = async () => {
  displayedSentence.value = "";

  if (!challenge.value) return;
  const { sentence } = challenge.value;

  for (let i = 0; i < sentence.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    displayedSentence.value += sentence[i];
  }
};

const typeFeedback = async () => {
  displayedFeedback.value = "";

  if (!feedback.value) return;

  for (let i = 0; i < feedback.value.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 20));
    displayedFeedback.value += feedback.value[i];
  }
};

const submit = async () => {
  if (!challenge.value || !alternativeSentence.value) return;

  isSubmitted.value = true;

  await delay(1000);
  isTranslationVisible.value = true;

  feedback.value = await generateFeedback({
    sentence: challenge.value.sentence,
    translation: alternativeSentence.value,
    alternativeTranslation: "Your alternative translation here",
  });
};

const restart = () => {
  isSubmitted.value = false;
  isTranslationVisible.value = false;
  alternativeSentence.value = "";
  displayedSentence.value = "";
  displayedFeedback.value = "";
  feedback.value = "";

  queryCache.setQueryData(["challenge"], undefined);
  queryCache.invalidateQueries({ key: ["challenge"] });
};

watch(challenge, (val) => {
  if (!val) return;
  typeSentence();
});

watch(feedback, (val) => {
  if (!val) return;
  typeFeedback();
});
</script>

<template>
  <dialog id="challenge" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <Transition name="slideup">
        <div v-if="challenge" class="chat chat-start">
          <div class="chat-bubble chat-bubble-neutral">
            {{ displayedSentence }}
          </div>
        </div>
      </Transition>

      <Transition name="slideup">
        <div v-if="isSubmitted" class="chat chat-end">
          <div class="chat-bubble">{{ alternativeSentence }}</div>
          <div class="chat-footer opacity-50">Submitted</div>
        </div>
      </Transition>

      <div v-if="isTranslationVisible && challenge" class="chat chat-start">
        <div class="chat-bubble chat-bubble-neutral">
          <Sentence :sentence="challenge.translation" />
        </div>
        <div class="chat-footer opacity-50">Translation</div>
      </div>

      <div v-if="feedback" class="chat chat-start">
        <div class="chat-bubble chat-bubble-neutral">
          {{ displayedFeedback }}
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center">
        <progress class="progress w-20"></progress>
      </div>

      <div v-if="!isSubmitted" class="divider"></div>

      <label
        v-if="!isSubmitted"
        class="textarea textarea-lg w-full flex items-center gap-2"
      >
        <textarea
          v-model.trim="alternativeSentence"
          class="grow"
          rows="2"
          placeholder="さあ、日本語にしてみて！"
          :disabled="!challenge"
        ></textarea>
        <button
          class="btn btn-md btn-circle btn-neutral"
          :disabled="!challenge"
          @click="submit"
        >
          <IconSent class="size-4" />
        </button>
      </label>

      <div v-if="isSubmitted" class="flex justify-center mt-4">
        <button class="btn btn-lg btn-circle btn-neutral" @click="restart">
          <IconRefresh class="size-6" />
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
