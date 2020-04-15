<!--文章详情-->
<template>
 <a-modal title="文章详情" v-model="visible" @ok="handleOk" :width="1000" >
    <template slot="footer">
    <a-button key="close" type="primary" @click="handleOk">
        关闭
    </a-button>
    </template>
    <div class="modal-section" v-html="html">
    <!-- <div v-html="record.html"></div> -->
    </div>
</a-modal>
</template>

<script>
export default {
 name: 'ShowArticleDetail',
 data () {
    return {
      html: '',
      visible: false,
   };
 },

 components: {},

 computed: {},

 methods: {
     show(record) {
      this.html = record.html
        /* 打开文章详情 */
      this.visible = true
     },
     handleOk: function() {
      /* 关闭文章详情 */
      this.visible = false
    },
 }
}

</script>

<style scoped>
/* 文章详情窗口样式 */
  .modal-section {
    max-height: 1000px;
    overflow-y: auto;
    font-size: 12px;
  }
</style>