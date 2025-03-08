<script setup lang="ts">
const { stats } = useStats();
</script>

<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side z-1">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="bg-1200 backdrop-blur-md min-h-full w-80 p-4">
        <div v-if="stats" class="stats stats-vertical">
          <div class="stat">
            <div class="stat-title">Total</div>
            <div class="stat-value text-info">{{ addCommas(stats.total) }}</div>
          </div>

          <div class="stat">
            <div class="stat-title">Fresh</div>
            <div class="stat-value">
              {{ addCommas(stats.fresh) }}
            </div>
            <div class="stat-desc">
              <progress
                class="progress w-56"
                :value="(stats.fresh / stats.total) * 100"
                max="100"
              ></progress>
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Review</div>
            <div class="stat-value text-accent">
              {{ addCommas(stats.review) }}
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Retention</div>
            <div class="stat-value text-neutral">
              {{ addCommas(stats.retention) }}
            </div>
            <div class="stat-desc">
              <progress
                class="progress progress-neutral w-56"
                :value="(stats.retention / stats.total) * 100"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
