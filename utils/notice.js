import { BACKEND_URL_BASE } from './config'
export function initNotice(that) {
    wx.request({
        url: `${BACKEND_URL_BASE}/status`,
        success({ statusCode, data }) {
            if (statusCode == 200) {
                switch (data.code) {
                    case 200:
                        that.setData({
                            isError: false,
                            errorMessage: ""
                        })
                        break
                    default:
                        that.setData({
                            isError: true,
                            errorMessage: data.message
                        })
                        break
                }
            }
        }
    })
}