<template>
  <div v-if="currentTheme" :class="theme">
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  data () {
    return {
      currentTheme: null
    }
  },
  methods: {
    ...mapMutations([
      'setTheme'
    ]),
    loadStyle (theme) {
      if (theme === 'light') {
        import('@/assets/style/light.less')
      } else {
        import('@/assets/style/dark.less')
      }
    }
  },
  watch: {
    theme: {
      handler (theme, oldTheme) {
        localStorage.setItem('currentTheme', theme)
      }
    }
  },
  mounted () {
    this.currentTheme = localStorage.getItem('currentTheme') || 'light'
    this.setTheme(this.currentTheme)
    this.loadStyle(this.currentTheme)
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
