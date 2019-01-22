<script>
export default {
  model: {
    event: "update"
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>

<template>
  <input
    :type="type"
    :class="$style.input"
    :value="value"
    @input="$emit('update', $event.target.value)"
    v-on="$listeners"
  />
</template>

<style lang="scss" module>
.input {
  display: block;
  width: 100%;
  padding: 1px;
  margin-bottom: 1px;
  line-height: 1;
  // border: $size-input-border solid $color-input-border;
  // border-radius: $size-input-border-radius;
}
</style>
