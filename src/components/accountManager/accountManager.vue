<template>
    <div id="accountManager">
       <div id="content">
            <table>
                <tr>
                    <td colspan="4">
                        <el-button type='primary' style="width:100%" @click="pushView({name:'addNewUser'})">新增用户</el-button>
                    </td>
                </tr>
                <tr style="font-size:18px">
                    <td>账号名</td>
                    <td>角色列表</td>
                    <td>操作</td>
                </tr>
                <tr v-for='(item,index) in allUsers' :key='index'>
                    <td>{{ item.username }}</td>
                    <td></td>
                    <td>
                        <el-button type='danger' @click="pushView({name:'addNewUser',params:item})">编辑</el-button>
                        <el-button type='danger' @click='deleteUser(item)'>删除</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <router-view/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['allUsers'])
    },
    methods:{
        // 删除账号
        deleteUser(item){
            // console.log(item)
            var action = ()=>{
                this.post(this.$apis.deleteUser,{_id:item._id})
                .then((resp)=>{
                    this.$store.dispatch('loadFindAllUsers');
                })
            }
            this.operatorConfirm('删除',action)
        }
    },
    created(){
        this.$store.dispatch('loadFindAllUsers');
        console.log(this.allUsers)
    }
}
</script>

<style lang="scss" scoped>
#accountManager{
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
