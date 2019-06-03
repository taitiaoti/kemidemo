import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {path:'/',redirect:'home'},
      {path:'/login',name:'login',component:()=>import(/* webpackChunkName:'login' */'@/components/Login/Login')},
      {path:'/home',name:'home',component:()=>import(/* webpackChunkName:'home' */"@/components/Home"),
        children:[
          {
            path:'RoleManage',
            name:'RoleManage',
            component:()=>import(/* webpackChunkName:'RoleManage' */ '@/components/RoleManage/RoleManage'),
            children:[
              {
                path:'addNewRole',
                name:'addNewRole',
                component:()=>import(/* webpackChunkName:'addNewRole' */ '@/components/RoleManage/addNewRole')}
            ]
        },
          {
            path:'accountManager',
            name:'accountManager',
            component:()=>import(/* webpackChunkName:'accountManager' */ '@/components/accountManager/accountManager'),
            children:[
              {path:'addNewUser',
              name:'addNewUser',
              component:()=>import(/* webpackChunkName:'addNewUser */ '@/components/accountManager/addNewUser')}
            ]
        },
          {path:'PermissionManage',
          name:'PermissionManage',
          component:()=>import(/* webpackChunkName:'PermissionManage' */ '@/components/PermissionManage/PermissionManage'),
            children:[
              {
                path:'addNewPersmission',
                name:'addNewPersmission',
                component:()=>import(/* webpackChunkName:'addNewPersmission' */ '@/components/PermissionManage/addNewPersmission')
              }
            ]
          },
          {
            path:'LotteryList',
            name:'LotteryList',
            component:()=>import(/* webpackChunkName:'LotteryList' */ '@/components/findAllGames/LotteryList'),
            children:[
              {
                path:'addNewGame',
                name:'addNewGame',
                component:()=>import(/* webpackChunkName:'addNewGame' */ '@/components/findAllGames/addNewGame')
              },
              {
                path:'ssq',
                name:'ssq',
                component:()=>import(/* webpackChunkName:'ssq' */ '@/components/findAllGames/ssq')
              }
            ]
          }
        ]
    }
  ]
})
