<script setup lang="ts"></script>

<template>
  <button class="btn btn-circle btn-ghost" onclick="my_modal_2.showModal()">
    <IconAdd02 class="size-6" />
  </button>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <input type="text" placeholder="一言" class="input input-xl w-full" />
        <input
          type="text"
          placeholder="Значение"
          class="input input-lg w-full"
        />

        <textarea
          class="textarea textarea-lg w-full"
          rows="3"
          placeholder="例文"
        ></textarea>
        <textarea
          class="textarea textarea-lg w-full"
          rows="3"
          placeholder="例文の意味"
        ></textarea>
      </div>

      <div class="flex gap-2 items-center">
        <div class="badge badge-outline badge-primary uppercase">Значение</div>
        <div class="badge badge-outline uppercase">dochi</div>
        <button class="btn btn-sm btn-ghost btn-circle">
          <IconAdd02 class="size-6" />
        </button>
      </div>

      <form method="dialog">
        <button class="btn w-full">✏️</button>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
