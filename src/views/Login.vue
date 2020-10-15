<template>
  <div>
    <div class="content-form">
      <form class="form" v-on:submit.prevent="login">
        <div class="form__field">
          <input type="text" name="email" placeholder="email" v-model="user.email">
        </div>
        <div class="form__field">
          <input type="password" name="password" placeholder="password" v-model="user.password">
        </div>
        <button class="form__btn" type="submit">login <atom-spinner v-if="loading" class="spinner" color="#fff" :size="20"/></button>
      </form>
      <socialAuth />
      <div v-if="userError.error">
        <span>{{ userError.message }}</span>
      </div>
      <p class="account-text">No tienes cuenta ? <router-link to="/register">registrate</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { AtomSpinner } from 'epic-spinners'
import socialAuth from '@/components/social-auth'

export default {
  name: 'Login',
  components: {
    AtomSpinner,
    socialAuth
  },
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  computed: {
    ...mapGetters('login',['userError', 'loading'])
  },
  methods: {
    ...mapActions('login',['loginUser']),
    login () {
      this.loginUser(this.user)
    }
  }
}
</script>

<style lang="scss" scoped>
  .spinner {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  
</style>