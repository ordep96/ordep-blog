<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters('login', ['userLoading'])
  }
}
</script>