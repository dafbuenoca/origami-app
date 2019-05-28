import Vue from "vue";
import App from "./App.vue";

import BootstrapVue from "bootstrap-vue";
import VueFire from "vuefire";
import VueToastr2 from "vue-toastr-2";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";

window.toastr = require("toastr");

Vue.use(VueToastr2);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueFire);

new Vue({
  render: h => h(App)
}).$mount("#app");
