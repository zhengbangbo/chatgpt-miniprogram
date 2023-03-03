import { BACKEND_URL_BASE } from '../utils/config'

export function login() {
    wx.checkSession({
        success() {
            console.log("session_key 未过期，并且在本生命周期一直有效");
            const token = wx.getStorageSync('token')
            if (!token) {
                console.log("session_key 未过期，但是没有找到 token");
                getToken()
            }
        },
        fail() {
            console.log("session_key 已经失效，需要重新执行登录流程");
            wx.clearStorageSync('token')
            getToken()
        }
    })
    
}

function getToken() {
    wx.login({
        timeout: 10 * 1000,
        success({ code }) {
            console.log('code: ', code);
            wx.request({
                url: `${BACKEND_URL_BASE}/login`,
                data: { code },
                method: 'POST',
                success(res) {
                    if (res.statusCode == 200) {
                        wx.setStorage({ key: 'token', data: res.data.token })
                    } else {
                        wx.showToast({
                            title: '登录失败',
                            icon: 'error'
                        })
                    }
                }
            })
        }
    })
}