<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
  import { getPost } from "../services/post";

  export default {
    name: 'Post',
    data() {
      return {
        post: null
      }
    },
    async created() {
      this.post = await getPost(this.$route.params.id);
    }
  }
</script>

<style></style>