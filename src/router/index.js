import { createRouter, createWebHistory } from 'vue-router'
//import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld'; //메인 컴포넌트 호출
import List from '@/components/board/List'; //게시판 리스트 컴포넌트 호출
import Write from '@/components/board/Write'; //게시판 리스트 컴포넌트 호출
import View from '@/components/board/View'; // 게시판 상세보기 컴포넌트

//Vue.use(Router); // vue 라우터

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/board/list',
    name: 'List',
    component: List
   
  },
  {
    path: '/board/Write',
    name:'Write',
    component: Write

  },
  {
    path: '/board/view',
    name: 'View',
    component: View
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
