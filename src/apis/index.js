import Vue from 'vue'

var apis = {
    signin:'/signin',   //登录
    showAllPermission:"/system/permission/showAllPermission",   //查看权限
    findAllRoles:'/system/role/findAllRoles',   //角色管理
    addNewRole:'/system/role/addNewRole',       //新增角色
    deleteRole:"/system/role/deleteRole",       //删除角色
}

Vue.prototype.$apis = apis;
export default apis;