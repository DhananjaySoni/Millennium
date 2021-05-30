import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
// import MockService from "@/core/mock/mock.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { NEEDS_TO_RECONNECT } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";
import { SET_MAC_ID } from "@/core/services/store/customstore.module";
import { SET_LAST_CONNECTED_TIME } from "@/core/services/store/connection.module";
import { machineIdSync } from "node-machine-id";
import { CUSTOM_RECONNECTED_SUCCESSFULLY } from "@/core/services/store/auth.module";
import Swal from 'sweetalert2'


const dns = require("dns");
let isConnected = false;

function liveCheck() {
  dns.resolve("www.google.com", function(err, addr) {
    if (err) {

      var d = new Date( store.getters.get_last_connected_time );

      if (store.getters.get_days_until_last_connected > 30) {
        store.dispatch(NEEDS_TO_RECONNECT, "");
      }
      // console.log("connection error");


      isConnected = false;

    } else {

      var d = new Date();
      var today = d.toDateString();
      // console.log(today);
      store.dispatch(SET_LAST_CONNECTED_TIME, {
        time: today
      });

      var d = new Date( store.getters.get_last_connected_time );
      // console.log("last accessed time : " + store.getters.get_last_connected_time );
      // console.log("days until last connected : " + store.getters.get_days_until_last_connected );

      store.dispatch(CUSTOM_RECONNECTED_SUCCESSFULLY, {});

      // if (isConnected) {
      //   //connection is still up and running, do nothing
      //   alert("still connection gained");
      // } else {
      //   alert("connection gained");
      // }

      isConnected = true;
    }
  });
}


// setInterval(function() {
  liveCheck();
// }, 1000);



// const dirTree = require("directory-tree");

// const tree = dirTree("C:\\proj_MIL\\");
// console.log(tree)

let ida = machineIdSync({ original: true });
// console.log(ida);
store.dispatch(SET_MAC_ID, {
  mac_id: ida
});


// dirpath = dirpath + "\\My Deeds";

// if (!fs.existsSync( dirpath )) {
//     fs.mkdir( dirpath , function (err) {
//         if (err) {
        // console.log(err)
//         } else {
        // console.log("success")
//         }
//     })
// }

// store.dispatch(INI_FILE_SYSTEM);






Vue.config.productionTip = false;
// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";
// import { axios } from "vue/types/umd";


// API service init
ApiService.init();

ApiService.post(
  "post_mac_id/",
  {
    mac_id: ida
  },

  // Remove this to disable mock API
  // MockService.init();

  router.beforeEach((to, from, next) => {
    // Ensure we checked auth before each page load.
    Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

    // reset config to initial state
    store.dispatch(RESET_LAYOUT_CONFIG);

    // Scroll page to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  })
),
  new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
