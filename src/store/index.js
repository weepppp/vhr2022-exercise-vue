import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    /**
     * 在这个里边定义变量
     */
    state: {
        menus: []
    },
    mutations: {
        /**
         * 这个方法用来给 menus 赋值
         * @param state 指的就是上面的 state，这个 state 用来访问这里定义的变量。一会在其他地方调用 SET_MENUS 方法的时候，并不需要传递 state 参数
         * @param menus
         * @constructor
         */
        SET_MENUS (state,menus) {
            state.menus = menus;
        }
    },
    actions:{

    }
})

export default store;
