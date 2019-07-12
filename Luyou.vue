<template>
    <div class="container_right">
        <div class="header_B">
            <h2>||</h2>
            <span>办公室加班申请表</span>
        </div>
        <div class="main_B">
            <div class="main_BB">
               
                <p><span>申请人姓名：</span><span>{{Arrpost.nickname}}</span></p>
                <p><span>直接主管：</span><span>廖修亭</span></p>
                <p><span>申请单号：</span><span>{{Arrpost.applicationNumber}}</span></p>
                <p><span>发起时间：</span><span>{{new Date(Arrpost.updated_at).toLocaleDateString()}}</span></p>
            </div>
            <div class="main_CC">
                <div class="main_DD">
                    <span>申请信息</span>
                </div>
                <p><span>加入日期:</span><span>{{new Date(Arrpost.updated_at).toLocaleDateString()}}</span></p>
                <p><span>加入类型:</span><span>工作日加班</span></p>
                <p><span>加班起始时间:</span><span>{{new Date(Arrpost.startTime).toLocaleDateString()}}</span></p>
                <p><span>加班结束时间:</span><span>{{new Date(Arrpost.endTime).toLocaleDateString()}}</span></p>

                <p><span>共计时数</span><span>{{dataLI(Arrpost.startTime)}}</span></p>
            </div>
        </div>
        <div class="footer_B">
            <span @click="clickWs()">取消</span>
            <span>提交</span>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            Arrpost:{}
        }
    
    },
    methods:{
        dataLI(startTime){
            console.log(startTime)
            return startTime
        }
    },
    created(){
        let id=this.$route.query.id;
        let active = this.$route.query.active
        
          axios.defaults.headers.common['token'] = localStorage.token
            axios.get(`http://localhost:3000/api/apply/${active}?applicationNumber=${id}`).then((res)=>{
               this.Arrpost=res.data.data;
                console.log(this.Arrpost)
                console.log(new Date())
        })
    },
    methods:{
        clickWs(){
           console.log(this.$router.push("/HelloWorld/Overtime"))
        }
    }
     
}
</script>
<style>
    .container_right{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
       background: #FBF6F5;
    }
    .header_B{
        width: 100%;
        height: 55px;
        background: #006152;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        color: #fff;
        position: relative;
    }
     .header_B>h2{
        position: absolute;
        left: 30px;
    }
    .main_B{
        flex: 1;
        overflow: auto;
    }
    .footer_B{
        width: 100%;
        height: 55px;
        background: #ccc;
    }
    .main_BB{
        width: 100%;
        height: 150px;
        background: #006152;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
    }
    .main_BB>p{
        line-height: 30px;
    }
    .main_BB>p>span{
        margin-left: 50px;
    }
    .main_CC{
        width: 80%;
        height: 400px;
        background: #fff;
        position: absolute;
        top: 180px;
        left: 35px;
        border-radius: 10px;
    }
    .main_CC>p{
        line-height: 50px;
    }
    .main_CC>p>span{
        margin-left: 30px;
    }
    .footer_B{
        display: flex;
        justify-content: center;
        align-items: center;
      
    }
    .footer_B>span{
         display: flex;
        justify-content: center;
        flex: 1;
    }
   .main_DD{
       width: 100%;
       height: 55px;
       border-bottom: 1px solid #ccc; 
       display: flex;
       align-items: center;
     
   }
   .main_DD>span{
       margin-left: 20px;
   }
    .footer_B>span:nth-child(2){
        display: flex;
        align-items: center;
        height: 55px;
        background: #006152;
        color: #fff;
    }
</style>
