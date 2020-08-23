<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <router-link to="/">
        <span>ordep-blog</span>
      </router-link>
    </div>
    <div v-if="user" class="navbar__user">
      <router-link
        to="/profile"
      >
        <img class="navbar__user-photo" :src="user.photoUrl" :alt="user.displayName">
      </router-link>
    </div>
    <ul v-else class="navbar__menu">
      <li class="navbar__item"><router-link class="navbar__link" to="/login">Login</router-link></li>
      <li class="navbar__item"><router-link class="navbar__link" to="/register">Register</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters('login',['user'])
  },
  methods: {
    ...mapActions('login',['logoutUser']),
    logOut () {
      this.logoutUser()
    }
  },
  mounted () {
    console.log(this.user)
  }
}
</script>