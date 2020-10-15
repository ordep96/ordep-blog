<template>
  <article class="post">
    <div class="post__content-image">
      <img class="post__image" :src="post.featuredImage" :alt="post.title">
      <div v-if="user" class="like-content">
        <div :class="[like ? 'heartAnimation' : '', 'like']" @click="likePost">
          <span class="like__text">{{ post.likes }}</span>
        </div>
      </div>
    </div>
    <router-link class="post__link" :to="{ name: 'detailPost', params: { idPost: post.id }}">
      <div class="post__body">
        <h2 class="post__title">{{ post.title }}</h2>
        <p class="post__author">by {{ post.user.displayName }}</p>
      </div>
    </router-link>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Post',
  props: ['post'],
  data: () => ({
    like: false,
    likes: 0
  }),
  computed: {
    ...mapGetters('login', ['user'])
  },
  methods: {
    ...mapActions('posts', ['addPostLike']),
    likePost () {
      this.like = !this.like;
      if ( this.like ) {
        this.likes++
        this.addPostLike({id: this.post.id, likes: this.likes})
      }
    }
  },
  mounted () {
    this.likes = this.post.likes
  }
}
</script>