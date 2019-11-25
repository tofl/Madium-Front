<template>
  <div>
    <div class="post" v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>

    <div v-else>
      Veuillez patienter...
    </div>

    <h3>Commentaires...</h3>
    <div class="comments" v-if="waitingForComments">
      En attente des commentaires...
    </div>
    <div v-if="!waitingForComments && comments.length > 0">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <p>{{ comment.content }}</p>
        <span>Par <router-link :to="{ name: 'user', params: { id: comment.author_id } }">{{ comment.author }}</router-link></span>
      </div>
    </div>
    <p v-if="!waitingForComments && comments.length === 0">Il n'y a pas de commentaires à afficher.</p>
  </div>
</template>

<script>
  import { getPost } from "../services/post";
  import { getComments } from "../services/comment";
  import { getUser } from "../services/user";

  export default {
    name: 'Post',
    data() {
      return {
        post: null,
        comments: [],
        postId: null,
        waitingForComments: true
      }
    },
    async created() {
      this.postId = this.$route.params.id;
      this.post = await getPost(this.$route.params.id);

      let comments = await getComments(this.postId);
      comments.forEach(async comment => {
        let author = await getUser(comment.id);
        comment.author = author.firstname + " " + author.lastname;
      });
      this.comments = comments;
      this.waitingForComments = false;
    }
  }
</script>

<style scoped>
  h3 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .comment {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
    margin-bottom: 20px;
    font-size: 1.1em;
  }

  .comment span {
    font-size: 0.8em;
  }
</style>