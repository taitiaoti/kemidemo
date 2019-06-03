<template>
    <div id="PermissionManage">
        <div style="height:50px;box-sizzing:border-box;border-bottom: 1px solid lightgray">
            <el-button type='primary' @click="pushView({name:'addNewPersmission'})">新增权限</el-button>
        </div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
            <el-submenu :index="''+index" v-for='(item,index) in userPermission' :key='index'>
                <template slot="title">
                    <div id="permissions">
                        <span>{{item.permissionDesc}}</span>
                        <div style="margin-right:30px">
                            <el-button type='danger' @click="deletePermission(item)">删除</el-button>
                        </div>
                    </div>
                </template>
                <el-menu-item-group v-for='(item,key) in item.children' :key='key+item'>
                    <el-menu-item :index="index+'-'+key">{{ item.permissionDesc}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
        </el-menu>
        <router-view/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState(['userPermission'])
    },
    methods:{
        deletePermission(item){
            this.$http.post(this.$apis.deletePermission,{_id:item._id})
            .then((resp)=>{
                this.$store.dispatch('loadPermission')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-submenu{
        border-bottom: 1px solid lightgray
    }
    #permissions{
        display: flex;
        justify-content: space-between;
    }
</style>
