import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

// Components :
import Home from './components/Home.vue';
import Signup from './components/Signup';
import Post from './components/Post';
import User from './components/User';
import NewPost from './components/NewPost';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: Signup },
  { name: 'newPost', path: '/post/new', component: NewPost },
  { name: 'post', path: '/post/:id', component: Post },
  { name: 'user', path: '/user/:id', component: User },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
