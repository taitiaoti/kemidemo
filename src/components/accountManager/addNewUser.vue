<template>
    <div id="addNewUser">
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type='password' v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="userInfo.checkList" v-for='(item,index) in allRoles' :key='index'>
                        <el-checkbox :label="item.roleName"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type='danger'>取 消</el-button>
                <el-button type="primary" @click="addNew">{{isUpdateRoleInfo?'编 辑':'新 增'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            dialogVisible:true,
            isUpdateRoleInfo:false,
            userInfo:{
                checkList:[],
                username:'',
                password:''
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ]
            }
        }
    },
    computed:{
        ...mapState(['allRoles'])
    },
    methods:{
        handleClose(){
            this.$router.go(-1)
        },
        // 新增账号
        addNew(){
            console.log(this.allRoles)
            this.post(this.$apis.addNewUser,this.userInfo)
            .then((resp)=>{
                // console.log(resp)
                this.$store.dispatch('loadFindAllUsers');
                this.$router.go(-1)
            })
        }
    },
    created(){
        console.log(this.$route.params)
    }
}
</script>

<style lang="scss" scoped>
   
</style>
