<template>
    <div id="ssq">
        <table>
            <tr style="background:lightcyan">
                <th>期号</th>
                <th v-for='(item,index) in alllist' :key='index'>
                    {{ item | filterData }}
                </th>
                <th v-for="(item,index) in 16" :key='index+"item"'>{{item | filterData}}</th>
            </tr>
            <tr v-for='(item,index) in ssqList' :key='index'>
                <td>{{item.period}}</td>
                <td v-for="(item,index) in item.missNumber.general" :key="index"
                 :class="{'red':index<33&&item==0||item==-1,'blue':index>=33&&item==0}"
                 >
                    <!-- {{ item < 1 ? (index < 33 ? index+1:index+1-33):item }} -->
                    {{ item | number(index)}}
                </td>
            </tr>
        </table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total/2"
            @current-change="loadMore"
            >
        </el-pagination>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
export default {
    data(){
        return {
            alllist:33,
            ssqList:[],
            total:0,
            gameName:'',
            num:10
        }
    },
    methods:{
        loadMore(pageNo){
            this.$http.get(this.$apis.findByGameName,{gameName:this.gameName,pageNo:pageNo,pageSize:20})
            .then((resp)=>{
                // console.log(resp.data.data)
                this.ssqList = resp.data.data.data;
            })
        }
    },
    created(){
        // console.log(this.$route.params.gameName)
        const _this = this;
        this.gameName = this.$route.params.gameName;
        this.$http.get(this.$apis.findByGameName,{gameName:this.gameName,pageNo:1,pageSize:20})
        .then((resp)=>{
            this.total = resp.data.data.total;
            this.ssqList = resp.data.data.data;
        });
        
    },
    updated(){
        var table = document.getElementsByTagName("table")[0];
        var blueBalls = document.getElementsByClassName("blue");
        var canvas = document.getElementById("canvas");
    
        canvas.width = table.clientWidth;
        canvas.height = table.clientHeight;
        canvas.style.position = "absolute";
        canvas.style.left = table.offsetLeft;
        canvas.style.top = '0';
        canvas.style.zIndex = 1000;
        
        var ctx = canvas.getContext('2d');
        var x = blueBalls[0].offsetLeft;
        var y = blueBalls[0].offsetTop;
        var height = blueBalls[0].clientHeight;
        var width = blueBalls[0].clientWidth;
        ctx.moveTo(x+width/2,y+height/2);
        for(var i=1;i<=blueBalls.length-1;i++){
            ctx.lineTo(blueBalls[i].offsetLeft+width/2,blueBalls[i].offsetTop+height/2);
        }
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        ctx.stroke();
    },
    filters:{
        filterData(value){
            if(value<10){
                value="0"+value;
            }
            return value;
        },
        number(value,index){
            return value < 1 ? (index < 33 ? index+1:index+1-33):value
        }
    }
}
</script>

<style lang="scss" scoped>
    #ssq{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        padding: 10px;
        box-sizing: border-box;
    }
     table {
            width: 100%;
            border-collapse: collapse;
            border: solid gray;
            border-width: 1px 0 0 1px;
        }
        tr {
            width: 100%;
        }
        th,td{
            // width: 10px;
            text-align: center;
            border: solid gray;
            border-width: 0 1px 1px 0;
            padding: 8px 5px;
            box-sizing: border-box
        }
        .el-pagination{
            position: fixed;
            bottom: 10px;
        }
        .red{
            background: red;
            border-radius: 50%;
            color: white;
        }
        .blue{
            background: blue;
            border-radius: 50%;
            color: white;
        }
</style>
