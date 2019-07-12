import axios from "axios";


const state = {
    list:[],
    active:"overtime",
    Arr:[]
}
const mutations={
    updata(state,payload){
        state.list = payload;
    },
    type(state,payload){
        state.active = payload
    },
    upjoin(state,payload){
        state.Arr=payload
    }
}   
const actions ={
    getdata({commit}){
        return new Promise((resolve,reject)=>{
            axios.get("http://localhost:3000/api/task/list?status=1&type=overtime&create_at=0&pageSize=10&page=1").then((res)=>{
                console.log(res.data.data);
                commit("updata",res.data.data)
            })
        })
    },
    getpate({commit}){
        return new Promise((resolve,reject)=>{
            axios.defaults.headers.common['token'] = localStorage.token
            axios.get("http://localhost:3000/api/apply/overtime?applicationNumber=3gvn7916rwg0").then((res)=>{
                console.log(res.data.data)
                commit("upjoin",res.data.data)
            })
        })
    }
}
export default {state,mutations,actions}