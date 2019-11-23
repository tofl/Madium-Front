<template>
  <div id="app">
    <Header :user="user"></Header>
  </div>
</template>

<script>
import Header from './components/Header';
import getUser from './services/user';


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
