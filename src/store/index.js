import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Fabulous: 0,
    Browse: 0,
    BlogNum: 0
  },
  mutations: {
    addFabulous (state) {
      state.Fabulous++
    },
    addBrowse (state) {
      state.Browse++
    }
  },
  actions: {
  },
  modules: {
  }
})
