<template>
  <div>
    <h2>Sign up</h2>
    <form @submit.prevent="submitForm">
      <label for="firstname">First name :</label> <input v-model="userData.firstname" type="text" id="firstname" placeholder="First name" /><br />
      <label for="lastname">Last name :</label> <input v-model="userData.lastname" type="text" id="lastname" placeholder="Last name" /><br />
      <label for="email">Email :</label> <input v-model="userData.email" type="email" id="email" placeholder="Email"><br />
      <label for="password">Password :</label> <input v-model="userData.password" type="password" id="password" /><br />
      <input type="submit" value="Sign up">
    </form>
  </div>
</template>

<script>
  import { getUser, newUser } from './../services/user';

  export default {
    name: 'Signup',
    data() {
      return {
        userData: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        }
      };
    },
    methods: {
      async submitForm() {
        let userId = await newUser(
          this.userData.firstname,
          this.userData.lastname,
          this.userData.email,
          this.userData.password
        );

        let user = await getUser(userId.userId);
        console.log(user);

        // Redirect to homepage
      }
    }
  }
</script>

<style></style>