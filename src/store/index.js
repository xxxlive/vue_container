import router from '@/router'
import {createStore} from 'vuex'
import {resetRouter} from '@/router'

export default createStore({
    state: {
        currentPathName: '',
        permisssion: [],
        test : 2
    },
    getters: {},
    mutations: {
        setPath(state) {
            state.currentPathName = localStorage.getItem('currentPathName')
        },
        logout() {
            localStorage.removeItem("user")
            localStorage.removeItem("menus")
            localStorage.removeItem("currentPathName")
            router.push("/login")
            resetRouter()
        }
    },
    actions: {},
    modules: {}
})
