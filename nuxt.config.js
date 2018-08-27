module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "verwerkingsregister",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#009de0" },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      "babel-polyfill",
      "~/node_modules/gent_styleguide/build/styleguide/js/base-min.js"
    ],
    babel: {
      presets: [
        [
          "vue-app",
          {
            useBuiltIns: true,
            targets: { ie: 11, uglify: true }
          }
        ]
      ]
    },
    extractCSS: {
      allChunks: true
    },
    postcss: {
      plugins: {
        "postcss-custom-properties": false
      }
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules|assets)/
        })
      }
      const vueLoader = config.module.rules.find(
        ({ loader }) => loader === "vue-loader"
      )
      const {
        options: { loaders }
      } = vueLoader || { options: {} }
      if (loaders) {
        for (const loader of Object.values(loaders)) {
          changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
        }
      }
      config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
    }
  },
  css: ["@/assets/sass/main.scss"],
  plugins: [{ src: "~plugins/webFontLoader.js", ssr: false }],
  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA‌-791237-60"
      }
    ]
  ]
}

function changeLoaderOptions(loaders) {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === "sass-loader") {
        Object.assign(loader.options, {
          includePaths: [
            "node_modules/breakpoint-sass/stylesheets",
            "node_modules/susy/sass"
          ]
        })
      }
    }
  }
}
