<script setup lang="ts">
const isBorder = ref(false);
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <div
      class="card bg-base-300 flex size-[512px] items-center justify-center"
      :class="{
        'border-primary border': isBorder,
      }"
    >
      <div class="status status-xl scale-2000">星</div>
    </div>

    <div
      class="card bg-base-300 flex size-[192px] items-center justify-center"
      :class="{
        'border-primary border': isBorder,
      }"
    >
      <div class="status status-xl scale-700">星</div>
    </div>

    <div
      class="card bg-base-300 flex size-[144px] items-center justify-center"
      :class="{
        'border-primary border': isBorder,
      }"
    >
      <div class="status status-xl scale-500">星</div>
    </div>

    <div
      class="card bg-base-300 flex size-[64px] items-center justify-center"
      :class="{
        'border-primary border': isBorder,
      }"
    >
      <div class="status status-xl scale-200">星</div>
    </div>
  </div>
</template>
