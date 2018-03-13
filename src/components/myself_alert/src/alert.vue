<template>
  <div>
    <transition name="fade">
      <div v-if="show" class="alert_main">
        {{AlertText}}
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default{
    props:{
      show:Boolean
    },
    computed:{
      ...mapState({
        AlertText:state => state.app_all.alert_text
      })
    }
  }
</script>

<style lang="scss">
  .alert_main{
    position: absolute;
    font-size: 16px; color: white;
    width: 200px; height: auto;
    text-align: center;
    padding: 20px 10px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    background-color: black;
    opacity: .8;
    border-radius: 5px;
    z-index: 10001;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
