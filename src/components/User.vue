<template>
  <div class="showUser">
    <div class="subscribe" v-if="user && userInfo && userInfo.id !== user.id">
      <button v-if="subscribed" @click="unsubscribe">Se désabonner</button>
      <button v-else @click="subscribe">S'abonner</button>
    </div>

    <h2>Lire une fiche utilisateur</h2>
    <ul class="userInfo" v-if="userInfo">
      <li>Prénom : {{ userInfo.firstname }}</li>
      <li>Nom de famille : {{ userInfo.lastname }}</li>
      <li>Email : {{ userInfo.email }}</li>
    </ul>


    <form v-if="userInfo && user && user.id === userInfo.id" @submit.prevent="updateUserSubmit">
      <h3>Modifier le profil</h3>
      <input type="text" v-model="formData.firstname">
      <input type="text" v-model="formData.lastname"><br />
      <input type="email" v-model="formData.email"><br /><br />

      <label>Confirmation par mot de passe : </label>
      <input type="password" placeholder="Mot de passe" v-model="formData.password">
      <br /><br />

      <input type="submit" value="Valider les changements">
    </form>
  </div>
</template>

<script>
  import { getUser, updateUser, subscribe, unsubscribe, isSubscribed } from "../services/user";

  export default {
    name: 'User',
    props: {
      user: Object
    },
    data() {
      return {
        userInfo: null,
        formData: null,
        subscribed: false
      };
    },
    methods: {
      updateUserSubmit: async function() {
        if (this.formData.firstname.length < 2 || this.formData.lastname.length < 2 || this.formData.email.length < 4) {
          return;
        }
        await updateUser(this.formData.id, this.formData.firstname, this.formData.lastname, this.formData.email, this.formData.password);

        let newUserData = await getUser();
        this.$emit('login', newUserData);
      },
      subscribe: async function() {
        await subscribe(this.userInfo.id);
        this.subscribed = true;
      },
      unsubscribe: async function() {
        await unsubscribe(this.userInfo.id);
        this.subscribed = false;
      }
    },
    async mounted() {
      this.userInfo = await getUser(this.$route.params.id);
      this.formData = Object.assign({}, this.user);

      // Check if the user is subscribed :
      if (this.user) {
        this.subscribed = (await isSubscribed(this.user.id, this.userInfo.id)).data;
      }
    },
    watch: {
      '$route.params.id': async function (id) {
        this.userInfo = await getUser(id);
      },
      user: function() {
        this.formData = Object.assign({}, this.user);
      }
    }
  }
</script>

<style scoped>
  form {
    margin-top: 10px;
  }
</style>