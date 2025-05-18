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
          content:
            "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
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
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2048-2732.jpg",
          media:
            "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2732-2048.jpg",
          media:
            "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1668-2388.jpg",
          media:
            "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2388-1668.jpg",
          media:
            "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1536-2048.jpg",
          media:
            "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2048-1536.jpg",
          media:
            "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1640-2360.jpg",
          media:
            "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2360-1640.jpg",
          media:
            "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1668-2224.jpg",
          media:
            "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2224-1668.jpg",
          media:
            "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1620-2160.jpg",
          media:
            "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2160-1620.jpg",
          media:
            "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1488-2266.jpg",
          media:
            "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2266-1488.jpg",
          media:
            "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1320-2868.jpg",
          media:
            "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2868-1320.jpg",
          media:
            "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1206-2622.jpg",
          media:
            "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2622-1206.jpg",
          media:
            "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1290-2796.jpg",
          media:
            "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2796-1290.jpg",
          media:
            "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1179-2556.jpg",
          media:
            "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2556-1179.jpg",
          media:
            "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1170-2532.jpg",
          media:
            "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2532-1170.jpg",
          media:
            "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1284-2778.jpg",
          media:
            "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2778-1284.jpg",
          media:
            "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1125-2436.jpg",
          media:
            "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2436-1125.jpg",
          media:
            "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1242-2688.jpg",
          media:
            "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2688-1242.jpg",
          media:
            "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-828-1792.jpg",
          media:
            "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1792-828.jpg",
          media:
            "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1242-2208.jpg",
          media:
            "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-2208-1242.jpg",
          media:
            "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-750-1334.jpg",
          media:
            "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1334-750.jpg",
          media:
            "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-640-1136.jpg",
          media:
            "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        },
        {
          rel: "apple-touch-startup-image",
          href: "splash/apple-splash-1136-640.jpg",
          media:
            "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
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
