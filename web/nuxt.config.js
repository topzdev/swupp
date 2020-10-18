export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "swupp",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&family=Poppins:wght@400;600;700&display=swap"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/css/bootstrap-grid.min.css", "@/assets/sass/main.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/vee-validate.js"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],

  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/v1/auth/sign-in",
            method: "post",
            propertyName: "data.token"
          },
          logout: {
            url: "/api/v1/auth/logout",
            method: "post"
          },
          user: {
            url: "/api/v1/auth/me",
            method: "get",
            propertyName: "data.user"
          }
        }
      }
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "http://localhost:5000"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["vee-validate/dist/rules"],
    extend: config => {
      const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: ["babel-loader", "vue-svg-loader"]
      });
    }
  }
};