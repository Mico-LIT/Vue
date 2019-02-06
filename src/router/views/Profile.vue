<template>
    <div class="Profile">
        <h2> userId : {{user.userId}}</h2>
        <h2> id : {{user.id}}</h2>
        <h2> title : {{user.title}}</h2>
        <h2> body : {{user.body}}</h2>

        <div>
        <textarea :class="$style.textarea" v-model="texts" ></textarea>  
        <appinput type="Button" value="ok" @click="postClick"></appinput>

        </div>
    </div>       

</template>

<script>
import Appinput from "@/components/ui/_base-input";

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
      cosnole.log(this.user);
      this.$http.get("/posts/23").then((response)=> {
        this.texts = JSON.stringify(response.data);
      }, response => {
        console.log(response);
      })
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
