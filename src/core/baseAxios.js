import axios from "axios";
import { api } from "@/config";
import store from "@/state/store";

function _config() {
  let axios_config = {
    // `baseURL` is the server URL that will be used for the request
    baseURL: api.base_url,

    headers: {
      Authorization:
        "Bearer  " +
        (store.state.auth.currentUser ? store.state.auth.currentUser.token : "")
    }
  };

  return axios_config;
}

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // debugger;

    config.headers.Authorization = _config().headers.Authorization;
    config.baseURL = _config().baseURL;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log(response);

    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
