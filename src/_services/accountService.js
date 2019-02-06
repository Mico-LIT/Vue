import http from "@/core/baseAxios";
import store from "@/state/store";
import router from "@/router";

export const accountService = {
  LogIn,
  LogOut,
  GetUser
};

//
function LogIn(username, password) {
  var body = {
    username: username,
    password: password,
    grant_type: "password"
  };

  http.get("/posts/12").then(
    response => {
      store.dispatch("auth/logIn", response.data).then(() => {
        router.push("/");
      });
    },
    error => {
      // eslint-disable-next-line no-console
      console.log(error);
      //router.push("/");
    }
  );
}

//
function LogOut() {
  store.dispatch("auth/logOut");
}

function GetUser() {
  return store.state.auth.currentUser;
}
