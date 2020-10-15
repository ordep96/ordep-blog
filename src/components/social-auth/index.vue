<template>
  <nav class="social-auth">
    <ul class="social-auth__list">
      <li class="socila-auth__item"><button @click="googleAuth" class="social-auth__button"><img class="social-auth__icon" src="@/assets/images/google-icon.svg" alt=""></button></li>
      <li class="socila-auth__item"><button class="social-auth__button"><img class="social-auth__icon" src="@/assets/images/twitter.svg" alt=""></button></li>
      <li class="socila-auth__item"><button class="social-auth__button"><img class="social-auth__icon" src="@/assets/images/facebook.svg" alt=""></button></li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'socialAuth',
  methods: {
    ...mapActions('login', ['googleAuth']),
  }
}
</script>