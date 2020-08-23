<template>
  <article class="post">
    <router-link class="post__link" :to="{ name: 'detailPost', params: { idPost: post.id }}">
      <div class="post__content-image">
        <img class="post__image" :src="post.featuredImage" :alt="post.title">
      </div>
      <div class="post__body">
        <h2 class="post__title">{{ post.title }}</h2>
        <p class="post__author">by {{ post.user.displayName }}</p>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: ['post']
}
</script>