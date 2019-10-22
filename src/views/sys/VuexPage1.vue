<template>
  <div>
    <h3 style="margin: 60px;">这是第一个Vuex页面:{{title}}</h3>
    <button @click="changeTitle">易主</button>
    <button @click="changeTitleAsync">两个月后易主</button>
    <button @click="doAjax">测试Vuex中使用ajax</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      changeTitle() {
        this.$store.commit("setResturantName", {
          resturantName: '李老板来收树'
        });
      },
      changeTitleAsync() {
        this.$store.dispatch("setResturantNameAsync", {
          resturantName: '王老板来收树'
        });
      },
      doAjax() {
        this.$store.dispatch("doAjax", {
          _this:this
        });
      }
    },
    /* 计算属性*/
    computed: {
      title() {
        //return this.$store.state.resturantName;
        return this.$store.getters.getResturantName;
      }
    }
  }
</script>

<style>
</style>
