<script setup lang="ts">
const props = defineProps<{
  sentence: string;
  dot?: boolean;
  breakLine?: boolean;
}>();

const { tokens, sentence } = useTokens();

const sentenceEl = useTemplateRef("sentenceEl");
const selectedTokenIndex = ref(-1);

sentence.value = props.sentence;

onClickOutside(sentenceEl, () => {
  selectedTokenIndex.value = -1;
});

// Convert tokens into a flat array with line break tokens
const tokensWithLineBreaks = computed(() => {
  if (!tokens.value) {
    return sentence.value.split("\n").flatMap((text, i, arr) => {
      const tokens = [
        {
          text,
          hasMatch: false,
          kana: undefined,
          gloss: undefined,
          baseForm: undefined,
        },
      ];
      if (i < arr.length - 1) {
        tokens.push({
          text: "\n",
          hasMatch: false,
          kana: undefined,
          gloss: undefined,
          baseForm: undefined,
        });
      }
      return tokens;
    });
  }

  return tokens.value.flatMap((token) => {
    if (!token.text.includes("\n")) {
      return [token];
    }

    return token.text.split("\n").flatMap((part, i, arr) => {
      const tokens: Token[] = [];
      if (part) {
        tokens.push({ ...token, text: part });
      }
      if (i < arr.length - 1) {
        tokens.push({ text: "\n", hasMatch: false });
      }
      return tokens;
    });
  });
});
</script>

<template>
  <div ref="sentenceEl" class="text-xl font-semibold whitespace-pre-wrap">
    <template v-if="!tokens">{{ sentence }}{{ dot ? "。" : "" }}</template>
    <template v-else>
      <span
        v-for="(token, index) in tokensWithLineBreaks.filter(
          (token) => token.text !== '\n' || breakLine
        )"
        :key="token.text + index"
        :class="{
          'hover:text-primary': token.hasMatch,
          'text-primary': index === selectedTokenIndex,
        }"
        @click="token.hasMatch && copyToClipboard(token.text)"
      >
        <div
          v-if="token.hasMatch"
          class="tooltip tooltip-top underline decoration-dashed underline-offset-4 decoration-1 cursor-pointer whitespace-nowrap"
          @touchstart="selectedTokenIndex = index"
        >
          <div class="flex flex-col tooltip-content">
            <span>{{ token.kana }}</span>
            <span>{{ token.gloss?.substring(0, 24) }}</span>
          </div>
          {{ token.text }}
        </div>
        <template v-else>
          <br v-if="token.text === '\n'" />
          <span v-else>{{ token.text }}</span>
        </template>
      </span>
      <span v-if="dot">。</span>
    </template>
  </div>
</template>
