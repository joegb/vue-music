import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		mapList:{},
		isShowAlbum:false,
		isShowPlayer:false,
		isShowLrc:false,
		album:{
			albumIndex:null,
			albumImg:"",
			playerbg:"",
			albumbg:"",
			albumSinger:"",
			albumTitle:"",
			albumList:""
		},
		player:{
			playMode:"all",//列表循环all,单曲循环single,随机播放random
			musicIndex:null,
			playerbg:"",
			musicLyric:"",
			musicUrl:"",
			musicName:"",
			singerImg:"",
			musicSinger:"",
			playList:[]
		}
	},
	mutations:{
		changeMusicIndex(state,{index}){
			state.player.musicIndex = index;
			state.player.musicLyric = state.player.playList[index].musicLyric;
			state.player.musicUrl = state.player.playList[index].musicUrl;
			state.player.musicName = state.player.playList[index].musicName;
			state.player.musicSinger = state.player.playList[index].musicSinger;
			if(state.album.albumIndex == null){
				state.player.playerbg = state.player.playList[index].playerbg;
				state.player.singerImg = state.player.playList[index].singerImg;
			}else{
				state.player.playerbg = state.album.playerbg;
				state.player.singerImg = state.album.singerImg;
			}
		},
		changeMapList(state,payload){
			state.mapList = payload.mapList;
		},
		changeAlbum(state,payload){
			state.isShowAlbum = payload.isShowAlbum;
			state.album.albumIndex = payload.albumIndex;
			state.album.albumImg = payload.album.albumImg;	
			state.album.playerbg = payload.album.playerbg;
			state.album.albumbg = payload.album.albumbg;			
			state.album.albumSinger = payload.album.albumSinger;			
			state.album.albumTitle = payload.album.albumTitle;			
			state.album.albumList = payload.album.albumList;			
		},
		closeAlbum(state){
			state.isShowAlbum = false;
		},
		closePlayer(state){
			state.isShowPlayer = false;
		},
		changePlayer(state,payload){
			state.album.albumIndex = null;
			state.isShowPlayer = payload.isShowPlayer;
			state.player.musicIndex = payload.musicIndex;
			state.player.playerbg = payload.player.playerbg;
			state.player.musicLyric = payload.player.musicLyric;
			state.player.musicUrl = payload.player.musicUrl;
			state.player.musicName = payload.player.musicName;
			state.player.singerImg = payload.player.singerImg;
			state.player.musicSinger = payload.player.musicSinger;
			state.player.playList = payload.playList;
		},
		changeAlbumPlayer(state,payload){
			state.isShowPlayer = payload.isShowPlayer;
			state.player.musicIndex = payload.musicIndex;
			state.player.musicLyric = payload.player.musicLyric;
			state.player.musicUrl = payload.player.musicUrl;
			state.player.musicName = payload.player.musicName;
			state.player.playerbg = state.album.playerbg;
			state.player.singerImg = state.album.albumImg;
			state.player.musicSinger = payload.player.musicSinger;
			state.player.playList = payload.playList;
			console.log(state.player.musicLyric)
		},
		changePlayMode(state){
			if(state.player.playMode == "all"){
				state.player.playMode = "single";
			}else if(state.player.playMode == "single"){
				state.player.playMode = "random";
			}else if(state.player.playMode == "random"){
				state.player.playMode = "all";
			}
		}
	},
	actions:{
		async init({commit}){
			const data = await axios.get("../../static/data.json").then(res=>res.data);
			commit("changeMapList",data)
		}	
	},
	plugins:[createLogger()]
})