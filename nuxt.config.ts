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
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  app: {
    pageTransition: { name: "rotate", mode: "out-in" },
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
});