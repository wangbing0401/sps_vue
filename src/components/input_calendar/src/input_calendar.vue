<template>
  <div class="input_content">
    <input :style="styleObject" type="text" @click="openByDrop($event)" v-model="calendar_display" readonly>
    <i></i>
    <transition name="fade">
      <div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
        <calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
      </div>
    </transition>
  </div>
</template>

<script>
import calendar from '../../calendar/index'
export default{
  props:{
    calendarValue:String,
    styleObject:Object
  },
  components:{
    calendar
  },
  data(){
    return{
      calendar3:{
        display:"2018/02/16",
        show:false,
        zero:true,
        value:[2018,2,16], //默认日期
        lunar:true, //显示农历
        select:(value)=>{
          this.calendar3.show=false;
          this.calendar3.value=value;
          this.calendar_display=value.join("-");
        }
      },
      calendar_display:"2018-02-16"
    }
  },
  methods:{
    openByDrop: function (e) {
      this.calendar3.show=true;
      this.calendar3.left=e.target.offsetLeft;
      this.calendar3.top=e.target.offsetTop+34;

      e.stopPropagation();
      window.setTimeout(()=>{
        document.addEventListener("click",(e)=>{
          this.calendar3.show=false;
          document.removeEventListener("click",()=>{},false);
        },false);
      },1000)
    }
  },
  watch:{
    calendar_display:function (newV, oldV) {
      this.$emit('update:calendarValue', this.calendar_display)
    }
  }
}
</script>

<style lang="scss" scoped>
  .input_content{
    position: relative;
    display: inline-block;
    input{
      height: 30px;
      border: none;
      background-color: $input_background_color;
    }
    i{
      position: absolute;
      display: block;
      top: 5px; right: 5px;
      width: 17px; height: 20px;
      background-image: url("../../../assets/imgs/icon2.png");
      background-position: -203px -8px;
      cursor: pointer;
    }
  }
  /*日历下拉框*/
  .calendar-dropdown{
    background: #fff;
    position: absolute;
    left:0;
    top:0;
    padding:20px;
    border: 1px solid #eee;
    border-radius: 2px;
    &:before {
      position: absolute;
      left:30px;
      top: -10px;
      content: "";
      border:5px solid rgba(0, 0, 0, 0);
      border-bottom-color: #DEDEDE;
    }
    &:after {
      position: absolute;
      left:30px;
      top: -9px;
      content: "";
      border:5px solid rgba(0, 0, 0, 0);
      border-bottom-color: #fff;
    }
  }
  /*日历下拉框*/
</style>
