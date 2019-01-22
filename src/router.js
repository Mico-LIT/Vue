import Vue from "vue";
import Router from "vue-router";

import store from "@/state/store";

Vue.use(Router);

const router = new Router({
  routes: [
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
          next(
            authRequiredOnPreviousRoute ? { name: "home" } : { ...routeFrom }
          );
        }
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next();
  // If auth is required and the user is logged in...
  if (store.getters["auth/loggedIn"]) {
    // Validate the local user token...
    // return store.dispatch("auth/validate").then(validUser => {
    //   // Then continue if the token still represents a valid user,
    //   // otherwise redirect to login.
    //   validUser ? next() : redirectToLogin();
    // });
    return next();
  }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin();

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: "login", query: { redirectFrom: routeTo.fullPath } });
  }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // Complete the redirect.
              next(...args);
              reject(new Error("Redirected"));
            } else {
              resolve();
            }
          });
        } else {
          // Otherwise, continue resolving the route.
          resolve();
        }
      });
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return;
  }

  // If we reach this point, continue resolving the route.
  next();
});

export default router;
