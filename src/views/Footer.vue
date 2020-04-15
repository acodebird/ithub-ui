<!--用户界面底部组件-->
<template>
 <a-row class="foot">
    <a-col>
      <p>
        Copyright © 2018-2019 www.acodebird.cn 
        <br>
        <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备19103774号</a>
      </p>
    </a-col>
  </a-row>
</template>

<script>
export default {
 name: 'Footer',
 data () {
    return {
   };
 },

 components: {},

 computed: {},

 methods: {}
}

</script>

<style scoped>
  .foot {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
</style>