<script setup lang="ts">
const isBorder = ref(false);
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <div
      class="card bg-base-200 size-[512px] flex justify-center items-center"
      :class="{
        'border border-primary': isBorder,
      }"
    >
      <div class="status status-xl scale-2000">星</div>
    </div>

    <div
      class="card bg-base-200 size-[192px] flex justify-center items-center"
      :class="{
        'border border-primary': isBorder,
      }"
    >
      <div class="status status-xl scale-700">星</div>
    </div>

    <div
      class="card bg-base-200 size-[144px] flex justify-center items-center"
      :class="{
        'border border-primary': isBorder,
      }"
    >
      <div class="status status-xl scale-500">星</div>
    </div>

    <div
      class="card bg-base-200 size-[64px] flex justify-center items-center"
      :class="{
        'border border-primary': isBorder,
      }"
    >
      <div class="status status-xl scale-200">星</div>
    </div>
  </div>
</template>
