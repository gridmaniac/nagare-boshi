<script setup lang="ts">
const props = defineProps<{
  sentence: string;
  dot?: boolean;
}>();

const { tokens, sentence } = useTokens();

const sentenceEl = useTemplateRef("sentenceEl");
const selectedTokenIndex = ref(-1);

sentence.value = props.sentence;

onClickOutside(sentenceEl, () => {
  selectedTokenIndex.value = -1;
});
</script>

<template>
  <p ref="sentenceEl" class="text-xl font-semibold">
    <span v-if="!tokens">{{ sentence }}</span>
    <span
      v-else
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
        class="tooltip tooltip-top underline decoration-dashed underline-offset-4 decoration-1 cursor-pointer"
        :class="{
          'tooltip-open': index === selectedTokenIndex,
        }"
        @touchstart="selectedTokenIndex = index"
      >
        <div class="flex flex-col tooltip-content">
          <span>{{ token.kana }}</span>
          <span>{{ token.gloss?.substring(0, 24) }}</span>
        </div>
        {{ token.text }}
      </div>
      <span v-else>{{ token.text }}</span> </span
    ><span v-if="dot">。</span>
  </p>
</template>
