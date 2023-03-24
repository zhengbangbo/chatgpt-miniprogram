import { messages as dev_messages } from '../tests/messages/dev-default'
export function clearMessages(that) {
    that.setData({ messages: [] })
    wx.setStorageSync('messages', [])
}

export function saveMessages(that) {
    const messages = that.data.messages
    console.log('save messages: ', messages);
    wx.setStorageSync('messages', messages)
}

export function loadMessages(that) {
    try {
        const messages = wx.getStorageSync('messages')
        if (messages) {
            that.setData({ messages: messages })
        } else {
            // 开发环境下，使用测试数据
            if (wx.getAccountInfoSync().miniProgram.envVersion === "develop") {
                console.log('load dev messages: ', dev_messages);
                that.setData({ messages: dev_messages })
            } else {
                that.setData({ messages: [] })
            }
        }
    } catch (e) {
        console.error('load messages error: ', e)
    }
}
