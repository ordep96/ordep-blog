import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from './helpers/apollo/apollo'
import wysiwyg from 'vue-wysiwyg'
import './registerServiceWorker'
import '@/stylesheet/style.scss'
import { isLoginUser } from '@/helpers/auth'


Vue.use(wysiwyg, {})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

isLoginUser( user => {
  if ( user ) {
    store.dispatch('login/currentUser', { displayName: user.displayName, email: user.email, photoUrl: user.photoURL, id: user.uid})
  }
})