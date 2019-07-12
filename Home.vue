<template>
    <div class="container">
        <div class="header">
           
            <div class="header_left">
                 <span v-for="(item,index) in dataArr" :class="{active:con===index}" :key="index" @click="clickFn(item,index)">{{item.name}}</span>
            </div>
            <div class="header_right">
                <!-- <router-link tag="span" to="/HelloWorld/Overtime">加班</router-link>
                <router-link tag="span" to="/HelloWorld/Vacation">休假</router-link> -->
                <span v-for="(item,index) in dataList" :key="index" @click="clickFs(index)">{{item.name}}</span>
            </div>
        </div>
        
        <div class="main">
            <div class="main_left"  v-for="(item,index) in VueList" @click="clickFf(item.applicationNumber)" :key="index">
                <p><span>{{item.applicationNumber}}</span><span>待审批</span></p>
                <p>申请人<span>{{item.nickname}}</span>加班类型<span>工作日加班</span></p>
                <p>加班日期<span>{{item.create_at.slice(0,10)}}</span>加班时速<span>{{newDate(item.endTime,item.startTime)+".0"}}</span></p>
            </div>
        </div>
        <div class="footer">
            <div class="footer_center">
                <h3>+发起任务</h3>
            </div>
        </div>
    </div> 
</template>
<script>
    import axios from "axios";
    import {mapState} from "vuex"
export default {
    
    data(){
        return{
            con:0,
            dataArr:[
                {
                    name:"待处理",
                    id:0,
                    type:0
                }, {
                    name:"已发起",
                    id:1,
                    type:0
                }, {
                    name:"已处理",
                    id:2,
                    type:0
                }
            ],
            dataList:[
                {
                    name:"加班",
                    id:0
                },{
                    name:"休假",
                    id:1
                }
            ],
            VueList:[] 
        }
    },
     methods:{
          newDate(endTime,startTime){
           
            let end = new Date(endTime);
            let start = new Date(startTime);
            let t =  Math.abs(end-start);
            let store =t/1000/60/60/24;
            return store
        },
       clickFf(id){
            this.$router.push({path:"/Luyou",query:{id,active:this.active}})
       },
        clickFn(item,index){
            this.con = item.id;
            
           
           axios.get(`http://localhost:3000/api/task/list?status=${index}&type=${this.active}&create_at=0&pageSize=10&page=1`).then((res)=>{
               if(res.data.code==1){
                   this.VueList=res.data.data
               }
           })
        },
        clickFs(index){

           if(index===0){
               this.$store.commit("type",'overtime')
           }else{
               this.$store.commit("type","vacation")
           }
           axios.get(`http://localhost:3000/api/task/list?status=0&type=${this.active}&create_at=0&pageSize=10&page=1`).then((res)=>{
               if(res.data.code==1){
                   this.VueList=res.data.data
               }
           })
        }
    },
    
     computed:{
        ...mapState({
            active:state=>state.left.active
        }),
        ...mapState({
            Arr:state=>state.left.Arr
        })
       
    },
    created(){
        this.$store.dispatch('getdata'),
        this.$store.dispatch("getpate")
    },
    
}
</script>
<style>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .header{
        width: 100%;
        height: 180px;
        
    }
    .header_left{
        width: 100%;
        height: 90px;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header_left>span{
        flex: 1;
         display: flex;
        justify-content: center;
    }
    .header_right{
        width: 100%;
        height: 90px;
        background: #ccc;
         display: flex;
         justify-content: center;
         align-items: center;
    }
    .header_right>span{
        flex: 1;
        display: flex;
         justify-content: center;
    }
    .main{
        flex: 1;
        overflow: auto;
    }
    .footer{
        width: 100%;
        height: 120px;
        background: #ccc;
        display: flex;
        justify-content:flex-end;
        align-items: center;
    }
    .footer_center{
        width: 170px;
        height:60px;
        background: rgb(8, 55, 109);
        border-radius: 50px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .main_left{
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #ccc;
    }
    .main_left>p{
        line-height: 40px;
        margin-left: 10px;
    }
    .main_left>p>span{
        margin-left:40px;
    }
    .active{
        color: red;
    }
</style>
