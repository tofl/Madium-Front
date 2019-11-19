const axios = require('axios');
//const config = require('./config');
import config from './config.json';
//const path = require('path');


export default async function getUser() {
  //await require('fs').readFile('./config.json', 'utf8');
  let user = await axios.get(config.backend + "/users/");
  return user.data;
}