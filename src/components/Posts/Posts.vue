<template>
  <section class="posts">
    <Post v-for="post in posts" :key="post.id" :post="post"/>
  </section>
</template>

<script>
import Post from './Post'

export default {
  name: 'Posts',
  props: ['posts'],
  components: {
    Post
  }
}
</script>