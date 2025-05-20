<script setup lang="ts">
const { deckId } = useDeck();
</script>

<template>
  <ul class="card card-xl list bg-base-100/70 shadow-xl backdrop-blur-sm">
    <li class="p-4 opacity-60 flex gap-2">
      <input
        type="text"
        placeholder="Type here"
        class="input input-ghost w-full"
      />
      <Modal />
    </li>

    <div class="max-h-[400px] overflow-y-auto">
      <li v-for="i in 10" class="list-row">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2 items-center">
            <button class="status status-xl" />
            <div class="text-2xl text-neutral-100">〜と〜とどちらが</div>
          </div>

          <div
            class="text-xl font-semibold tooltip"
            data-tip="Should I add debug messages or can we do it on this computer?"
          >
            私がデバッグ・メッセージを追加するのと、このコンピューターでやるのと、どっちがいい？
          </div>

          <div class="flex gap-2">
            <div class="badge badge-outline badge-primary uppercase">
              вариант из двух
            </div>
            <div class="badge badge-outline uppercase">dochi</div>
          </div>
        </div>
      </li>
    </div>
  </ul>
</template>
