<template>
    <div id="addNewGame">
        <el-dialog
            title="新增彩种"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form :model="gameInfo" :rules="rules" ref="gameInfo" label-width="80px">
                <el-form-item label="英文名" prop="cn">
                    <el-input v-model="gameInfo.cn"></el-input>
                </el-form-item>
                <el-form-item label="中文名" prop="en">
                    <el-input v-model="gameInfo.en"></el-input>
                </el-form-item>
                <el-form-item label="icon">
                    <input type="file" :key="1" @change="fileData($event,'icon')">
                </el-form-item>
                <el-form-item label="icon2">
                    <input type="file" :key="2" @change="fileData($event,'icon2')">
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
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return {
            dialogVisible:true,
            files:{},
            gameList:[],
            gameInfo:{
                cn:'',
                en:'',
                id:''
            },
            rules:{
                cn:[
                    {required:true,message:'名字不能为空',tiggers:blur}
                ],
                en:[
                    {required:true,message:'名字不能为空',tiggers:blur}
                ]
            }
        }
    },
    computed:{
        ...mapState(['allGames'])
    },
    methods:{
        handleClose(){
            this.$router.go(-1)
        },
        cancel(){
            this.handleClose()
        },
        fileData(ev,type){
            this.files[type] = ev.target.files;
            // var files = this.files;
        },
        addNew(){
            var fd = new FormData();
            console.log(this.files)
            for(var i=0;i<this.files.length;i++){
                console.log(this.files[i])
                // console.log(this.files[i])
                // var reader = new FileReader();
                // reader.readAsDataURL(this.files[i]);
                // reader.onload = function(ev){
                //     // console.log(ev.target.result)
                //     fd.append('file',ev.target.result);
                // } 
                // console.log(this.files[i])
                fd.append('file',this.files[i])
            }
            fd.append('cn',this.gameInfo.cn);
            fd.append('en',this.gameInfo.en);
            // console.log(fd.get('file'))
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            // console.log(axios.post)
            // console.log(this.$apis.addNewGame)
            // axios.post(this.$apis.addNewGame,fd,config)
            // .then((resp)=>{
            //     console.log(resp)
            // })
        }
    },
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
    .el-icon-plus{
            width: 80px;
            height: 80px;
            border: 1px dotted gray;
            text-align: center;
            line-height: 80px;
            font-size: 30px;
        }
</style>
