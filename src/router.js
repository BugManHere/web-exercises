import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require('./page/Home.vue')), 'home');
const sudoku = r => require.ensure([], () => r(require('./page/sudoku.vue')), 'sudoku');

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/sudoku',
      name: 'sudoku',
      component: sudoku
    }
  ]
});
export default router;
