export default {
  // Global page headers
  head: {
    title: 'MT5 Equity Tor Monitor',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MT5 Equity Tor Monitor' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
    ]
  },

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Plugins
  plugins: [],

  // Auto import components
  components: true,

  // Modules
  modules: ['@nuxtjs/tailwindcss'],

  // Server middleware untuk API proxy
  serverMiddleware: [
    '~/serverMiddleware/api-history.js'
  ],

  // Build configuration
  build: {
    transpile: ['chart.js']
  },

  // Server-side rendering
  ssr: false,

  // Generate configuration for static deployment (SPA mode)
  generate: {
    fallback: true,
    dir: 'dist'
  },
  
  // Target static
  target: 'static'
}

