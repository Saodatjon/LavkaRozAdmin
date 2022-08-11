import axios from 'axios'
import { domain } from '../utilis/urls'

const APP_MODE = '/dev'
const APP_VERSION = '/adminka'

const $host = axios.create({
    baseURL: `${domain}${APP_MODE}${APP_VERSION}`,
})

// Add a request interceptor
$host.interceptors.request.use(
    function (config) {
        let access_token = localStorage.getItem('access_token')
        if (access_token) {
            config.headers = {
                Authorization: 'Bearer ' + access_token,
                'Content-Type': 'application/json',
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

$host.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        const refreshToken = localStorage.getItem('refresh_token')
        const originalRequest = error.config
        if (
            refreshToken &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
            $host
                .post('/auth/refresh')
                .then(function (response) {
                    if (response.status === '200') {
                        localStorage.setItem(
                            'access_token',
                            response.data.accessToken
                        )
                        $host(originalRequest)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        return Promise.reject(error)
    }
)

export default $host