<template>
	<div class="audioplayer" :style="{background:`url(${player.playerbg}) 0 0 / 100% 100% no-repeat`}">
		<header>
			<span class="iconfont icon-houtui1" @click="hidePlayer"></span>
			<p>{{player.musicName}} {{player.musicSinger}}</p>
		</header>
		<div class="content" style="height:400px" v-show="!$store.state.isShowLrc" @click="openLrc">
			<div class="wrap">
				<div class="cd">
					<img src="../../static/img/cd.png" alt="">
					<div class="singbg" :class="{cur:!isPlaying}">
                        
						<img :src="player.singerImg" alt="">
					</div>
					<div class="switch" :class="{cur:!isPlaying}">
						<img src="../../static/img/swith.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="lrcPart" v-show="$store.state.isShowLrc" @click="closeLrc" v-height="400">
			<ul style="top:200px">
				<li v-for="(item,index) in lrc" :key="index" :class="{cur:currentTime>=lrc[index][0]
                    &&
                    currentTime<=(index+1>lrc.length-1?duration:lrc[index+1][0])}">
					<span class="animationLyric_origin">
                        {{lrc.length==0?"歌词正在加载中":item[1]}}
						<span class="animationLyric_current" :style="[{
                            'animation-duration':(index+1>lrc.length-1?duration - lrc[index][0]:lrc[index+1][0]-lrc[index][0])+'s'
                        },{'animation-play-state':isPlaying?'running':'paused'}]">
                            {{item[1]}}                  
                        </span>
					</span>
				</li>
			</ul>
		</div>
		<div class="setting">
			<ul>
				<li class="iconfont icon-addfile"></li>
				<li class="iconfont icon-BAI-pinglun"></li>
				<li class="iconfont icon-fenxiang1"></li>
				<li class="iconfont icon-icon--"></li>
			</ul>
		</div>
		<div class="progressBar">
            <audio :src="player.musicUrl" autoplay @timeupdate="playMusic" ref="audio"></audio>
			<p class="start">{{currentTime|zhuanhuan}}</p>
			<p class="range">
				<span class="duration" @click="changeTime($event)">
					<span class="currentTime" :style="{width:`${currentTime/duration*100}%`}"></span>
				</span>
			</p>
			<p class="end">{{duration|zhuanhuan}}</p>
		</div>
		<div class="controller">
			<p class="playmodebtn iconfont" :class="playMode" @click="changeMode"></p>
			<p class="playlistbtn iconfont icon-zhankaicaidan" @click="openCaidan"></p>
			<ul>
                <li class="iconfont icon-previous" @click="goPrev"></li>
                <li class="iconfont" :class="isPlaying?'icon-pause-20':'icon-bofang'" @click="playOrPause"></li>
				<li class="iconfont icon-next" @click="goNext"></li>
			</ul>
		</div>
		<div :class="{cur:isShowList}" class="popwindow"></div>
		<div :class="{cur:isShowList}" class="playlist">
			<ul>
				<li v-for="(item,index) in player.playList" :key="index" :class="{cur:item.musicName == $store.state.player.musicName}" @click="changeMusic(index)">
					<span :class="[{'iconfont':true},{'icon-laba':item.musicName == $store.state.player.musicName}]">{{item.musicName == $store.state.player.musicName ? "":index+1}}</span>
                    <span>{{item.musicName}}</span>
                    <span>{{item.musicSinger}}</span>
				</li>
			</ul>
			<footer>
				<span class="iconfont icon-guanbi" @click="closeCaidan"></span>
			</footer>
		</div>
	</div>
</template>

<script>
    import axios from "axios";
	export default {
		updated(){
			// console.log(this.player)
		},
		data(){
			return {
				isShowList:false,
                currentTime:null,
                duration:null,
                isPlaying:true,
                lrc:[]
			}
		},
        watch:{
            isShowPlayer(){
                this.isPlaying = true;
            },
            musicLyric(){
                var self = this;
                axios.get(this.musicLyric).then(res=>{
                    self.lrc = self.showLrc(res.data);   
                });
            },
        },
		computed:{   
			player(){
				return this.$store.state.player;
			},
            musicLyric(){
                return this.player.musicLyric;
            },
            isShowPlayer(){
                return this.$store.state.isShowPlayer;
            },
            playMode(){
                switch(this.player.playMode){
                    case "all":
                        return "icon-shunxubofang";
                    break;
                    case "single":
                        return "icon-singlecycle";
                    break;
                    case "random":
                        return "icon-bofangye-caozuolan-suijibofang";
                    break;
                }
            }
		},
		methods:{
            showLrc(lrc){
                var arr = [];
                var lines = lrc.split(/\n/);
                var regexp = /^\[\d{2}\:\d{2}\.\d{2}\]/g;
                while(!regexp.test(lines[0])){
                    lines.splice(0,1);
                }
                while(lines[lines.length-1].length == 0){
                    lines.splice(lines.length-1,1);
                }
                lines.forEach(item=>{
                    var index = item.indexOf("]");
                    var time = item.substr(1,index-1);
                    var geci = item.substr(index+1);
                    var timeArr = time.split(":");
                    arr.push([timeArr[0]*60+parseFloat(timeArr[1]),geci]);
                })
                return arr;
            },
            openLrc(){
                this.$store.state.isShowLrc = true;
            },
            closeLrc(){
                this.$store.state.isShowLrc = false;
            },
            goNext(){
                switch(this.player.playMode){
                    case "all":
                        if(this.player.musicIndex +1 >= this.player.playList.length)return;
                        this.changeMusic(this.player.musicIndex + 1);
                    break;
                    case "single":
                        this.changeMusic(this.player.musicIndex);
                        this.$refs.audio.load();
                    break;
                    case "random":
                        var index = parseInt(Math.random()*this.player.playList.length);
                        this.changeMusic(index);
                    break;
                }
            },
            goPrev(){
                switch(this.player.playMode){
                    case "all":
                        if(this.player.musicIndex -1 < 0 )return;
                        this.changeMusic(this.player.musicIndex - 1);
                    break;
                    case "single":
                        this.changeMusic(this.player.musicIndex);
                        this.$refs.audio.load();
                    break;
                    case "random":
                        var index = parseInt(Math.random()*this.player.playList.length);
                        this.changeMusic(index);
                    break;
                }
            },
            changeMusic(index){
                this.$store.commit("changeMusicIndex",{index});
                this.isShowList = false;
            },
            closeCaidan(){
                this.isShowList = false;
            },
            openCaidan(){
                this.isShowList = true;
            },
			hidePlayer(){
				this.$store.commit("closePlayer")
			},
            playMusic(){
                this.duration = this.$refs.audio.duration;
                this.currentTime = this.$refs.audio.currentTime;
                if(this.$refs.audio.ended){
                    this.goNext();
                }
                for(var i = 0 ; i< this.lrc.length;i++){
                    if(this.currentTime > this.lrc[i][0]){
                        $(".lrcPart ul").css({
                            top: $(".lrcPart").height()/2 - 26*(i+1) + "px"
                        })
                    }
                }
            },
            changeTime(event){
                this.$refs.audio.currentTime = event.offsetX/$(".duration").width()*this.duration;
            },
            changeMode(){
                this.$store.commit("changePlayMode")
            },
            playOrPause(){
                if(this.isPlaying){
                    this.$refs.audio.pause();
                }else{
                    this.$refs.audio.play();
                }
                this.isPlaying = !this.isPlaying;
            }
		},
        filters:{
            zhuanhuan(s){
                var t = null;
                if(s<0)return;
                var min = Math.floor(s/60)%60;
                var s = s%60;
                if(min<10){t="0"}
                t+= min+":";
                if(s<10){t+="0"}
                t+= s.toFixed(0);
                return t;
            }
        }
	}
</script>

<style lang="less" scoped>
    .audioplayer{
        position: fixed;
        width: 100%;
        height: 100%;
        background:#fff;
        top:0px;
        left:0px;
        z-index:1;
        header{
            height:50px;
            text-align: center;
            color:#fff;
            position: relative;
            padding-top: 20px;
            span{
                position: absolute;
                top:0px;
                left:10px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size:  28px;
            }
        }
        .content{
            padding-top: 50px;
            position: relative;
            // overflow:hidden;
            min-height:400px;
            .wrap{
                margin:0px auto;
                width: 50%;
                // overflow:hidden;
                .cd{
                    position: relative;
                    margin-top: 20px;
                    img{
                        width: 100%;
                        height: auto;
                    }
                    .singbg{
                        border-radius:50%;
                        width: 60%;
                        height: 60%;
                        position: absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                        overflow:hidden;
                        img{
                            position: relative;
                            display: block;
                            animation: rotate-animation 10s infinite linear;   }
                    }
                    .singbg.cur {
                        img {
                            animation-play-state: paused;
                        }
                    }
                    @keyframes rotate-animation {
                        0% {
                            transform: rotate(0deg);
                        }
                        50% {
                            transform: rotate(180deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                    .switch{
                        width: 94px;
                        height: 165px;
                        position: absolute;
                        top: -75px;
                        left: 60%;
                        transform: translateX(-50%) rotate(-3deg);
                        /*transform-origin 是控制旋转中心的*/
                        transform-origin: 15px 15px;
                        transition: all 1s ease 0s;
                        img{
                            width: 100%;
                            display: block;
                        }
                    }
                    .switch.cur{
                        transform: translateX(-50%) rotate(-23deg);  
                    }
                }
            }
        }
        .lrcPart {
            background:rgba(0, 0, 0, 0.3);
            z-index: 3;
            overflow: hidden;
            ul {
                position: relative;
                transition: all 0.3s ease 0s;
                li {
                    text-align: center;
                    height: 26px;
                    line-height: 26px;
                    span.animationLyric_origin {
                        position: relative;
                        color: #fff;
                        height: 26px;
                        line-height: 26px;
                        display: inline-block;
                        span.animationLyric_current {
                            position: absolute;
                            display: inline-block;
                            overflow: hidden;
                            top: 0;
                            left: 0;
                            white-space: nowrap;
                            height: 26px;
                            line-height: 26px;
                            width: 0%;
                            animation-play-state: paused;
                        }
                    }
                }
                li.cur {
                    span.animationLyric_current {
                        animation-name: lyricdonghua;
                        animation-timing-function: linear;
                        color: red;
                        @keyframes lyricdonghua {
                            from {
                                width: 0%;
                            }
                            to {
                                width: 100%;
                            }
                        }
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
        .progressBar {
            overflow: hidden;
            padding: 12px 3.2%;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            p {
                float: left;
            }
            p.start {
                width: 11%;
                height: 40px;
                line-height: 40px;
                text-align: right;
            }
            p.range {
                width: 78%;
                padding: 0 3%;
                margin: 19px auto;
                span.duration {
                    width: 100%;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.4);
                    display: block;
                    position: relative;
                    span.currentTime {
                        width: 0%;
                        height: 2px;
                        background: #c20c0c;
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }
            p.end {
                width: 11%;
                height: 40px;
                line-height: 40px;
                text-align: left;
            }
        }
        .controller {
            position: relative;
            top: 10px;
            text-align: center;
            line-height: 50px;
            height: 50px;
            color: rgba(255, 255, 255, 0.5);
            p {
                position: absolute;
                top: 0;
            }
            p.playmodebtn {
                color: #fff;
                font-size: 30px;
                left: 3.2%;
            }
            p.playlistbtn {
                font-size: 38px;
                right: 3.2%;
            }
            ul {
                overflow: hidden;
                width: 68%;
                margin: 0 auto;
                li {
                    width: 33.33%;
                    float: left;
                    font-size: 40px;
                }
                li.icon-bofang,
                li.icon-pause-20 {
                    font-size: 52px;
                }
            }
        }
            /* 还没有生效的css */
        .playlist.cur {
            bottom: 0;
            z-index: 2;
        }
        .popwindow {
            z-index: -1;
            opacity: 0;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
        }
        .popwindow.cur {
            opacity: 1;
            transition: all 0.8s ease 0s;
            z-index: 1;
        }
        .playlist {
            position: absolute;
            width: 100%;
            height: 300px;
            background: #fff;
            bottom: -300px;
            transition: all 0.8s ease 0s;
            ul {
                height: 250px;
                overflow-y: scroll;
                li {
                    overflow: hidden;
                    border-bottom:2px dashed #ccc;
                    span.icon-laba {
                        width: 50px;
                        text-align: center;
                        font-size: 28px;
                    }
                    span {
                        float: left;
                        line-height: 50px;
                        height: 50px;
                        padding:0 10px;
                    }
                }
                li.cur {
                    color: #c20c0c;
                }
            }
            footer {
                position: absolute;
                bottom: 0px;
                height: 50px;
                width: 100%;
                text-align: center;
                span {
                    display: block;
                    height: 50px;
                    line-height: 50px;
                    font-size: 28px;
                }
            }
        }
    }
</style>