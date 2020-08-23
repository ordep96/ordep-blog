import { uploadImage } from '@/helpers/cloudinary'
import { apolloClient } from '@/helpers/apollo/apollo'
import { addPostMutation, fetchPostQuerie } from '@/helpers/apollo/queries'

const ADD_POST = 'ADD_POST'
const LOADING_POST = 'LOADING_POST'
const ADD_POST_FETCH = 'ADD_POST_FETCH'

export const PostStore = {
  namespaced: true,
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    [ADD_POST] (state,post) {
      state.posts = state.posts.push(post)
    },
    [LOADING_POST] (state,value) {
      state.loading = value
    },
    [ADD_POST_FETCH] (state,posts) {
      state.posts = posts
    }
  },
  actions: {
    savePost ({commit}, post) {
      commit(LOADING_POST, true)
      uploadImage(post.featuredImage, post.title, async (err,result) => {
        if (!err) {
          post.featuredImage = result.url
          console.log(post)
          const { data } = await apolloClient.mutate({ mutation: addPostMutation, variables: post })
          if ( data.insert_posts.affected_rows ) {
            commit(LOADING_POST, false)
            commit(ADD_POST, data.insert_posts.returning[0])
          }
        }
      })
    },
    fetchPosts: async ({commit}) => {
      let { data } = await apolloClient.query({query: fetchPostQuerie})
      commit(ADD_POST_FETCH, data.posts)
    }
  },
  getters: {
    loading: state => state.loading,
    posts: state => state.posts
  }
}