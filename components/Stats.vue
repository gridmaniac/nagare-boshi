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
        <div class="stats stats-vertical">
          <div class="stat">
            <div class="stat-title">Total</div>
            <div class="stat-value text-info">2,260</div>
          </div>

          <div class="stat">
            <div class="stat-title">New</div>
            <div class="stat-value">1,480</div>
            <div class="stat-desc">
              <progress class="progress w-56" value="70" max="100"></progress>
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Review</div>
            <div class="stat-value text-accent">16</div>
          </div>

          <div class="stat">
            <div class="stat-title">Retention</div>
            <div class="stat-value text-neutral">26</div>
            <div class="stat-desc">
              <progress
                class="progress progress-neutral w-56"
                value="10"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
