import { BACKEND_URL_BASE } from '../utils/config'

export function login() {
    wx.checkSession({
        success() {
            // session_key 未过期，并且在本生命周期一直有效
            wx.getStorage({
                key: 'token',
                success() {
                    // console.log("token 存在");
                },
                fail() {
                    // token 已被清空或不存在
                    getToken()
                }
            })
        },
        fail() {
            // session_key 已经失效，需要重新执行登录流程
            wx.clearStorage({
                key: 'token',
                success() {
                    getToken()
                }
            })
        }
    })

}

function getToken() {
    wx.login({
        timeout: 5 * 1000,
        success({ code }) {
            wx.request({
                timeout: 5 * 1000,
                url: `${BACKEND_URL_BASE}/api/v1/login`,
                data: { code },
                method: 'POST',
                success({ statusCode, data }) {
                    if (statusCode == 200) {
                        switch (data.code) {
                            case 200:
                                wx.setStorage({
                                    key: 'token',
                                    data: data.data.token
                                })
                                break;
                            default:
                                wx.showToast({
                                    title: data.message,
                                    icon: 'error'
                                })
                        }
                    } else {
                        wx.showToast({
                            title: '登录失败',
                            icon: 'error'
                        })
                    }
                },
                fail() {
                    wx.showToast({
                        title: '服务器异常',
                        icon: 'error'
                    })
                    // TODO 添加一个异常反馈机制
                }
            })
        },
        fail() {
            wx.showToast({
                title: '网络异常',
                icon: 'error'
            })
        }
    })
}