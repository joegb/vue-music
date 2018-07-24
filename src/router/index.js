import Vue from 'vue'
import Router from 'vue-router'
import IndexMusic from "../components/IndexMusic.vue";
import FindMusic from "../components/FindMusic.vue";
import RadioMusic from "../components/RadioMusic.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/indexmusic',
      name: 'indexmusic',
      component: IndexMusic
    },
    {
      path: '/findmusic',
      name: 'findmusic',
      component: FindMusic
    },
    {
      path: '/radiomusic',
      name: 'radiomusic',
      component: RadioMusic
    },
    {
    	path:"*",
    	redirect:"/indexmusic"
    }
  ]
})
