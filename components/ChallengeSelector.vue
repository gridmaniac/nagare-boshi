<script setup lang="ts">
const { deckId } = useDeck();
</script>

<template>
  <div class="dropdown dropdown-left z-1">
    <IconMore tabindex="0" role="button" class="btn" />
    <ul
      tabindex="0"
      class="dropdown-content menu menu-lg bg-base-100 rounded-box shadow-sm font-bold"
    >
      <li>
        <NuxtLink :to="`/${deckId}/n1`" @click="(e) => e.currentTarget.blur()">
          N1
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/${deckId}/n2`" @click="(e) => e.currentTarget.blur()">
          N2
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/${deckId}/n3`" @click="(e) => e.currentTarget.blur()">
          N3
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/${deckId}/n4`" @click="(e) => e.currentTarget.blur()">
          N4
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/${deckId}/n5`" @click="(e) => e.currentTarget.blur()">
          N5
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
