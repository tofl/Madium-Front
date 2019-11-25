<template>
  <div>
    <h2 v-if="!user">Derniers articles</h2>
    <h2 v-else>Abonnement</h2>

    <div class="posts">
      <span v-if="posts.length > 0">
        <router-link to="/post/new">Nouveau post</router-link>
      </span>
      <p v-if="posts.length === 0">Il n'y a pas d'articles à afficher pour le moment...</p>

      <div v-else v-for="post in posts" :key="post.id" class="post">
        <h3><router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link></h3>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getFollowersPosts, getLatestPosts } from './../services/post';

  export default {
    name: 'Home',
    props: {
      user: Object
    },
    data() {
      return {
        posts: []
      }
    },
    async mounted() {
      if (this.user) {
        this.posts = await getFollowersPosts(1);
      } else {
        this.posts = await getLatestPosts(1);
      }
    },
    watch: {
      user: async function() {
        if (this.user) {
          this.posts = await getFollowersPosts(1);
        } else {
          this.posts = await getLatestPosts(1);
        }
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .post {
    margin-bottom: 20px;
  }
</style>
