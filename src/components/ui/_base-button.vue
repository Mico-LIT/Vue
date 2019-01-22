<template>
    <button :class="$style.button" ></button>
</template>

<style lang="scss" scoup>
.button {
  cursor: pointer;
  border: none;

  &:disabled {
    cursor: not-allowed;
    background: black;
  }
}
</style>
