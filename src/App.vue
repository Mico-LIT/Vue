<template>
  <div id="app">
    <p>Current route name: {{ $route.name }}</p>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/info">Info</router-link>
      <router-link to="/profile" v-if="isLoggedIn"> | profile</router-link>
      
<!---->
      <router-link to="/login"   v-if="!isLoggedIn"> | login</router-link>
      <router-link to="/logout"  v-if="isLoggedIn"> | logout </router-link>
<!---->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$route.next({ name: "home" });
    }
  },
  computed: {
    isLoggedIn() {
      // console.log(this.$store.getters["auth/loggedIn"]);
      // console.log(this.$store);
      return this.$store.getters["auth/loggedIn"];
    }
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
