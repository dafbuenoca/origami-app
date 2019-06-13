import Router from "vue-router";
import Vue from "vue";
import Origami from "@/components/Origami";
import AddFigure from "@/components/FigureForm";
import Login from "@/components/Login";
import store from "../store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Origami',
      component: Origami,
    },
    {
      path: '/figure',
      name: 'AddFigure',
      component: AddFigure,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  
  const currentUser = store.getters.auth;

  if(currentUser && (to.path === '/figure')){
    next();
  } else if (!currentUser && (to.path === '/figure')){
    next('login');
  }else if (currentUser && (to.path === '/login')) {
    next('/')
  }else{
    next();
  }

});

export default router;
