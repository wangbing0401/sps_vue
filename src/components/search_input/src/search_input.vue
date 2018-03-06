<template>
  <div class="search_input_content" :style="{width:inputWidth+'px'}">
    <span class="component_queryBtn" @click="input_search()"></span>
    <input type="text" class="component_queryTxtbox" v-model="searchKey" @keyup.enter="input_search()" :placeholder="placeholder">
    <i v-show="searchKey" class="component_close_icon" @click="clear_input_click()"></i>
  </div>
</template>

<script>
export default{
  props:{
    inputWidth:Number,
    placeholder:String
  },
  data(){
    return{
      searchKey:null
    }
  },
  methods:{
    input_search: function () {
      this.$emit('clickSearch', this.searchKey)
    },
    clear_input_click: function () {
      this.searchKey = null
    }
  }
}
</script>

<style lang="scss" scoped>
  .search_input_content{
    position: relative;
    float: left;
    height: 30px;
    .component_queryBtn{
      position: absolute;
      display: inline-block;
      width: 20px; height: 23px;
      left: 8px; top: 5px;
      cursor: pointer;
      background-image: url('../../../assets/imgs/icon2.png');
      background-position: -380px -35px;
    }
    .component_queryTxtbox{
      width: 100%; height: 100%;
      border: none;
      border-bottom: #efeef2 solid 2px;
      background: none;
      text-indent: 35px;
    }
    .component_close_icon{
      position: absolute;
      display: inline-block;
      width: 10px; height: 10px;
      top: 8px; right: 10px;
      background-image: url('../../../assets/imgs/icon2.png');
      background-position: -25px -300px;
      cursor: pointer;
    }
  }
</style>
