import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "nuxt-mongoose",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  app: {
    pageTransition: { name: "rotate", mode: "out-in" },
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "icons/icon-192x192.png",
        },
      ],
    },
  },
  mongoose: {
    uri: process.env.DB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  imports: {
    dirs: ["queries", "mutations"],
  },
  pwa: {
    manifest: {
      name: "流れ星",
      short_name: "流れ星",
      description: "Leverage Imiwa? backup to study SRS flashcards.",
      background_color: "#09002f",
      theme_color: "#09002f",
      icons: [
        {
          src: "icons/icon-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
      maximumFileSizeToCacheInBytes: 35 * 1024 * 1024,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
