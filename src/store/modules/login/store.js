import { signUp, signIn, logOut } from '@/helpers/auth'
import { avatarGenerate } from '@/helpers/image'
import router from '@/router'
import { apolloClient } from '@/helpers/apollo/apollo'
import { addUserMutation } from '@/helpers/apollo/queries'

const SET_USER = 'SET_USER'
const SET_USER_ERROR = 'SET_USER_ERROR'
const SET_LOADING = 'SET_LOADING'

const saveLoginLocal = (value) => localStorage.setItem('userLogged', value)

export const LoginStore = {
  namespaced: true,
  state: {
    user: '',
    errorUser: {
      error: false,
      message: ''
    },
    loadingUser: true,
    loading: false
  },
  mutations: {
    [SET_USER] (state,user) {
      state.user = user
      state.loadingUser = false
    },
    [SET_USER_ERROR] (state, messageError) {
      state.errorUser.error = true
      state.errorUser.message = messageError
    },
    [SET_LOADING] (state,value) {
      state.loading = value
    }
  },
  actions: {
    registerUser: async ({commit}, payload) => {
      try {
        let response = await signUp(payload.email,payload.password)
        response.user.updateProfile({displayName: payload.username, photoURL: avatarGenerate()})
          .then(async () => {
            const { data } = await apolloClient.mutate({ mutation: addUserMutation, variables: { displayName: response.user.displayName, photoUrl: response.user.photoURL, email: response.user.email, uid: response.user.uid}})
            console.log(data)
            
            commit(SET_USER, {
              displayName: response.user.displayName,
              email: response.user.email,
              photoUrl: response.user.photoURL,
              id: response.user.uid
            })
    
            saveLoginLocal(true)
            router.push("/")
          })
          .catch(err => {
            console.log(err)
          })
        
      } catch(err) {
        console.log(err)
      }
    },
    loginUser: async ({commit},payload) => {
      commit(SET_LOADING, true)
      try {
        let response = await signIn(payload.email,payload.password)
        console.log(response.user)
        commit(SET_USER,{
          displayName: response.user.displayName,
          email: response.user.email,
          photoUrl: response.user.photoURL,
          id: response.user.uid
        })
        saveLoginLocal(true)
        commit(SET_LOADING, false)
        router.push("/")
      } catch (err) {
        commit(SET_LOADING, false)
        commit(SET_USER_ERROR, err.message)
      }
    },
    logoutUser: async ({commit}) => {
      let response = await logOut();
      localStorage.removeItem('userLogged')
      commit(SET_USER, '')
    },
    currentUser: ({commit}, payload) => {
      saveLoginLocal(true)
      commit(SET_USER, payload)
    }
  },
  getters: {
    user: (state) => state.user,
    userLoading: state => state.loadingUser,
    loading: state => state.loading,
    userError: state => state.errorUser
  }
}