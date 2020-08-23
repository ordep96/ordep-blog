<template>
  <div class="container">
    <Posts :posts="posts"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Posts from '@/components/Posts/Posts'

export default {
  name: 'Home',
  components: {
    Posts
  },
  computed: {
    ...mapGetters('login',['user']),
    ...mapGetters('posts',['posts'])
  },
  methods: {
    ...mapActions('posts', ['fetchPosts'])
  },
  mounted () {
    this.fetchPosts();
  }
}
</script>
