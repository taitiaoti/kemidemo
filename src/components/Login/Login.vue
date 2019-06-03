<template>
    <div id="login">
        <div id="loginView">
            <h1 style="font-size:50px;text-align:center;margin:100px 0;color:red">可米彩票</h1>
            <el-form label-width='80px' :model='userInfo' :rules='rules' ref='userInfo'>
                <el-form-item label='用户名' prop='accountName'>
                    <el-input v-model='userInfo.accountName'></el-input>
                </el-form-item>
                <el-form-item label='密码' prop='password'>
                    <el-input type='password' v-model='userInfo.password'></el-input>
                </el-form-item>
            </el-form>
            <div class="loginBox">
                <el-button type='primary' @click='loginBTN'>登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:{
                accountName:'',
                password:''
            },
            rules:{
                accountName:[
                    {required:true,message:'用户名不能为空',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        loginBTN(){
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    console.log('校验通过');
                    this.$http.post(this.$apis.signin,this.userInfo)
                    .then((resp)=>{
                        var resp = resp.data;
                        var token = resp.token;
                        console.log(resp)
                        if(resp.success){
                            localStorage.setItem('token',token);
                            localStorage.setItem('response',JSON.stringify(resp));
                            var query = this.$route.query;
                            // 判断是否需要重定向，如果不需要重定向，直接跳转
                            // 到home组件
                            if(!query.redirect){
                                this.$router.push({name:'home'})
                            }else{
                                this.$router.push({path:query.redirect})
                            }
                        }else{
                            this.$message.error('登录失败，请检查用户名和密码')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    console.log('校验失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #login{
        width:100%;
        height: 100%;
        background: url(https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1558609760&di=9e28ba6c350f11d77162de26315c7aaf&src=http://pic.58pic.com/58pic/13/45/22/46j58PICVts_1024.jpg) no-repeat 0px 0px;
        background-size: 100%;
        display: flex;
        justify-content: flex-end;
        #loginView{
            width: 30%;
            min-width: 450px;
            height: 100%;
            background: rgba(0,0,0,.3);
            padding: 10px;
            box-sizing: border-box;
            .el-form-item{
                margin: 50px 0;
            }
            .loginBox{
                margin-top: 30px;
                margin-left: 80px; 
                display: flex;
                justify-content: center;
                .el-button{
                    width: 100%;
                }
            }
        }
    }
</style>
