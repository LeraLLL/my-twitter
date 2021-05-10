export default {
  head: {
    title: 'twitter',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/style/ant.less'
  ],
  styleResources: {
    scss: ['~/assets/style/*.scss']
  },
  plugins: [
    '@/plugins/antd-ui'
  ],
  components: true,
  buildModules: [
  ],
  modules: ['@nuxtjs/style-resources'],
  build: {
    // loaders: {
    //   less: {
    //     lessOptions: {
    //       modifyVars: {
    //         'primary-color': '#1DA57A',
    //         'link-color': '#1DA57A',
    //         'border-radius-base': '2px'
    //       },
    //       javascriptEnabled: true
    //     }
    //   }
    // }
  }
}
