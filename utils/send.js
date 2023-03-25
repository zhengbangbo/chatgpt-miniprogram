import WxSocket from './wxsocket'
import { WEBSOCKET_URL_BASE } from './config'
import { removeToken } from './login'

function addUserMessage(that) {
    const messages = [
        ...that.data.messages,
        { "role": "user", "content": that.data.askText }
    ]
    that.setData({
        messages,
    })
}

function popMessagesReturnAskText(that) {
    const messages = that.data.messages
    const msg = messages.pop()
    that.setData({
        messages,
        askText: msg.content
    })
}

function popMessages(that) {
    const messages = that.data.messages
    messages.pop()
    that.setData({
        messages,
    })
}

function addAssistantMessage(that) {
    const messages = [
        ...that.data.messages,
        { "role": "assistant", "content": that.data.content }
    ]
    that.setData({
        messages,
    })
}

function returnInputClearUserMessage(that) {
    // 数据
    // askText 不变
    // content 清空
    // messages 不变
    that.setData({
        content: "",
    })
    popMessagesReturnAskText(that)
}

function clearInputKeepMessages(that) {
    // 数据
    // askText 清空
    // content 清空
    // messages 不变
    that.setData({
        askText: "",
        content: "",
    })
    popMessages(that)
}

function saveContentToAssistantMessage(that) {
    // 数据
    // askText 清空
    // content 不变
    // messages 不变
    addAssistantMessage(that)
    that.setData({
        askText: "",
    })
}


function clearInputUpdateMessages(that) {
    // 数据
    // askText 清空
    // content 清空
    // messages 更新
    const content = that.data.content.trim()

    if (content.length > 0) {
        addAssistantMessage(that)
        that.setData({
            askText: "",
            content: "",
        })
    }
}
function scrollToLast(that) {
    that.setData({
        scrollLast: `msg${that.data.messages.length + 2}`
    })
}


export function websocketSend(that, oneTime = false) {
    if (!that.data.askText) {
        wx.showToast({
            title: '消息不能为空',
            icon: 'error'
        })
        return
    }
    that.setData({
        loading: true
    })

    let content = ""
    const token = wx.getStorageSync('token')
    const url = `${WEBSOCKET_URL_BASE}/ws/v1/chat`
    that.socket = new WxSocket({
        url,
        header: {
            'debug': 'hello world',
            'x-token': token
        },
    })

    that.socket.on('open', () => {
        if (oneTime) {
            const messages = [
                { "role": "user", "content": that.data.askText }
            ]
            const r = {
                id: that.data.id,
                messages
            }
            that.socket.send(r)

        } else {
            addUserMessage(that)
            const scrollLast = `msg${that.data.messages.length + 1}`
            that.setData({
                showIntro: false,
                scrollLast,
                askText: ""
            })
            const r = {
                id: 1,
                messages: that.data.messages
            }
            that.socket.send(r)
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
        console.log("code: ", code, "reason: ", reason)
        that.setData({
            loading: false,
            onStream: false
        })
        switch (code) {
            // 4000: "手动中断"
            case 4000:
                oneTime ? "" : saveContentToAssistantMessage(that)
                break
            // 1000: "成功",
            case 1000:
                oneTime ? "" : clearInputUpdateMessages(that)
                break
            // 4001: "token已过期",
            case 4001:
            // 4002: "token无效",
            case 4002:
                removeToken()
            // 4011: "消息不能为空",
            case 4011:
            // 4021: "余额不足",
            case 4021:
            // 4051: "请求失败",
            case 4051:
                oneTime ? "" : returnInputClearUserMessage(that)
                wx.showToast({
                    title: reason,
                    icon: 'error'
                })
                break
            // 1006: "未知错误",
            case 1006:
                oneTime ? "" : returnInputClearUserMessage(that)
                wx.showToast({
                    title: '网络错误',
                    icon: 'error'
                })
                break
            // 4081: "投币成功",
            case 4081:
                oneTime ? "" : clearInputKeepMessages(that)
                wx.showToast({
                    title: reason,
                    icon: 'success'
                })
                break
            default:
                oneTime ? "" : returnInputClearUserMessage(that)
                wx.showToast({
                    title: reason,
                    icon: 'error'
                })
        }
        oneTime ? "" : scrollToLast(that)
    })

    that.socket.on('error', (e) => {
        console.log('socket error', e)
        oneTime ? "" : returnInputClearUserMessage(that)
    })

}
