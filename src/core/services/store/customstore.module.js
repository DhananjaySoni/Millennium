// import objectPath from "object-path";

// action types
export const SET_MAC_ID = "setMacID";

// mutation types

export default {
  state: {
    mac_id: "",
    hash: ""
  },
  getters: {
    getmac_id(state) {
      return state.mac_id;
    }
  },
  actions: {
    [SET_MAC_ID](state, payload) {
      state.commit(SET_MAC_ID, payload.mac_id);
    }
  },
  mutations: {
    [SET_MAC_ID](state, payload) {
      state.mac_id = payload;
    }
  }
};
