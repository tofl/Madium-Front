import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

// Components :
import Home from './components/Home.vue';
import Signup from './components/Signup';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: Signup },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
