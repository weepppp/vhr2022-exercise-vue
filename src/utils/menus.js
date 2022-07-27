import {getRequest} from "@/utils/api";

/**
 * 这个方法用来初始化菜单
 * @param store
 * @param router
 */
export const initMenu=(store,router)=>{

    if (store.state.menus && store.state.menus.length > 0) {
        //说明 store 中有菜单数据，那就说明这次跳转是一次普通的页面跳转
        return;
    }
    getRequest("/menus").then(resp => {
        //将服务端返回的 JSON 字符串中的 component 字符串变为一个 component 变量/对象
        let fmtMenus = formatMenu(resp);
        //1. 将动态菜单数据存入到 store 中，也就是存入到 Vuex
        store.commit('SET_MENUS', fmtMenus);
        //2. 将之添加到 router 对象中，将来页面跳转的时候会用到
        router.addRoutes(fmtMenus);
    });
}

function formatMenu(menus) {
    let formatMenus = [];
    menus.forEach(menu => {
        // let id = menu.id;
        // let path = menu.path;
        let {
            path,
            component,
            name,
            iconCls,
            children
        } = menu;
        if (children && children instanceof Array) {
            //说明这个菜单项是有子菜单的，那么子菜单中的 component 也需要处理
            children = formatMenu(children);
        }
        let fMenu = {
            path: path,
            name: name,
            icon: iconCls,
            children: children,
            component(resolve) {
                if (component == 'Home') {
                    require(['../views/Home.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        };
        formatMenus.push(fMenu);
    })
    return formatMenus;
}
