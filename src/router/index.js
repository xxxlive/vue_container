import  {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

const routess = [
    {
        path: '/login',
        name: 'Login',
        // component: LoginView
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue')

    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routess
})


export const resetRouter = () => {
    router.matcher = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes: routess
    })
}

export const setMenus = () => {
    const storeMenus = localStorage.getItem("menus");
    if (storeMenus) {
        const currentRouterNames = router.getRoutes().map(v => v.name)
        if (!currentRouterNames.includes("Main")) {
            const mainRoute = {
                path: '/',
                name: 'Main',
                component: () => import('../views/MainView.vue'),
                // redirect: '/home',
                children: [
                    {
                        path: 'person',
                        name: 'PersonCenter',
                        component: () => import('../views/PersonView.vue'),
                    },
                    {
                        path: 'password',
                        name: 'ModifyPwd',
                        component: () => import('../views/PasswordView.vue'),
                    }
                ]
            }
            const menus = JSON.parse(storeMenus)
            menus.forEach(item => {
                if (item.path) {
                    let itemMenu = {
                        path: item.path.replace("/", ""),
                        name: item.name,
                        component: () => import('../views/' + item.pagepath + '.vue'),
                    }
                    mainRoute.children.push(itemMenu)
                } else if (item.children.length) {
                    item.children.forEach(item => {
                        if (item.path) {
                            let itemMenu = {
                                path: item.path.replace("/", ""),
                                name: item.name,
                                component: () => import('../views/' + item.pagepath + '.vue'),
                            }
                            mainRoute.children.push(itemMenu)
                        }
                    })
                }
            })
            router.addRoute(mainRoute);
        }
    }
}

router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name);
    store.commit('setPath')

    if (!to.matched.length) {
        //menus
        const userid = localStorage.getItem("userid");
        if (userid) {
            next("/404")
        } else {
            next("/login")
        }
    }
    next()
})

export default router
