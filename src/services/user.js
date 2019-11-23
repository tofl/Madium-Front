const axios = require('axios');
import config from './config.json';

const back = axios.create({
  baseURL: config.backend,
  withCredentials: true
});

async function login(email, password) {
  let results = await back.post("/users/login", {
    email,
    password
  });
  
  return results;
}

async function getUser(id) {
  let userId = id ? id : "";
  
  let user;
  try {
    user = await back.get("/users/" + userId);
  } catch (e) {
    console.log(e);
    return null;
  }
  return user.data;
}

async function logout() {
  try {
    await back.get("/users/logout");
    return;
  } catch(e) {
    return;
  }
}

export {
  login,
  getUser,
  logout
};