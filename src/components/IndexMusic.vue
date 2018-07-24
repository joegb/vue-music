<template>
  <div class="indexmusic">
    <MySwiper :swiperArr="swiperArr"></MySwiper>
    <div class="album">
        <h3>最新专辑</h3>
        <ul>
          <li v-for="(item,index) in album" :key="index" @click="showAlbum(item,index)">
              <img :src="item.albumImg">
              {{item.albumTitle}}
          </li>
        </ul>
    </div>
    <div class="recommend">
        <h3>歌曲飙升榜</h3>
        <ul>
          <li v-for="(item,index) in recommend" :key="index" :class="{cur:$store.state.player.musicName == item.musicName}" @click="showPlayer(item,index,recommend)">
            <div class="unit">
              <p class="No">{{index+1}}</p>
              <p>{{item.musicName}}</p>
              <p>{{item.musicSinger}}</p>
              <p class="iconfont icon-laba"></p>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import MySwiper from "./MySwiper.vue";
export default {
  updated(){
    // console.log(this.$store.state.mapList)
  },
  data () {
    return {
       // 轮播图的数组
        swiperArr:[
            {"imageSrc":"http://p1.music.126.net/XGX5EKglrSnK-6YjpIVtNA==/109951163392676478.jpg","url":"http://music.163.com//album?id=71614205"},
            {"imageSrc":"http://p1.music.126.net/oXc9zWIRhRRwJ5uUSqczLg==/109951163398139010.jpg","url":"http://music.163.com/#/mv?id=10733091"},
            {"imageSrc":"http://p1.music.126.net/1cOm7YSRQ3tlwETOxIPm9w==/109951163398199906.jpg","url":"http://music.163.com/#/song?id=862102927"},
            {"imageSrc":"http://p1.music.126.net/V_zK0YAYms-hpN8yRXs_pw==/109951163398250105.jpg","url":"http://music.163.com/#/song?id=864100859"},
        ]
    }
  },
  computed:{
    album(){
      return this.$store.state.mapList.album;
    },
    recommend(){
      return this.$store.state.mapList.recommend;
    }
  },
  components:{
    MySwiper
  },
  methods:{
    showAlbum(item,index){
      this.$store.commit("changeAlbum",{
          isShowAlbum:true,
          albumIndex:index,
          album:item
      })
    },
    showPlayer(item,index,list){
      this.$store.commit("changePlayer",{
        isShowPlayer:true,
        musicIndex:index,
        player:item,
        playList:list
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .indexmusic {
      h3 {
          font-weight: normal;
          font-size: 18px;
          height: 40px;
          line-height: 40px;
      }
      h3:before {
          content: '|';
          color: #C20C0C;
          background: #C20C0C;
          font-size: 15px;
          margin: 0 6px;
      }
      .album {
          ul {
              overflow: hidden;
              li {
                  float: left;
                  width: 33.333%;
                  text-align: center;
                  img {
                      width: 99%;
                      display: block;
                      padding: 1%
                  }
              }
          }
      }
      .recommend {
          ul {
              li {
                  overflow: hidden;
                  padding-top: 5px;
                  div.unit{

                      p {
                          float: left;
                          height:30px;
                          line-height: 30px;
                          &:nth-child(2),&:nth-child(3){
                              margin-right: 10px;
                          };
                      }
                      .No{
                          float: left;
                          width: 30px;
                          height: 30px;
                          text-align: center;
                          margin-right: 40px;
                      }
                      .icon-laba{
                          float:right;
                          width: 30px;
                          height: 30px;
                          line-height: 30px;
                          font-size: 26px;

                      }
                  }
                  &.cur{
                      color:red;
                  }
              }
          }
      }
  }
</style>
