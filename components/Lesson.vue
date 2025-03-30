<script setup lang="ts">
defineProps<{
  url: string;
  grammar: Grammar[];
  vocabulary: Vocabulary[];
}>();

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
</script>

<template>
  <div class="drawer drawer-end z-2">
    <input id="lesson" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label
        for="lesson"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="min-h-full w-80 p-4 backdrop-blur-md">
        <NuxtLink
          class="btn btn-sm btn-circle absolute top-5 right-5 size-8"
          :to="url"
          target="_blank"
        >
          <IconLibrary />
        </NuxtLink>
        <div class="flex flex-wrap gap-3 mr-10">
          <NuxtLink
            v-for="item in grammar"
            class="btn btn-lg btn-dash btn-secondary"
            :to="item.url"
            :key="item.url"
            target="_blank"
          >
            {{ item.text }}
          </NuxtLink>
        </div>

        <hr class="my-5 text-base-300" />

        <div class="flex flex-col gap-7">
          <div
            v-for="item in vocabulary"
            :key="item.text"
            class="grid grid-cols-2 gap-5 items-center"
          >
            <div class="text-3xl">
              <span
                class="tooltip"
                :data-tip="item.reading"
                @click="copyToClipboard(item.text)"
                >{{ item.text }}</span
              >
            </div>
            <div class="badge badge-neutral h-auto text-sm italic">
              {{ item.meaning }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
