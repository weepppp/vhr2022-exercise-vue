import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'

import {postKeyValueRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";

//将封装的方法都挂到 Vue 上
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

/**
 * 全局的前置导航守卫（在页面跳转之前，进行拦截）
 * 这个类似于 Java 中的 Filter
 * to：去哪里，目标页面
 * from：从哪来，从哪个页面上跳转来
 * next：类似过滤器中的 filterChain
 *
 * Vuex Vux
 *
 * 将动态菜单的数据，存入到一个公共的地方（Vuex/Pinia），Vuex 中的数据有一个特点：浏览器刷新的时候，数据会丢失。
 *
 * 在页面跳转的时候，通过全局前置的导航守卫去监听所有的页面跳转，在页面跳转的时候，去判断 Vuex 中还有没有动态菜单的数据，如果有，说明这次跳转就是一个普通的跳转，这种直接跳转即可，不用做任何额外的事情。如果 Vuex 中没有动态菜单的数据，那么就说明用户按了 F5 进行的页面跳转，那么此时就要去服务端重新加载一下菜单数据。
 *
 */
router.beforeEach((to, from, next) => {
    // ...
    // next();
    if (to.path == '/') {
        //说明要去的是登录页面
        next();
    }else{
        if(window.sessionStorage.getItem("hr")) {
            initMenu(store, router);
            next();
        } else {
            next("/?redirect="+to.path);
        }

    }
})

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
