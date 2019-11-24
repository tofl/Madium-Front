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

async function newUser(firstname, lastname, email, password) {
  let newUser = await back.post("/users/new", {firstname, lastname, email, password});
  
  return newUser.data;
}

async function updateUser(id, firstname, lastname, email, password) {
  return back.put("/users/" + id, {
    firstname,
    lastname,
    email,
    password
  });
}

export {
  login,
  getUser,
  logout,
  newUser,
  updateUser
};