<template>
    <div class="container_left">
        <input type="text" v-model="phone" placeholder="请输入手机号"><br>
        <input type="text" v-model="password" placeholder="密码">
        <button class="btn" @click="clickFn()">登录</button>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      password:"",
      phone:""
    }
  },
  methods:{
    clickFn(){
    axios.post("http://localhost:3000/api/login",{phone:this.phone,password:this.password}).then((res)=>{
        let reg = res.data.token;
           if(reg){
             localStorage.setItem('token',reg);
           this.$router.push('HelloWorld/Overtime')
           }else{
             console.log("错误")
           }

      })
    }
  }
 
}
</script>
<style>
    .container_left{
      margin-left: 40px;
      
    }
    .container_left>input{
        width: 90%;
        height: 50px;
        outline: none;
        border:0;
        border-bottom: 1px solid #ccc;
        margin-top: 20px;
    }
    .btn{
        
    }
</style>
