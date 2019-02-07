<template>
  <div id="app">
    <p>Current route name: {{ $route.name }}</p>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/info">Info</router-link>
      <router-link to="/profile" v-if="loggedIn"> | profile</router-link>
      
<!---->
      <router-link to="/login"   v-if="!loggedIn"> | login</router-link>
      <router-link to="/logout"  v-if="loggedIn"> | logout </router-link>
<!---->
    </div>
    <router-view/>
  </div>
</template>

<script>
import { authComputed } from "@/state/helpers";

export default {
  computed: {
    ...authComputed
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
