<template>
  <div class="header">
    <div class="right">Madium</div>
    <div v-if="user" class="right">Bonjour</div>
    <form v-else class="right">
      <div class="input-fields">
        <input type="text" placeholder="Email" class="email">
        <input type="password" placeholder="Mot de passe" class="password">
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