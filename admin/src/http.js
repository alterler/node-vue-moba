import axios from "axios"
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
    baseURL: ' http://localhost:3000/admin/api'
    // process.env.VUE_APP_API_URL || '/admin/api'
})

http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, function (err) {
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    if (err.response.status === 401) {
        router.push('/login')
    }

    return Promise.reject(err)
})

export default http