<template>
    <div class="Login">
            <p>loginName</p>
            <AppInput v-model="userName"></AppInput>         
            <p>Password</p>
            <AppInput type="password" v-model="password" ></AppInput> |
            <app-input type="button" value="in" @click="login"></app-input>
    </div>    
</template>

<script>
import AppInput from "@/components/ui/_base-input";

export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  components: {
    AppInput
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/logIn", {
          userName: this.userName,
          password: this.password
        })
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>
