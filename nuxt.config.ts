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
          media:
            "screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_16_Pro_Max_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_16_Pro_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/iPhone_11__iPhone_XR_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
          href: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/13__iPad_Pro_M4_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/12.9__iPad_Pro_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/11__iPad_Pro_M4_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/10.9__iPad_Air_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/10.5__iPad_Air_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/10.2__iPad_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
          href: "/splash_screens/8.3__iPad_Mini_landscape.png",
        },

        // Portrait
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_16_Pro_Max_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_16_Pro_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/iPhone_11__iPhone_XR_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
          href: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/13__iPad_Pro_M4_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/12.9__iPad_Pro_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/11__iPad_Pro_M4_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/10.9__iPad_Air_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/10.5__iPad_Air_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/10.2__iPad_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
        },
        {
          rel: "apple-touch-startup-image",
          media:
            "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
          href: "/splash_screens/8.3__iPad_Mini_portrait.png",
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
      background_color: "#120b3d",
      theme_color: "#120b3d",
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
