<template>
  <div class="container">
    <h2 class="text-title">Add Post</h2>
    <form class="form" v-on:submit.prevent="publish">
      <div class="post-form">
        <div>
          <div class="form__field mt-0">
            <input type="text" name="title" placeholder="Add title" v-model="post.title">
          </div>
          <div class="post-form__content-mysiwyg">
            <wysiwyg v-model="post.content" />
          </div>
        </div>
        <div>
          <div class="post-form__box">
            <p class="post-form__box-title">Featured Image</p>
            <input type="file" @change="getImage">
          </div>
        </div>
        <button class="btn btn--small post-form__btn" type="submit">Publish<atom-spinner v-if="loading" class="spinner" color="#fff" :size="20"/></button>
      </div>
    </form>
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'
import { mapActions, mapGetters } from 'vuex' 

export default {
  name: 'postForm',
  components: {
    AtomSpinner
  },
  data: () => ({
    post: {
      title: '',
      content: '',
      featuredImage: '',
      idUser: ''
    }
  }),
  computed: {
    ...mapGetters('posts', ['loading'])
  },
  methods: {
    ...mapActions('posts', ['savePost']),
    toBase64 (file) {
      return new Promise((resolve,reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      }) 
    },
    getImage (e) {
     this.toBase64(e.target.files[0])
      .then(result => {
        this.post.featuredImage = result
      })
      .catch(err => {
        console.log(err)
      })
    },
    publish () {
      this.post.idUser = this.$store.state.login.user.id
      this.savePost(this.post)
    }
  }
}
</script>