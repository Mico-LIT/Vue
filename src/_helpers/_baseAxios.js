import axios from "axios";
import { api } from "@/config";
import store from "@/state/store";
import router from "@/router";
//import router from "@/router";

function request(method, url, params, data) {
  let axios_config = {
    // `baseURL` is the server URL that will be used for the request
    baseURL: api.base_url,

    // `method` is the request method to be used when making the request
    method: method,

    // `url` will be prepended to `baseURL` unless `baseURL` is absolute.
    url: url,

    headers: {
      Authorization:
        "Bearer  " +
        (store.state.auth.currentUser ? store.state.auth.currentUser.token : "")
    }
  };

  if (params) {
    // `params` are the URL parameters to be sent with the request
    axios_config.params = params;
  }

  if (data) {
    // `data` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    axios_config.data = data;
  }

  // intercept responses before they are handled by then or catch
  // axios.interceptors.response.use(
  //   response => {
  //     // eslint-disable-next-line no-console
  //     console.log("response", response);
  //     return response;
  //   },
  //   error => {
  //     //   if (error.response.status == 401) {
  //     //     this.$router.push({ path: "/login" });
  //     //   }

  //     //   if (error.response && error.response.status === 401) {
  //     //     router.replace({
  //     //       path: '/login',
  //     //       query: { redirect: router.currentRoute.fullPath },
  //     //     });
  //     //   }
  //     //   return Promise.reject(error.response.data);

  //     // eslint-disable-next-line no-console
  //     console.log("1111error", error.response.status);
  //     // return Promise.reject(error);
  //   }
  // );

  return axios(axios_config);
}

function get(url) {
  return request("get", url, null, null);
}

function post(url, data) {
  data = data || {};
  return request("post", url, null, data);
}

function put(url, data) {
  data = data || {};
  return request("put", url, null, data);
}

function remove(url) {
  return request("delete", url, null, null);
}

export default { get, post, put, remove, request };
