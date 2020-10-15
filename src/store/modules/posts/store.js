import Vue from 'vue'
import { uploadImage } from '@/helpers/cloudinary'
import { apolloClient } from '@/helpers/apollo/apollo'
import { addPostMutation, fetchPostQuerie, fetchPostById, addLikeMutation } from '@/helpers/apollo/queries'

const ADD_POST = 'ADD_POST'
const LOADING_POST = 'LOADING_POST'
const ADD_POST_FETCH = 'ADD_POST_FETCH'
const SET_POST = 'SET_POST'
const UPDATE_POST_LIKES = 'UPDATE_POST_LIKES'

export const PostStore = {
  namespaced: true,
  state: {
    posts: [],
    post: {},
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
    },
    [SET_POST] (state,post) {
      state.post = post
    },
    [UPDATE_POST_LIKES] (state, data) {
      let postIndex = state.posts.findIndex(post => post.id === data.id);
      Vue.set(state.posts[postIndex], 'likes', data.likes)
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
    },
    getPostById: async ({commit}, idPost ) => {
      let { data } = await apolloClient.query({query: fetchPostById, variables: { id: idPost }})
      commit(SET_POST, data)
    },
    addPostLike: async ({commit}, value) => {
      let { data } = await apolloClient.mutate({mutation: addLikeMutation, variables: { id: value.id, likes: value.likes }})
      console.log(data)
      if ( data.update_posts.affected_rows ) {
        commit(UPDATE_POST_LIKES, data.update_posts.returning[0])
      }
    }
  },
  getters: {
    loading: state => state.loading,
    posts: state => state.posts,
    detailsPost: state => state.post
  }
}