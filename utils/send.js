import WxSocket from './wxsocket'
import { WEBSOCKET_URL_BASE } from './config'

export function websocketSend(that, oneTime = false) {
    let content = ""
    const token = wx.getStorageSync('token')
    const url = `${WEBSOCKET_URL_BASE}/ws/v1/chat`
    that.socket = new WxSocket({
        url,
        header: {
            'x-token': token
        },
    })
    that.setData({
        loading: true
    })

    that.socket.on('open', () => {
        if (oneTime) {
            if (!that.data.askText) {
                that.socket.close({
                    code: '3003',
                    reason: '消息不能为空'
                })
            } else {
                const messages = [
                    { "role": "user", "content": that.data.askText }
                ]
                const r = {
                    id: that.data.id,
                    messages
                }
                that.socket.send(r)

            }
        } else {
            if (!that.data.askText) {
                that.socket.close({
                    code: '3003',
                    reason: '消息不能为空'
                })
            } else {
                const messages = [
                    ...that.data.messages,
                    { "role": "user", "content": that.data.askText }
                ]
                const scrollLast = `msg${that.data.messages.length + 1}`
                that.setData({
                    showIntro: false,
                    scrollLast,
                    messages,
                    askText: ""
                })
                const r = {
                    id: 1,
                    messages
                }
                that.socket.send(r)
            }
        }
    })

    that.socket.on('message', (data) => {
        content += data
        if (oneTime) {
            that.setData({
                showContent: true,
                content,
            })
        } else {
            const scrollLast = `msg${that.data.messages.length + 2}`
            that.setData({
                onStream: true,
                scrollLast,
                content
            })
        }
    })

    that.socket.on('close', ({ code, reason }) => {
        that.setData({
            loading: false
        })
        if (oneTime) {
            if (code >= 1000 && code <= 1011) {
                if (code === 1006) {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'error'
                    })
                }
            } else if (code >= 3000 && code <= 3999) {
                wx.showToast({
                    title: reason,
                    icon: 'error'
                })
            } else if (code >= 4000 && code <= 4999) {
                wx.showToast({
                    title: reason,
                    icon: 'success'
                })
            } else {
                wx.showToast({
                    title: '服务器异常',
                    icon: 'error'
                })
                that.setData({
                    loading: false,
                })
            }
        } else {
            if (code >= 1000 && code <= 1011) {
                const content = str.trim(that.data.content)
                const messages = [
                    ...that.data.messages,
                    { "role": "assistant", "content": content }
                ]
                if (code === 1006) {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'error'
                    })
                }
                that.setData({
                    onStream: false,
                    content: "",
                    messages,
                })
            } else if (code >= 3000 && code <= 3999) {
                that.setData({
                    onStream: false,
                })
                wx.showToast({
                    title: reason,
                    icon: 'error'
                })
            } else if (code >= 4000 && code <= 4999) {
                const content = str.trim(that.data.content)
                const messages = [
                    ...that.data.messages,
                    { "role": "assistant", "content": content }
                ]
                that.setData({
                    onStream: false,
                    askText: "",
                    content: "",
                    messages
                })
                wx.showToast({
                    title: reason,
                    icon: 'success'
                })
            } else {
                wx.showToast({
                    title: '服务器异常',
                    icon: 'error'
                })

                that.setData({
                    onStream: false,
                })
            }
            that.setData({
                scrollLast: `msg${that.data.messages.length + 2}`
            })
        }
    })

    that.socket.on('error', (e) => {
    })

}
