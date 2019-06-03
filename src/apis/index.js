import Vue from 'vue'

var apis = {
    signin:'/signin',   //登录
    showAllPermission:"/system/permission/showAllPermission",   //查询所有权限
    findAllRoles:'/system/role/findAllRoles',   //角色管理
    addNewRole:'/system/role/addNewRole',       //新增角色
    deleteRole:"/system/role/deleteRole",       //删除角色
    updateRoleInfo:'/system/role/updateRoleInfo',    //编辑角色接口
    findAllUsers:'/system/user/findAllUsers',      //所有账号信息
    addNewUser:'/system/user/addNewUser',            //新增用户
    deleteUser:'/system/user/deleteUser',              //删除账号

    addNewPersmission:'/system/permission/addNewPersmission',       //新增权限
    deletePermission:'/system/permission/deletePermission',         //删除权限

    // 彩票
    findAllGames:'/gameManage/games/findAllGames',              //获取所有彩种
    addNewGame:'/gameManage/games/addNewGame',                  //更新彩票信息
    findByGameName:'/gameManage/games/findByGameName',          //彩种信息
}

Vue.prototype.$apis = apis;
export default apis;