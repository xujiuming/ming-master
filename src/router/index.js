import Vue from 'vue';
import Router from 'vue-router';
import Ming from "../components/Ming";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ming',
      component: Ming,
    },
  ],
});
