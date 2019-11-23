<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getUser } from './services/user';


export default {
  name: 'app',
  components: {

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
