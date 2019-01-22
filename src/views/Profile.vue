<template>
    <div class="Profile">
        <h2> userName : {{user.userName}}</h2>
        <h2> firstName : {{user.firstName}}</h2>
        <h2> lastName : {{user.lastName}}</h2>
        <h2> token : {{user.token}}</h2>

        <div>
        <textarea :class="$style.textarea" v-model="texts" ></textarea>  
        <appinput type="Button" value="ok" @click="postClick"></appinput>

        </div>
    </div>       

</template>

<script>
import Appinput from "@/components/ui/_base-input";
import baseAxios from "@/baseAxios";

export default {
  data() {
    return {
      texts: ""
    };
  },
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  components: { Appinput },
  methods: {
    postClick() {
      baseAxios.get("/Users").then(response => {
        //console.log(response.data);
        this.texts = JSON.stringify(response.data);
      });
    }
  }
};
</script>

<style lang="scss" module>
.textarea {
  width: 100%;
  height: 200px;
}
</style>
