const axios = require('axios');
import config from './config.json';

const back = axios.create({
  baseURL: config.backend,
  withCredentials: true
});

async function getComments(postId) {
  let comments;
  try {
    comments = await back.get("/comments/" + postId);
    return comments.data
  } catch (e) {
    return [];
  }
}

async function postComment(content, postId) {
  await back.post("/comments/new/" + postId, {
    content
  });
}

export {
  getComments,
  postComment
}