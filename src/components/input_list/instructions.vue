<template>
  <div>
    <input-list :icon-class="icon_class" :select-source="select_source" :placeholder-text="placeholder_text" :select-data="select_data" @update:selectData="val => select_data=val"> </input-list>
  </div>
</template>

<script>
import inputList from './index'
export default{
  components:{
    inputList
  },
  data(){
    return{
      select_source:[
        {name:'www', id:1},
        {name:'sss', id:2},
        {name:'eee', id:3},
        {name:'rrr', id:4}
      ],
      placeholder_text:'哈哈',
      select_data:{},
      icon_class:'arrow_icon'
    }
  }
}
</script>

<style>

</style>
