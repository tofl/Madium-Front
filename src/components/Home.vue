<template>
  <div>
    <Header :user="user" @login="hydrateUser"></Header>
  </div>
</template>

<script>
  import Header from './Header';
  import { getUser } from './../services/user';


  export default {
    name: 'app',
    components: {
      Header
    },
    data() {
      return {
        user: null
      }
    },
    methods: {
      hydrateUser(userData) {
        this.user = userData;
      }
    },
    async created() {
      this.user = await getUser();
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
