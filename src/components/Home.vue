<template>
    <div id="home">
        <div class="homeTop">
            <el-button type='danger' @click="logout">退出</el-button>
        </div>
        <div class="homeBottom">
            <div class="navBar">
                <nav-bar/>
            </div>
            <div class="centent">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar'
export default {
    components:{
        NavBar
    },
    methods:{
        logout(){
            var action = ()=>{
                localStorage.clear();
                this.$router.push({name:'login'})
            }
            this.operatorConfirm('退出',action)
        }
    },
    created(){
        this.$store.dispatch('loadPermission'),
        this.$store.dispatch('loadRoles')
    }
}
</script>

<style lang="scss" scoped>
    #home{
        width: 100%;
        height: 100%;
        .homeTop{
            width:100%;
            height: 7%;
            background: lightcyan;
            text-align: right;
            padding-right: 20px;
            padding-top:5px; 
            box-sizing: border-box;
        }
        .homeBottom{
            width: 100%;
            height: 93%;
            display: flex;
            .navBar{
                width: 20%;
                height: 100%;
            }
            .centent{
                width: 80%;
                height: 100%;
                min-width: 1300px;
                padding: 20px;
                box-sizing: border-box;
            }
        }
    }
</style>
