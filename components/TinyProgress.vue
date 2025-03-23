<script setup lang="ts">
defineProps<{
  value: number;
  color: "error" | "primary" | "warning" | "success" | "secondary";
}>();
</script>

<template>
  <div
    class="radial-progress"
    :class="{
      'text-primary': color === 'primary',
      'text-error': color === 'error',
      'text-warning': color === 'warning',
      'text-success': color === 'success',
      'text-secondary': color === 'secondary',
    }"
    style="--size: 1.3rem; --thickness: 4px"
    :style="{ '--value': value }"
    :aria-valuenow="value"
    role="progressbar"
  ></div>
</template>
