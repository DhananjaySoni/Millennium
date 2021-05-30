// import objectPath from "object-path";
import JwtService from "@/core/services/jwt.service";
import jwtService from "../jwt.service";

// action types
export const SET_LAST_CONNECTED_TIME = "setLastConnectedTime";

// mutation types

export default {
  state: {
  },
  getters: {
    get_last_connected_time(state) {
      return JwtService.getLastOnlineTime();
    },
    get_days_until_last_connected(state) {

      var last_online_time = new Date( JwtService.getLastOnlineTime() );
      var today = new Date();

      return Math.ceil( ( today - last_online_time ) / (1000 * 60 * 60 * 24) );
    }
  },
  actions: {
    [SET_LAST_CONNECTED_TIME](state, payload) {
      state.commit(SET_LAST_CONNECTED_TIME, payload);
    }
  },
  mutations: {
    [SET_LAST_CONNECTED_TIME](state, payload) {
      JwtService.saveLastOnlineTime(payload.time);
    }
  }
};
