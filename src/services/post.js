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

export {
  getFollowersPosts
};