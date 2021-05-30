import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import router from "@/router.js"
import { main } from "@popperjs/core";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "get_auth_token";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";
export const PENDING_LICENCE_LOGIN = "pending_licence_login";
export const EXPIRED_LICENCE_LOGIN = "expired_licence_login";
export const NEEDS_TO_RECONNECT = "needs_to_reconnect";
export const CUSTOM_RECONNECTED_SUCCESSFULLY = "custom_reconnect_successfully";
export const INCREMENT_EXPIRED_MY_DEEDS_COUNT = "increment_expired_my_deeds_count";

// mutation types
export const PURGE_AUTH = "purge_auth_logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";
export const MUTATION_PENDING_LICENCE_LOGIN = "mutation_pending_licence_login";
export const MUTATION_EXPIRED_LICENCE_LOGIN = "mutation_expired_licence_login";
export const MUTATION_NEEDS_TO_RECONNECT = "mutation_needs_to_reconnect";
export const MUTATION_CUSTOM_RECONNECTED_SUCCESSFULLY = "mutation_reconnect_successfully";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  expired_my_deeds_count: 0,
  // hash: '',
  // is_subscription_expired: false,
  // days_till_expiration: 365,
  // name_required: false,
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getErrors(state) {
    return state.errors;
  },
  getExpiredMyDeedsCount(state) {
    return state.expired_my_deeds_count;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("post_mac_id/", credentials)
        .then(({ data }) => {
          if (data.status != "error") {
            context.commit(SET_AUTH, data);
            resolve(data);
          } else {

            var main_error = "";

            if ( data.message == "You have maxed out your device limit" ) {
              main_error = "You have maxed out your activation limit. Feel free to reach at 0291-2751422";
            } else if ( data.message == "User not found" ) {
              main_error = "Feed in an authorized number or contact 0291-2751422";
            } else {
              main_error = data.message;
            }

            context.commit(SET_ERROR, main_error);
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.post("verify_token/", {
        Authorization: "Token " + JwtService.getToken()
      })
        .then(({ data }) => {
          // console.log("===========>>>>>>");

          if(data.status == "success") {

            if (data.licence_status == "Licenced") {

              // console.log("licenced");
    
            } else if ( data.licence_status == "Expired" ) {
              context.commit(MUTATION_EXPIRED_LICENCE_LOGIN, data);
              // context.state.error = "Your software is not Licenced!";
            } else {
              context.commit(MUTATION_PENDING_LICENCE_LOGIN, data);
              // context.state.error = "Your software is not Licenced!";
            }
          } else {
            context.commit(SET_AUTH, data);
          }
        })
        .catch(({ response }) => {
          
          context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [NEEDS_TO_RECONNECT](context, payload) {
    context.commit(MUTATION_NEEDS_TO_RECONNECT, payload);
  },
  [CUSTOM_RECONNECTED_SUCCESSFULLY](context, payload) {
    context.commit(MUTATION_CUSTOM_RECONNECTED_SUCCESSFULLY, payload);
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = { email, username, bio, image };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data);
      return data;
    });
  },
  [INCREMENT_EXPIRED_MY_DEEDS_COUNT](context) {
    context.commit(INCREMENT_EXPIRED_MY_DEEDS_COUNT);
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, data) {
    state.user.name = "";
    // state.user = data.user;
    if (data.status == "success") {
      JwtService.saveToken(data.token);
      state.isAuthenticated = true;
      state.errors = {};
    } else if (data.status == "error") {
      JwtService.destroyToken();
      state.isAuthenticated = false;
      state.errors = data.message;
    }
    // state.hash = data.hash;
    // state.is_subscription_expired = data.is_subscription_expired;
    // state.days_till_expiration = data.days_till_expiration;
    // state.name_required = data.name_required;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
  [MUTATION_PENDING_LICENCE_LOGIN](state, data) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = data.message;
    JwtService.destroyToken();
    router.push("/login")
  },
  [MUTATION_EXPIRED_LICENCE_LOGIN](state, data) {
    state.isAuthenticated = true;
    state.user.name = "";
    if (data.status == "success") {
      state.isAuthenticated = true;
      state.errors = {"error": "Your Licence is Lapsed! Some functionalities are disabled!", type: "licence_expired"};
    } else if (data.status == "error") {
      JwtService.destroyToken();
      state.isAuthenticated = false;
      state.errors = data.message;
    }
    // router.push("/login")
  },
  [MUTATION_NEEDS_TO_RECONNECT](state, data) {
    state.isAuthenticated = true;
    state.user.name = "";
    state.errors = {"error": "You need to reconnect to Internet!", type: "needs_to_reconnect"};
    // router.push("/login")
  },
  [MUTATION_CUSTOM_RECONNECTED_SUCCESSFULLY](state, data) {
    state.isAuthenticated = true;
    state.user.name = "";
    state.errors = {};
  },
  [INCREMENT_EXPIRED_MY_DEEDS_COUNT](state) {
    state.expired_my_deeds_count += 1;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
