import Vue from 'vue'
import Vuex from 'vuex'
import { LoginStore } from '@/store/modules/login/store'
import { PostStore } from '@/store/modules/posts/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login: {...LoginStore},
    posts: {...PostStore}
  }
})
