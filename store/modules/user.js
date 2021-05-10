const state = {
  user: {
    name: 'Test Test',
    id: 1
  }
}

const getters = {
  user: (state) => {
    return state.user
  }
}

export default {
  getters,
  state
}
