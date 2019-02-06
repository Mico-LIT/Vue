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
import { accountService } from "@/_services/accountService";

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
      accountService.LogIn(this.userName, this.password);
    }
  }
};
</script>
