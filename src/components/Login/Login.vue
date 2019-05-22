<template>
    <div id="login">
        <div id="loginView">
            <h1 style="font-size:30px;text-align:center;margin:20px 0;">可米彩票</h1>
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
        // background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        #loginView{
            width: 30%;
            height: 40%;
            background: white;
            border-radius: 5px;
            box-shadow: 0 0 10px 5px lightgray;
            padding: 10px;
            box-sizing: border-box;
            .loginBox{
                margin-top: 30px;
                display: flex;
                justify-content: center;
                .el-button{
                    width: 100px;
                }
            }
        }
    }
</style>
