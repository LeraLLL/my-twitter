import { Store } from 'vuex'
import user from './modules/user'
import theme from './modules/theme'

const modules = {
  user,
  theme
}

const state = () => ({})

const getters = {}

const actions = {}

const mutations = {}

const createStore = () => new Store({
  modules,
  state,
  getters,
  actions,
  mutations
})

export default createStore
