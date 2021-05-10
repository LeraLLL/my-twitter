const state = {
  theme: 'light'
}

const getters = {
  theme: (state) => {
    return state.theme
  }
}

const mutations = {
  toggleTheme: (state) => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  }
}

export default {
  getters,
  state,
  mutations
}
