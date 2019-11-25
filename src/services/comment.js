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

export {
  getComments
}