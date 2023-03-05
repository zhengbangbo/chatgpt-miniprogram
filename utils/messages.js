export function flushMessages(that) {
    wx.getStorage({
        key: 'messages',
        success({ data }) {
            // console.log('messages_str: ', data);
            const messages = JSON.parse(data)
            that.setData({
                messages
            })
        }
    })
}

export function clearMessages(that) {
    that.setData({
        messages: []
    })
}