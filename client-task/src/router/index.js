import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskMain from '../views/TaskMain.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'list',
    component: TaskMain
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/TaskEdit.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
});

export default router;
