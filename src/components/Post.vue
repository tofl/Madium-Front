<template>
  <div>
    <div class="post" v-if="post">
      <h2>{{ post.title }}</h2>
      <span style="font-style: italic;">Le {{ post.date }}. <router-link :to="{ name: 'user', params: { id: post.author_id }}">Auteur</router-link></span>
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

    <div v-if="user">
      <h4>Nouveau commentaire :</h4>
      <form @submit.prevent="submitComment">
        <textarea cols="60" rows="5" placeholder="Votre commentaire" v-model="newComment"></textarea>
        <br />
        <input type="submit" value="Envoyer">
      </form>
    </div>
  </div>
</template>

<script>
  import { getPost } from "../services/post";
  import { getComments, postComment } from "../services/comment";
  import { getUser } from "../services/user";

  export default {
    name: 'Post',
    props: {
      user: Object
    },
    data() {
      return {
        post: null,
        comments: [],
        waitingForComments: true,
        newComment: ''
      }
    },
    async created() {
      this.post = await getPost(this.$route.params.id);

      let allComments = await getComments(this.$route.params.id);
      this.comments = allComments.map(async comment => {
        let author = await getUser(comment.author_id);
        comment.author = author.firstname + " " + author.lastname;

        return comment;
      });
      this.comments = await Promise.all(this.comments);
      this.waitingForComments = false;
    },
    methods: {
      submitComment: async function() {
        if (this.newComment.length < 5) {
          return;
        }

        await postComment(this.newComment, this.$route.params.id);
        let lastComment = {
          author: this.user.firstname + " " + this.user.lastname,
          author_id: this.user.id,
          content: this.newComment,
          id: this.comments[this.comments.length - 1].id + 1
        };
        this.comments.push(lastComment);
        this.newComment = "";
      }
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