<template>
  <div class="header">
    <div class="right">Madium</div>

    <!-- If the user is currently logged in -->
    <div v-if="user" class="right">Bonjour</div>

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
      submitLogin: () => {
        console.log("yeah");
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