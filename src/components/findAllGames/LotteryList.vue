<template>
    <div id="LotteryList">
        <div class="demo-image" >
            <div class="block" v-for="(item,index) in allGames" :key="index">
                <span class="demonstration" v-for="(item,index) in item.games" :key='index+item' @click="pushView({name:item.en,params:{gameName:item.en}})">
                    <img :src='url+item.icon2'>
                    <span class="gameName">{{ item.cn }}</span>
                </span>
                <div id="add" class="el-icon-plus" @click="pushView({name:'addNewGame'})"></div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            url:'http://localhost:3000'
        }
    },
    computed:{
        ...mapState(['allGames'])
    },
    created(){
        this.$store.dispatch('loadFindAllGames')
    }
}
</script>

<style lang="scss" scoped>
    .block{
        display: flex;
    }
    .demonstration{
        display: flex;
        flex-direction: column;
        margin: 0 20px;
    }
    #add{
        width: 80px;
        height: 80px;
        border: 1px dotted gray;
        border-radius: 5px;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
    }
    .gameName{
        display: block;
        width: 80px;
        text-align: center;
        margin-top: 10px;
    }
</style>
