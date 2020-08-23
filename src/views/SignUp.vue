<template>
  <div>
    <div class="content-form">
      <form class="form" v-on:submit.prevent="register">
        <div class="form__field">
          <input type="text" name="username" placeholder="username" v-model="user.username">
        </div>
        <div class="form__field">
          <input type="text" name="email" placeholder="email" v-model="user.email">
        </div>
        <div class="form__field">
          <input type="password" name="password" placeholder="password" v-model="user.password">
        </div>
        <button class="form__btn" type="submit">Register</button>
      </form>
      <p class="account-text"> Ya tienes cuenta ? <router-link to="/login">ingresa</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
  data: () => ({
    user: {
      username: '',
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions('login', ['registerUser']),
    register () {
      this.registerUser(this.user)
    }
  }
}
</script>