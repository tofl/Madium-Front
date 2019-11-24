<template>
  <div id="app">
    <Header :user="user" @login="importUser" @logout="user = null"></Header>
    <div class="main-wrapper">
      <router-view :user="user" @login="importUser"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import { getUser } from './services/user';


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
    importUser(userData) {
      this.user = userData;
    }
  },
  async created() {
    this.user = await getUser();
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .main-wrapper {
    width: 90%;
    margin: auto;
  }
</style>
