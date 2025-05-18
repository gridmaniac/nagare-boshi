<script setup lang="ts">
const props = defineProps<{ text: string }>();

const { text, meta } = useTextMeta();
text.value = props.text;
</script>

<template>
  <div class="divider text-xs uppercase text-gray-600">
    <span v-if="meta?.isCommon">✔️</span>
    <span v-if="!!meta?.jlpt">{{ meta?.jlpt.replace("jlpt-", "") }}</span>
  </div>
</template>
