<template>
  <div id="app">
    <header>
      <span class="iconfont icon-caidan"></span>
      <div class="center">
        <ul>
          <li v-for="item in navOptions" :class="[item.fontClass,{iconfont:true,cur:item.url==$route.path}]" @click="goto(item.url)"></li>
        </ul>
      </div>
      <span class="iconfont icon-zhuanjiguangpan" @click="openPlayer"></span>
    </header>
    <transition name="donghua" v-show="!$store.state.isShowPlayer&&!$store.state.isShowAlbum">
      <router-view/>
    </transition>
    <transition name="donghua">
      <Album />
    </transition>
    <transition name="donghua">
      <AutoPlayer  v-show="$store.state.isShowPlayer" />
    </transition>
  </div>
</template>

<script>
  import Album from "./components/Album.vue";
  import AutoPlayer from "./components/AutoPlayer.vue";
export default {
  created(){
    this.$store.dispatch("init");
  },
  data(){
    return {
      navOptions:[
        {
          fontClass:"icon-music",
          url:"/indexmusic"
        },
        {
          fontClass:"icon-wangyiyunyinlezizhi-copy",
          url:"/findmusic"
        },
        {
          fontClass:"icon-diantai",
          url:"/radiomusic"
        }
      ]
    }
  },
  methods:{
    goto(url){
      this.$router.push(url)
    },
    openPlayer(){
      if(this.$store.state.player.musicIndex == null)return;
      this.$store.state.isShowPlayer = true;
    }
  },
  components:{
    Album,
    AutoPlayer
  }
}
</script>

<style lang="less" scoped>
  #app{
      width: 100%;height: 100%;overflow: hidden;
  }
  header{
    position: relative;color: #fff;
    .icon-caidan,.icon-zhuanjiguangpan{
        width: 50px;height: 50px;line-height: 50px;font-size: 26px;position: absolute;
        top: 0;left: 0;text-align: center;
    }
    .center{
        height: 50px;line-height: 50px;background: #C20C0C;
        ul{
            overflow: hidden;width: 60%;margin: 0 auto;
            li{
                font-size: 26px;width: 33.333%;float: left;text-align: center;
            }
            li.cur{
                background: #9B0909;
            }
        }
    }
    .icon-zhuanjiguangpan{
        right: 0;left: auto;
    }
  }
  .donghua-enter-active{
    transition:all 0.5s ease;
  }
  .donghua-leave-active{
    display:none;
  }
  .donghua-enter,.donghua-leave-to{
    transform:translateX(300px);
  }
</style>
