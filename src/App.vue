<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <RouterView/>
  <div class="test">
    test scss
  </div>
</template>

<style scoped lang="scss">
.test{
  color: $priceColor;
}
</style>
