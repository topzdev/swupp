export default {
  env: {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
  },
  cloudinary: {
    cloudName: "topzdev",
    apiSecret: "nbVhrwCnYxHIJqrsgXPdt0mxbb8",
    useComponent: true,
    apiKey: "swupp-dev"
  },
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
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Poppins:wght@400;500;600;700&display=swa"
      }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/css/bootstrap-grid.min.css", "@/assets/sass/main.scss"],

  // Plugins to run before rSendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/vee-validate.js",
    "~/plugins/axios-port.js",
    { src: "~/plugins/infinite-loading", ssr: false },
    { src: "~/plugins/click-outside" },
    { src: "~/plugins/gmap", ssr: false }
  ],

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
    "@nuxtjs/auth-next",
    "@nuxtjs/cloudinary"
  ],

  auth: {
    // Options

    plugins: ["~/plugins/auth.js"],
    strategies: {
      local: {
        token: {
          property: "data.token"
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "data.user"
          // autoFetch: true
        },
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
    transpile: ["vee-validate/dist/rules"]
  }
};
