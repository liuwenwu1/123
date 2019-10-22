<template>
  <div>
    <h3 style="margin: 60px;">这是第二个Vuex页面:{{title}}</h3>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: ''
      };
    },
    /* 钩子函数*/
    created() {
        this.title = this.$store.state.resturantName;
    }
  }
</script>

<style>
</style>
