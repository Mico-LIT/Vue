//import axios from "axios";
//import http from "@/core/baseAxios";
//import { accountService } from "@/_services/accountService";

export const state = {
  currentUser: getSavedState("auth.currentUser")
};

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState("auth.currentUser", newValue);
    //setDefaultAuthHeaders(state);
  }
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  }
};

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    //setDefaultAuthHeaders(state);
    dispatch("validate");
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, user = {}) {
    commit("SET_CURRENT_USER", user);

    //if (getters.loggedIn) return dispatch("validate");
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit("SET_CURRENT_USER", null);
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    //   if (!state.currentUser) return Promise.resolve(null)
    //   return axios
    //     .get('/api/session')
    //     .then((response) => {
    //       const user = response.data
    //       commit('SET_CURRENT_USER', user)
    //       return user
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.status === 401) {
    //         commit('SET_CURRENT_USER', null)
    //       }
    //       return null
    //     })
    // }
  }
};

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

// function setDefaultAuthHeaders(state) {
//   axios.defaults.headers.common.Authorization =
//     "Bearer  " + (state.currentUser ? state.currentUser.token : "");
// }
