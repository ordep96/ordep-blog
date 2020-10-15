<template>
  <div>
    <h2>{{ details.post.title }}</h2>
    <div v-html="details.post.content"></div>
  </div>
</template>

<script>
export default {
  name: 'singlePost',
  props: ['details']
}
</script>