// import Vue from "vue";
//import Router from "vue-router";

import store from "@/state/store";

// Vue.use(Router);

export default [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/info",
    name: "info",
    component: () => import("./views/Info.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./views/Profile.vue"),
    meta: {
      authRequired: true
    },
    props: route => ({ user: store.state.auth.currentUser || {} })
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch("auth/logOut");
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          route => route.meta.authRequired
        );
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: "home" } : { ...routeFrom });
      }
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require("@views/_loading").default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require("@views/_timeout").default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
}
