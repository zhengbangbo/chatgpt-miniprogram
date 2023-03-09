export function clearMessages(that) {
    that.setData({ messages: [] })
    wx.setStorageSync('messages', JSON.stringify('[]'))
}

export function saveMessages(that) {
    const messages = that.data.messages
    wx.setStorageSync('messages', JSON.stringify(messages))
}

export function loadMessages(that) {
    const messages = wx.getStorageSync('messages')
    if(messages) {
        that.setData({ messages: JSON.parse(messages) })
    }
}