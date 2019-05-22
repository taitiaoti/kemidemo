<template>
    <div id="NavBar">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu :index="''+index" v-for='(item,index) in userPermission' :key='index'>
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.permissionDesc}}</span>
                </template>
                <el-menu-item-group v-for='(item,key) in item.children' :key='key+item'>
                    <el-menu-item :index="index+'-'+key" @click="pushView(item)">
                        {{ item.permissionDesc}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            
        }
    },
    methods:{
        pushView(item){
            this.$router.push({name:item.permissionName})
        }
    },
    computed:{
        ...mapState(['userPermission'])
    }
}
</script>

<style lang="scss" scoped>
    #NavBar{
        width: 100%;
        height: 100%;
        min-width: 200px;
        .el-menu{
            width: 100%;
            height: 100%;
        }
    }
</style>
