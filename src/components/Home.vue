<template>
  <div>
    <h2 v-if="!user">Derniers articles</h2>
    <h2 v-else>Abonnement</h2>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      user: Object
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
