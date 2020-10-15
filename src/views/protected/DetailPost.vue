<template>
  <div>
    <singlePost :details="detailsPost"/>
  </div>
</template>

<script>
import singlePost from '@/components/singlePost';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DetailPost',
  components: {
    singlePost
  },
  computed: {
    ...mapGetters('posts',['detailsPost'])
  },
  methods: {
    ...mapActions('posts',['getPostById'])
  },
  mounted () {
    this.getPostById(this.$route.params.idPost)
  }
}
</script>