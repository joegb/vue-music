<template>
	<swiper :options="swiperOption" ref="mySwiper">
		<swiper-slide v-for="(item,index) in swiperArr" :key="index">
			<a href="javascript:void(0)">
				<img :src="item.imageSrc">
			</a>
		</swiper-slide>
		<div class="swiper-pagination"  slot="pagination"></div>
	    <div class="swiper-scrollbar"   slot="scrollbar"></div>
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		props:["swiperArr"],
		data(){
			return {
				swiperOption:{
			        // swiper configs 所有的配置同swiper官方api配置
			        autoplay: 3000,
			        direction : 'horizontal',
		          	pagination : '.swiper-pagination',
		          	scrollbar:'.swiper-scrollbar',
		          	mousewheelControl : true,
			        autoplay: true
				}
			}
		},
		components:{
			swiper,
			swiperSlide
		}
	}
</script>

<style lang="less" scoped>
	img{
        width: 100%;
        height: auto;
        display: block;
    }
</style>