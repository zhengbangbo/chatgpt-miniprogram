import { BACKEND_URL_BASE } from './config'

export function getCoin(that) {
    wx.request({
      url: BACKEND_URL_BASE + '/api/v1/coin',
      header: {
        'x-token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            coin: res.data.data.coin
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        })
      }
    })
}
