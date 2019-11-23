<template>
  <div class="header">
    <div class="right">Madium</div>

    <!-- If the user is currently logged in -->
    <div v-if="user" class="right">
      <button @click="logoutAction()">Logout</button>
    </div>

    <!-- If the user is not logged in -->
    <form v-else class="right" @submit.prevent="submitLogin">
      <div class="input-fields">
        <input v-model="credentials.email" type="email" placeholder="Email" class="email">
        <input v-model="credentials.password" type="password" placeholder="Mot de passe" class="password">
        <button>Go !</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { login, getUser, logout } from './../services/user';

  export default {
    name: 'Header',
    props: {
      user: Object
    },
    data() {
      return {
        credentials: { // The bindings used for the login form
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async submitLogin() {
        if (this.credentials.email.length < 10 || this.credentials.password.length === 0) {
          return;
        }
        await login(this.credentials.email, this.credentials.password);

        let userData = await getUser();
        this.$emit('login', userData);
      },
      async logoutAction() {
        await logout();
      }
    }
  };
</script>

<style scoped>
.header {
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  padding: 10px 100px;
}
</style>