<!--403页面-->
<template>
  <a-result status="warning" title="There are some problems with your operation.">
    <template v-slot:extra>
      <a-button type="primary" key="console">Go Console</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
 name: 'Exception403',
 data () {
    return {
   };
 },

 components: {},

 computed: {},

 methods: {
     back() {
         console.log(`没有权限，返回上一页`)
         this.$router.go(-1);
     }
 }
}

</script>

<style scoped>

</style>