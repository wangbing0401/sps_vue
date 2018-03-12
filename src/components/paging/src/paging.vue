<template>
  <div class="paging_content">
    <span class="pre_page" @click="pre_click()">
      上一页
    </span><span class="page_block" v-for="(l, index) in yemian" @click="page_click(index+1)" :style="current_page==(index+1)?{backgroundColor:'#20dc83', color:'white'}:{}">
      {{index+1}}
    </span><span class="next_page" @click="next_click()">
      下一页
    </span>
  </div>
</template>

<script>
export default{
  props:{
    totalPage:Number,
    howPage:Number
  },
  data(){
    return{
      yemian:[],
      current_page:1
    }
  },
  methods:{
    page_click: function (index) {
      this.current_page = index
    },
    pre_click: function () {
      if (this.current_page != 1){
        this.current_page--
      }
    },
    next_click: function () {
      if (this.current_page != this.totalPage){
        this.current_page++
      }
    }
  },
  mounted(){
    this.yemian = new Array(this.totalPage)
  }
}
</script>

<style lang="scss" scoped>
  .paging_content{
    position: absolute;
    width: 100%;
    margin-top: 40px;
    text-align: center;
    bottom: 0;
    span{
      display: inline-block;
      cursor: pointer;
    }
    .pre_page{
      width: 60px; height: 30px;
      text-align: center; line-height: 30px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border: 1px solid #ddd;
      border-right: none;
      background-color: white;
    }
    .page_block{
      width: 28px; height: 30px;
      text-align: center; line-height: 30px;
      border: 1px solid #ddd;
      border-right: none;
      background-color: white;
    }
    .next_page{
      width: 60px; height: 30px;
      text-align: center; line-height: 30px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border: 1px solid #ddd;
      background-color: white;
    }
  }
</style>
