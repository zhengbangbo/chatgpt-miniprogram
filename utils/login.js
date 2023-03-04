import { BACKEND_URL_BASE } from '../utils/config'

export function login() {
    wx.checkSession({
        success() {
            const token = wx.getStorageSync('token')
            if (!token) {
                getToken()
            }
        },
        fail() {
            wx.clearStorageSync('token')
            getToken()
        }
    })

}

function getToken() {
    wx.login({
        timeout: 10 * 1000,
        success({ code }) {
            wx.request({
                url: `${BACKEND_URL_BASE}/api/v1/login`,
                data: { code },
                method: 'POST',
                success(res) {
                    if (res.statusCode == 200) {
                        switch (res.data.code) {
                            case 200:
                                wx.setStorage({ key: 'token', data: res.data.data.token })
                                break;
                            default:
                                wx.showToast({
                                  title: res.data.message,
                                  icon: 'error'
                                })
                        }
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