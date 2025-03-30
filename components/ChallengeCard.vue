<script setup lang="ts">
const props = defineProps<{
  question: Question;
}>();

const model = defineModel<Number>();
const { tokens, sentence, refresh: refreshTokens } = useTokens();

const sentenceEl = ref<HTMLElement | null>(null);
const selectedTokenIndex = ref(-1);

sentence.value = props.question.text;

watch(
  () => props.question.text,
  () => {
    sentence.value = props.question.text;
    refreshTokens();
  }
);

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

onClickOutside(sentenceEl, () => {
  selectedTokenIndex.value = -1;
});
</script>

<template>
  <div
    class="select-none card bg-base-100 card-xl shadow-xl max-h-[800px] overflow-y-auto overflow-x-hidden"
  >
    <label
      for="lesson"
      class="drawer-button btn btn-xs btn-circle absolute right-5 top-5 size-6"
    >
      <IconOnlineLearning01 />
    </label>
    <div class="card-body flex flex-col gap-5">
      <h2 ref="sentenceEl" class="card-title block">
        <span
          v-for="(token, index) in tokens"
          :key="token.text + index"
          :class="{
            'hover:text-primary': token.hasMatch,
            'text-primary': index === selectedTokenIndex,
          }"
          @click="copyToClipboard(token.text)"
        >
          <div
            v-if="token.hasMatch"
            class="tooltip tooltip-bottom"
            :class="{
              'tooltip-open': index === selectedTokenIndex,
            }"
            @touchstart="selectedTokenIndex = index"
          >
            <div class="flex flex-col tooltip-content z-2">
              <span>{{ token.kana }}</span>
              <span>{{ token.gloss?.substring(0, 24) }}</span>
            </div>
            {{ token.text }}
          </div>
          <span v-else>{{ token.text }}</span>
        </span>
      </h2>

      <div class="flex flex-col gap-3 items-start">
        <label
          v-for="(option, index) in question.options"
          :key="option"
          class="flex gap-3 items-center"
        >
          <input
            v-model="model"
            class="radio radio-md"
            :class="{
              'radio-success': index === question.answer && model === index,
              'radio-error': index !== question.answer && model === index,
            }"
            type="radio"
            name="answer"
            :value="index"
          />
          <span
            class="font-bold text-xl"
            :class="{
              'text-success': index === question.answer && model === index,
              'text-error': index !== question.answer && model === index,
            }"
          >
            {{ option }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>
