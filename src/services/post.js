const axios = require('axios');
import config from './config.json';

const back = axios.create({
  baseURL: config.backend,
  withCredentials: true
});

async function getFollowersPosts(page) {
  let posts = await back.get('/posts/follow/' + page);
  return posts.data;
}

async function getLatestPosts(page) {
  let posts = await back.get('/posts/page/' + page);
  return posts.data;
}

async function getPost(id) {
  let post = await back.get('/posts/' + id);
  return post.data;
}

async function publish(title, content) {
  console.log('appe');
  let postId = await back.post("/posts/new", {
    title,
    content
  });
  console.log(postId.data);
  return postId.data.id;
}

export {
  getFollowersPosts,
  getLatestPosts,
  getPost,
  publish,
};