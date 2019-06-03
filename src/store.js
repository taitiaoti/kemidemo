import Vue from 'vue'
import Vuex from 'vuex'
import apis from '@/apis'
import axios from '@/utils/bzaxios'

Vue.use(Vuex)
// 查看所有权限
const loadAction = (commit,payload,mutationName)=>{
  var respArr = JSON.parse(localStorage.getItem('response'));
  // console.log(respArr)
  axios.get(payload.api,{message:respArr.message,success:respArr.success,allPermission:respArr.response})
  .then((resp)=>{
      // console.log(resp)
      var resp = resp.data;
      // console.log(resp)
      commit(mutationName,resp)
  })
}
// 获取所有角色信息
const Totree = (state,payload)=>{
  // 处理数据
  var allPermission = payload.allPermission;
  // 创建一个空对象
  var obj = {};
  // 遍历数据
  for(var i=0;i<allPermission.length;i++){
    // console.log(allPermission[i])
    // 如果parentid等于0就是父级数据
    if(allPermission[i].parentid==0){
      // 在数据的子元素里创建一个空数组
      allPermission[i].children = [];
      // 把该数据的_id当做obj的key，数据当作obj的值
      obj[allPermission[i]._id] = allPermission[i];
    }
  }
  // 遍历数据
  for(var j=0;j<allPermission.length;j++){
    // console.log(allPermission[j])
    // 遍历obj对象
    for(let key in obj){
      // 如果obj的key等于该数据的parentid，就把该数据push进刚开始创建的空数组
      if(key === allPermission[j].parentid){
        obj[key].children.push(allPermission[j])
      }
    }
  }
  // 遍历obj对象，把obj的值push到state的数组里
  for(let key in obj){
    state.userPermission.push(obj[key])
  }
  // console.log(state.userPermission)
}

export default new Vuex.Store({
  state: {
    roles:[],
    permissionList:[],
    userPermission:[],
    allRoles:[],      //所有角色
    allUsers:[],      //所有账号
    allGames:[],      //所有彩种
  },
  getters:{
   
  },
  mutations: {
    LOADPERMISSION(state,payload){
      state.permissionList = payload;
      Totree(state,payload)
    },
    LOADDINDALLPOLES(state,payload){
      state.allRoles = payload;
    },
    LOADFINDALLUSERS(state,payload){
      state.allUsers = payload;
    },
    LOADROLES(state,payload){
      state.roles = payload
    },
    LOADFINDALLGAMES(state,payload){
      state.allGames = payload;
    }
  },
  actions: {
    // 查看权限
    loadPermission({commit},payload={}){
      payload.api = apis.showAllPermission;
      loadAction(commit,payload,'LOADPERMISSION')
    },
    // 获取所有角色信息
    loadDindAllRoles({commit},payload={}){
      payload.api = apis.findAllRoles;
      axios.get(payload.api)
        .then((resp)=>{
            var resp = resp.data.allRoles;
            commit('LOADDINDALLPOLES',resp)
        })
    },
    //获取所有账号
    loadFindAllUsers({commit},payload={}){
      payload.api = apis.findAllUsers
      axios.get(payload.api)
        .then((resp)=>{
            var resp = resp.data.allUsers;
            commit('LOADFINDALLUSERS',resp)
        })
    },
    loadRoles({commit},payload){
      var myRoles = JSON.parse(localStorage.getItem('response')).response.roles;
      commit('LOADROLES',myRoles)
    },
    // 所有彩种
    loadFindAllGames({commit},payload={}){
      payload.api = apis.findAllGames;
      axios.get(payload.api)
      .then((resp)=>{
        var resp = resp.data.data;
        // console.log(resp)
        commit('LOADFINDALLGAMES',resp)
      })
    }
  }
})
