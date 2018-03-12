<template>
  <div>
    <input-calendar :style-object="style_object" :calendar-value="calendar_value" @update:calendarValue="val => calendar_value = val"></input-calendar>
  </div>
</template>

<script>
import inputCalendar from './index'
export default{
  components:{
    inputCalendar
  },
  data(){
    return{
      style_object:{},        //input的样式
      calendar_value:null     //日历的值
    }
  }
}
</script>

<style>

</style>
