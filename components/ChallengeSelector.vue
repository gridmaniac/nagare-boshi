<script setup lang="ts">
const { deckId } = useDeck();
</script>

<template>
  <div class="dropdown dropdown-left">
    <IconMore tabindex="0" role="button" class="btn" />
    <ul
      tabindex="0"
      class="dropdown-content menu menu-lg bg-base-100 rounded-box shadow-sm font-bold"
    >
      <li>
        <NuxtLink :to="`/${deckId}`" @click="(e) => e.currentTarget.blur()">
          <IconCards02 class="size-7" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="`/${deckId}/list`"
          @click="(e) => e.currentTarget.blur()"
        >
          <IconListView class="size-6" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
