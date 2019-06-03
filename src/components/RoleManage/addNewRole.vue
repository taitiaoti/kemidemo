<template>
    <div id="addNewRole">
        <el-dialog
            title="新增角色"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="userInfo.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="userInfo.roleDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tree
                        ref="tree"
                        :data="userPermission"
                        :props="defaultProps"
                        show-checkbox
                        node-key="_id"
                        :expand-on-click-node="false"
                        v-model='userInfo.permissions'
                        @check-change="handleCheckChange">
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type='danger' @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addNew">{{isUpdateRoleInfo?'编 辑':'新 增'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
      return {
        dialogVisible: true,
        isUpdateRoleInfo:false,
        defaultProps: {
            children: 'children',
            label: 'permissionDesc'
        },
        userInfo:{
            roleName:'',
            roleDesc:'',
            permissions:'',
        },
        rules:{
            roleName:[
                {required:true,message:'角色名不能为空',trigger:'blur'}
            ],
            roleDesc:[
                {required:true,message:'请添加描述信息',trigger:'blur'}
            ]
        }
      };
    },
    computed:{
        ...mapState(['userPermission'])
    },
    methods: {
        // 取消按钮
        cancel(){
            var action = ()=>{
                this.$router.go(-1)
            }
            this.operatorConfirm("退出新增",action);
        },
        // 新增按钮
        addNew(){
            // console.log(this.userInfo)
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    if(this.isUpdateRoleInfo){
                        // 更新
                       this.post(this.$apis.updateRoleInfo,this.userInfo)
                       .then((resp)=>{
                           this.userInfo={};
                           this.$store.dispatch('loadDindAllRoles');
                           this.$router.go(-1)
                       })
                    }else{
                        // 新增
                        this.post(this.$apis.addNewRole,this.userInfo)
                        .then((resp)=>{
                            this.userInfo={};
                            this.$router.go(-1);
                            // 重新请求所有角色信息
                            this.$store.dispatch('loadDindAllRoles');
                        })
                    }
                    
                }else{
                    return false
                }
            })
        },
        handleCheckChange(){
            let res = this.$refs.tree.getCheckedNodes();
            let arr = [];
            res.forEach((item)=>{
                arr.push(item._id)
            })
            this.userInfo.permissions = arr;
        },
        handleClose() {
            this.cancel();
        }
    },
    created(){
        // console.log(this.$route.params.allRoles)
        if(this.$route.params.allRoles){
            this.isUpdateRoleInfo = true;
            this.userInfo = this.$route.params.allRoles;
            // console.log(this.userInfo)
        }else{
            this.isUpdateRoleInfo = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
