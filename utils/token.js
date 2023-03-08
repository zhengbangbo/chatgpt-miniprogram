export function loadToken(that) {
    const token = wx.getStorageSync('token')
    that.setData({token})
}
