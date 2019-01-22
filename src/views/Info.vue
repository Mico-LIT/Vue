<template>
    <div class="Info">
        <Appinput v-model="tex"/>
        <appinput type="Button" value="123" @click="butClick"></appinput>
    </div>
</template>

<script>
import Appinput from "@/components/ui/_base-input";

export default {
  data() {
    return {
      tex: ""
    };
  },
  name: "Info",
  components: {
    Appinput
  },
  methods: {
    butClick() {
      alert(this.tex);
    }
  }
};
</script>

<style lang="scss" scoped>
.Info {
  margin: auto;
  width: 50%;
}
</style>
