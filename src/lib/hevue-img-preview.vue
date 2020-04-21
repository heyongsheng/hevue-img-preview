<template>
  <div>{{mes}}</div>
</template>

<script>
export default {
  name: 'hevue-img-preview',
  props: {
    mes: String,
    timeout: Number,
    callback: Function
  }
}
</script>

<style>
</style>