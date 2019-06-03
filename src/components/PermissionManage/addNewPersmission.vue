<template>
    <div id="addNewPersmission">
        <el-dialog
            title="新增权限"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form :model="persmissionInfo" :rules="rules" ref="persmissionInfo" label-width="80px">
                <el-form-item label="权限名称" prop="permissionName">
                    <el-input v-model="persmissionInfo.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="permissionDesc">
                    <el-input v-model="persmissionInfo.permissionDesc"></el-input>
                </el-form-item>
                <el-form-item label="父级权限">
                    <el-input v-model="persmissionInfo.parentid"></el-input>
                </el-form-item>
                <el-form-item label="权限等级">
                    <el-input v-model="persmissionInfo.permissionLeve"></el-input>
                </el-form-item>
                <el-form-item label="排列序号">
                    <el-input v-model="persmissionInfo.sortNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type='danger' @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addNew">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:true,
            persmissionInfo:{
                permissionName:'',
                permissionDesc:'',
                parentid:'',
                sortNum:'',
                permissionLeve:''
            },
            rules:{
                permissionName:[
                    {required:true,message:'请输入权限名称',tiggers:blur}
                ],
                persmissionDesc:[
                    {required:true,message:'请输入权限描述',tiggers:blur}
                ]
            }
        }
    },
    methods:{
        handleClose(){
            this.$router.go(-1)
        },
        cancel(){
            this.handleClose()
        },
        addNew(){
            this.post(this.$apis.addNewPersmission,this.persmissionInfo)
            .then((resp)=>{
                this.handleClose();
                this.$store.dispatch('loadPermission')
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
