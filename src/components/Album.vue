<template>
	<div v-if="$store.state.isShowAlbum" class="albumPage">
		<div class="header" :style="{background:`url(${album.albumbg}) 0 0 / 100% 100% no-repeat`}">
			<header>
				<span class="iconfont icon-houtui1" @click="hideAlbum"></span>
			</header>
			<div class="content">
				<div class="albumImg">
					<img :src="album.albumImg">
				</div>
				<div class="albumDetail">
					<p class="albumTitle">
						专辑：{{album.albumTitle}}
					</p>
					<p class="singer">
						<img :src="album.albumbg">
						<span>歌手：{{album.albumSinger}}</span>
					</p>
				</div>
			</div>
			<div class="setting">
				<ul>
					<li class="iconfont icon-addfile"></li>
					<li class="iconfont icon-BAI-pinglun"></li>
					<li class="iconfont icon-fenxiang1"></li>
					<li class="iconfont icon-icon--"></li>
				</ul>
			</div>
		</div>
		<div class="albumList">
	        <ul>
	          <li v-for="(item,index) in album.albumList" :key="index" :class="{cur:$store.state.player.musicName == item.musicName}" @click="showPlayer(item,index,album.albumList)">
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
	export default{
		data(){
			return {

			}
		},
		computed:{
			album(){
				return this.$store.state.album;
			}
		},
		methods:{
			hideAlbum(){
				this.$store.commit("closeAlbum");
			},
			showPlayer(item,index,list){
				this.$store.commit("changeAlbumPlayer",{
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
	.albumPage{
        position: fixed;
        width: 100%;
        height: 100%;
        background:#fff;
        top:0px;
        left:0px;
        z-index:1;
        .header {
            height: 280px;
            header {
                position: relative;
                color: #fff;
                height: 50px;
                text-align: center;
                line-height: 50px;
                span.icon-houtui1 {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50px;
                    height: 50px;
                    text-align: center;
                    font-size: 26px;
                    line-height: 50px;
                }
            }
            .content {
                padding: 5% 3.4%;
                overflow: hidden;
                .albumImg {
                    width: 36%;
                    float: left;
                    img {
                        width: 100%;
                    }
                }
                .albumDetail {
                    width: 61%;
                    padding-left: 3%;
                    float: left;
                    color: #fff;
                    p.albumTitle {
                        height: 30px;
                        line-height: 30px;
                        margin: 3px 0;
                    }
                    p.singer {
                        height: 30px;
                        img {
                            width: 30px;
                            border-radius: 50%;
                            float: left;
                            margin-right: 10px;
                        }
                        span {
                            float: left;
                            line-height: 30px;
                        }
                    }
                }
            }
            .setting {
                overflow: hidden;
                margin-top: 10px;
                li {
                    float: left;
                    height: 50px;
                    line-height: 50px;
                    width: 25%;
                    text-align: center;
                    font-size: 36px;
                    color: #fff;
                    overflow: hidden;
                }
            }
        }
        .albumList{
            ul {
                li {
                    overflow: hidden;
                    padding-top: 5px;
                    height: 30px;
                    line-height:30px;
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
                            width: 30px;
                            height: 30px;
                            text-align: center;
                        }
                        .icon-laba{
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