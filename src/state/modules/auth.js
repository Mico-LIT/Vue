//import axios from "axios";
import baseAxios from "../../baseAxios";

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
  logIn({ commit, dispatch, getters }, { userName, password } = {}) {
    // eslint-disable-next-line no-debugger
    debugger;

    //if (getters.loggedIn) return dispatch("validate");

    var body = {
      username: userName,
      password: password,
      grant_type: "password"
    };

    return baseAxios.post("/posts", body).then(response => {
      const user = response.data;

      commit("SET_CURRENT_USER", {
        id: 1,
        userName: userName,
        firstName: "Test",
        lastName: "Test2",
        token: "Dzsp2DX5udgxYlvIt"
      });
      return user;
    });
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit("SET_CURRENT_USER", null);
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
