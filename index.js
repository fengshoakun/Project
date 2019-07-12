import Vue from "vue";
import Vuex from "vuex";
import left from "./modlue/left.js";
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        left
    }
})