<template>
  <form @submit.prevent="send">
    <input type="text" v-model="title" placeholder="Titre" />
    <br /><br />
    <textarea cols="50" rows="10" placeholder="Article (plus de 10 caractères)" v-model="content"></textarea>
    <br /><br />
    <input type="submit" value="Publier" />
  </form>
</template>

<script>
  import { publish } from "./../services/post";

  export default {
    name: 'NewPost',
    data() {
      return {
        title: '',
        content: ''
      };
    },
    methods: {
      send: async function() {
        if (this.title < 2 || this.content < 5) {
          return;
        }

        let id = await publish(this.title, this.content);
        this.$router.push('/post/' + id);
      }
    }
  }
</script>

<style scoped>
  input {
    width: 200px;
  }
</style>