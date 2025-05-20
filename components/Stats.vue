<script setup lang="ts">
const { stats } = useStats();
</script>

<template>
  <div class="drawer z-2">
    <input id="stats" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side z-1">
      <label
        for="stats"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="backdrop-blur-md min-h-full w-80 p-4">
        <div v-if="stats" class="stats stats-vertical pt-safe">
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
                v-if="stats.total > 0"
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
                v-if="stats.total > 0"
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

<style scoped>
.pt-safe {
  padding-top: env(safe-area-inset-top);
}
</style>
