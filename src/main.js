import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import VueFire from "vuefire";
import VueToastr2 from "vue-toastr-2";
import Vuetify from 'vuetify';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dom } from '@fortawesome/fontawesome-svg-core';
import store from '@/store';
import {app} from "@/firebaseConfig";

import '@fortawesome/fontawesome-free/css/all.css'; 
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import 'vuetify/dist/vuetify.min.css';

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.prototype.$user = null;
Vue.prototype.$auth = false;

window.toastr = require("toastr");

dom.watch();

Vue.use(VueToastr2);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueFire);

Vue.use(Vuetify, {
  iconfont: 'fa'
});

// export const AppGlobal = new Vue({
//   render: h => h(App),
//   router, 
//   store
// }).$mount("#app");

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    app.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    })
  }
})