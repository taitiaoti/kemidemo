<template>
    <div id="RoleManage">
        <div id="content">
            <table>
                <tr>
                    <td colspan="4">
                        <el-button type='primary' style="width:100%" @click="pushView({name:'addNewRole'})">新增角色</el-button>
                    </td>
                </tr>
                <tr style="font-size:18px">
                    <td>角色名称</td>
                    <td>角色描述</td>
                    <td>操作</td>
                </tr>
                <tr v-for='(item,index) in allRoles' :key='index'>
                    <td>{{ item.roleName }}</td>
                    <td>{{ item.roleDesc }}</td>
                    <td>
                        <el-button type='danger'>编辑角色</el-button>
                        <el-button type='danger'>删除角色</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            allRoles:[]
        }
    },
    methods:{
        
    },
    created(){
        this.$http.get(this.$apis.findAllRoles)
        .then((resp)=>{
            console.log(resp)
            var resp = resp.data;
            this.allRoles = resp.allRoles;
        })
    }
}
</script>

<style lang="scss" scoped>
    #RoleManage{
        width: 100%;
        height: 100%;
        overflow-y:scroll;
        &::-webkit-scrollbar{
            display: none;
        }
        #content{
            width: 50%;
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            table{
                width: 100%;
                tr{
                    height: 64px;
                    td{
                        text-align: center;
                        line-height: 64px;
                    }
                }
            }
        }
    }
</style>
