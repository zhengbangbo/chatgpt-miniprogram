import { BACKEND_URL_BASE } from '../utils/config'

export function getPrompts() {
    wx.request({
        url: `${BACKEND_URL_BASE}/prompts`,
        success({ statusCode, data }) {
            if (statusCode == '200') {
                wx.setStorage({
                    key: 'prompts',
                    data: data.data.prompts
                })
            }
        }
    })
}

export function postPrompt(that, id, prompt) {
    try {
        const token = wx.getStorageSync('token')
        wx.request({
            url: `${BACKEND_URL_BASE}/prompts`,
            method: 'POST',
            data: JSON.stringify({
                id,
                prompt
            }),
            dataType: 'json',
            enableHttp2: true,
            header: {
                'content-type': 'application/json',
                'x-token': token
            },
            success({ statusCode, data }) {
                if (statusCode == '200') {
                    switch (data.code) {
                        case 200:
                            that.setData({
                                content: data.data.answer
                            })
                            break;
                        case 1101:
                        case 1102:
                            wx.clearStorageSync("token")
                            wx.showToast({
                                title: data.message,
                                icon: 'error'
                            })
                            break;
                        case 2001:
                            wx.showToast({
                                title: data.message,
                                icon: 'success'
                            })
                            break
                        case 1201:
                        case 1501:
                        case 1502:
                        default:
                            wx.showToast({
                                title: data.message,
                                icon: 'error'
                            })
                            break;
                    }
                    that.setData({
                        loading: false, askText: ""
                    })
                } else {
                    wx.setStorage({
                        key: 'messages',
                        data: '[]'
                    })
                    wx.showToast({
                        title: '出错了',
                        icon: 'error'
                    })
                    that.setData({ loading: false })
                }
            },
            fail() {
                wx.showToast({
                    title: '出错了',
                    icon: 'error'
                })
                that.setData({ loading: false })
            }
        })
    } catch ({ message }) {
        wx.showToast({
            title: message,
            icon: 'error'
        })
        that.setData({ loading: false })
    }
} 
