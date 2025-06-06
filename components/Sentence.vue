<script setup lang="ts">
interface Token {
  text: string;
  hasMatch: boolean;
  kana?: string;
  gloss?: string;
  baseForm?: string;
}

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

// Split tokens into lines based on line breaks in the original text
const lines = computed(() => {
  if (!tokens.value) {
    return [
      sentence.value.split("\n").map((text) => ({
        text,
        hasMatch: false,
        kana: undefined,
        gloss: undefined,
        baseForm: undefined,
      })),
    ];
  }

  let currentLine: Token[] = [];
  const result: Token[][] = [currentLine];
  let charCount = 0;

  tokens.value.forEach((token) => {
    const containsLineBreak = token.text.includes("\n");
    if (containsLineBreak) {
      const parts = token.text.split("\n");
      parts.forEach((part, index) => {
        if (index === 0) {
          if (part) {
            currentLine.push({ ...token, text: part });
          }
        } else {
          currentLine = [{ ...token, text: part }];
          result.push(currentLine);
        }
      });
    } else {
      currentLine.push(token);
    }
    charCount += token.text.length;
  });

  return result;
});
</script>

<template>
  <div ref="sentenceEl" class="text-xl font-semibold whitespace-pre-wrap">
    <template v-if="!tokens">{{ sentence }}</template>
    <template v-else>
      <p
        v-for="(line, lineIndex) in lines"
        :key="lineIndex"
        class="min-h-[1em]"
      >
        <span
          v-for="(token, index) in line"
          :key="token.text + index"
          :class="{
            'hover:text-primary': token.hasMatch,
            'text-primary': index === selectedTokenIndex,
          }"
          @click="copyToClipboard(token.text)"
        >
          <div
            v-if="token.hasMatch"
            class="tooltip tooltip-top underline decoration-dashed underline-offset-4 decoration-1 cursor-pointer inline-block"
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
          <span v-else>{{ token.text }}</span>
        </span>
      </p>
    </template>
    <span v-if="dot">。</span>
  </div>
</template>

<style scoped>
p:empty::after {
  content: "\00a0";
  white-space: pre;
}
</style>
