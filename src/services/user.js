const axios = require('axios');
//const config = require('./config');
import config from './config.json';
//const path = require('path');


export default async function getUser(id) {
  let userId = id ? id : "";
  
  try {
    let user = await axios.get(config.backend + "/users/" + userId);
    return user.data;
  } catch (e) {
    return null;
  }
}